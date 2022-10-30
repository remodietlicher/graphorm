import { Bindings } from "@comunica/types";
import QueryElement from "../sparql-query/elements/QueryElement";
import { NodeMetadata } from "./NodeMetadata";
import BindingsToObjectVisitor from "./visitors/BindingsToObjectVisitor";
import MetadataToSelectVariableVisitor from "./visitors/MetadataToSelectVariableVisitor";
import MetadataToTriplesVisitor from "./visitors/MetadataToTripleVisitor";

export class EdgeMetadata {
  // URI specifying the edge
  readonly edge: string;
  // data type for the edge
  readonly type: string;
  // constructor function of the corresponding node class
  readonly target: Function;
  // name of the class member
  readonly name: string;
  // whether the value of this edge should be used to generate
  // the ID of the corresponding node
  readonly primary: boolean;
  // if the target is another node, store it's metadata
  private _targetMetadata: NodeMetadata;

  constructor(
    edge: string,
    type: string,
    target: Function,
    name: string,
    primary: boolean
  ) {
    this.edge = edge;
    this.type = type;
    this.target = target;
    this.name = name;
    this.primary = primary;
  }

  setTargetNodeMetadata(other: NodeMetadata) {
    this._targetMetadata = other;
  }

  getTargetNodeMetadata() {
    return this._targetMetadata;
  }

  /**
   * convert class edge metadata to triples for regular edges and
   * containers of full class edges for class node members
   */
  acceptMetadataToTripleVisitor(
    visitor: MetadataToTriplesVisitor,
    condition: any
  ): QueryElement[] {
    return visitor.visitEdge(this, condition);
  }

  /**
   * convert class edge metadata to a list of query variables
   */
  acceptMetadataToSelectVariableVisitor(
    visitor: MetadataToSelectVariableVisitor
  ): string[] {
    return visitor.visitEdge(this);
  }

  /**
   * convert SPARQL select return variable to it's corresponding
   * class object member
   */
  acceptBindingsToObjectVisitor(
    visitor: BindingsToObjectVisitor,
    bindings: Bindings
  ) {
    return visitor.visitEdge(this, bindings);
  }
}
