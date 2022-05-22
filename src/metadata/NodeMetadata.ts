import { DataModel } from "../data-model/DataModel";
import { NodeMetadataArgs } from "./args/NodeMetadataArgs";
import { EdgeMetadata } from "./EdgeMetadata";

export class NodeMetadata {
  rdfObject: string;

  target: Function;

  metadataArgs: NodeMetadataArgs;

  edges: EdgeMetadata[] = [];

  readonly _model: DataModel;

  constructor(model: DataModel, metadataArgs: NodeMetadataArgs) {
    this._model = model;
    this.metadataArgs = metadataArgs;
  }

  build() {
    this.rdfObject = this.metadataArgs.rdfObject;
    this.target = this.metadataArgs.target;
  }

  registerEdges(edges: EdgeMetadata[]) {
    this.edges.push(...edges);
  }
}
