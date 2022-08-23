import SparqlVisitor from "./SparqlVisitor";

export default interface SparqlElement {
  addChild(child: SparqlElement | SparqlElement[]): void;
  getChildren(): SparqlElement[];
  acceptToString(visitor: SparqlVisitor): string;
}
