import { DataModel } from "../data-model/DataModel";
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

  build(): NodeMetadata[] {
    let nodeMetadatas = this._metadataArgsStorage.nodes.map((s) => {
      const nodeMetadata = new NodeMetadata(this._model, s);
      nodeMetadata.build();
      return nodeMetadata;
    });

    nodeMetadatas = nodeMetadatas.map((s) => {
      const edgeArgs = this._metadataArgsStorage.edges.filter(
        (p) => p.target.name === s.target.name
      );
      const edges = edgeArgs.map((p) => {
        const primary = p.options?.primary ? p.options.primary : false;
        return new EdgeMetadata(
          p.edge,
          p.type,
          p.target,
          p.propertyKey,
          primary
        );
      });
      s.registerEdges(edges);
      return s;
    });

    return nodeMetadatas;
  }
}
