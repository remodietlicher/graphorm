import SparqlElement from "./sparql/SparqlElement";

export default interface Query {
  addElement(element: SparqlElement): void;
  toString(): string;
  toType(bindings: any[]): any[];
}
