import { DataModel } from "../data-model/DataModel";
import { MultipleMetadataError } from "../error/metadata/MultipleMetadataError";
import { MetadataArgsStorage } from "./args/MetadataArgsStorage";
import { EdgeMetadata } from "./EdgeMetadata";
import { NodeMetadata } from "./NodeMetadata";

export class NodeMetadataBuilder {
  private _metadataArgsStorage: MetadataArgsStorage;

  private _model: DataModel;

  constructor(metadataArgsStorage: MetadataArgsStorage, model: DataModel) {
    this._metadataArgsStorage = metadataArgsStorage;
    this._model = model;
  }

  /**
   * connect edges with their corresponding node
   */
  build(): NodeMetadata[] {
    // loop over all class node metadatas
    const nodeMetadatas = this._metadataArgsStorage.nodes.map((n) => {
      // get all edge metadata args for this class node
      const edgeArgs = this._metadataArgsStorage.edges.filter(
        (e) => e.target.name === n.target.name
      );
      const edges = edgeArgs.map((e) => {
        const primary = e.options?.primary ? e.options.primary : false;
        return new EdgeMetadata(
          e.edge,
          e.type,
          e.target,
          e.propertyKey,
          primary
        );
      });
      const nodeMetadata = new NodeMetadata(this._model, n, edges);
      nodeMetadata.build();

      return nodeMetadata;
    });

    // link connected edges to their target class metadata
    nodeMetadatas.forEach((n) => {
      n.edges.forEach((e) => {
        let targetNodeMetadata: NodeMetadata;
        const res = nodeMetadatas.filter(
          (tn) => tn.target.name.toLowerCase() === e.type.toLowerCase()
        );
        if (res.length > 1) {
          throw new MultipleMetadataError(e.type);
        } else if (res.length === 1) {
          // link the found target node metadata to this edge
          targetNodeMetadata = res[0];
          e.setTargetNodeMetadata(targetNodeMetadata);
        }
      });
    });

    return nodeMetadatas;
  }
}
