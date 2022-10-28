import { DataModel } from "../data-model/DataModel";
import ContainerElement from "../sparql-query/elements/ContainerElement";
import QueryVariable from "../sparql-query/util/QueryVariable";
import { NodeMetadataArgs } from "./args/NodeMetadataArgs";
import { EdgeMetadata } from "./EdgeMetadata";
import MetadataToSelectVariableVisitor from "./visitors/MetadataToSelectVariableVisitor";
import MetadataToTriplesVisitor from "./visitors/MetadataToTripleVisitor";

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

  /**
   * Convert class node metadata to a tree of nested query ContainerElements
   * for class node type members and TripleElements for regular class members
   */
  acceptMetadataToTripleVisitor(
    visitor: MetadataToTriplesVisitor,
    condition: any
  ): ContainerElement {
    return visitor.visitNode(this, condition);
  }

  /**
   * convert class node metadata to a list of query variables
   */
  acceptMetadataToSelectVariableVisitor(
    visitor: MetadataToSelectVariableVisitor
  ): QueryVariable[] {
    return visitor.visitNode(this);
  }
}
