import SparqlSelectElement from "./SparqlSelectElement";
import SparqlTripleElement from "./SparqlTripleElement";

export default interface SparqlVisitor {
  visitSelect(e: SparqlSelectElement): string;
  visitTriple(e: SparqlTripleElement): string;
}
