import { DataModel } from "../data-model/DataModel";
import { NodeMetadataArgs } from "./args/NodeMetadataArgs";
import { EdgeMetadata } from "./EdgeMetadata";

export class NodeMetadata {
  rdfObject: string;

  target: Function;

  metadataArgs: NodeMetadataArgs;

  edges: EdgeMetadata[] = [];

  readonly _model: DataModel;

  constructor(
    model: DataModel,
    metadataArgs: NodeMetadataArgs,
    edges: EdgeMetadata[]
  ) {
    this._model = model;
    this.metadataArgs = metadataArgs;
    this.edges = edges;
  }

  build() {
    this.rdfObject = this.metadataArgs.rdfObject;
    this.target = this.metadataArgs.target;
  }
}
