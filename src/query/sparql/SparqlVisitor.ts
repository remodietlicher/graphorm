import SparqlContainerElement from "./SparqlContainerElement";
import SparqlInsertElement from "./SparqlInsertElement";
import SparqlPrefixElement from "./SparqlPrefixElement";
import SparqlSelectElement from "./SparqlSelectElement";
import SparqlTripleElement from "./SparqlTripleElement";

export default interface SparqlVisitor {
  visitSelect(e: SparqlSelectElement): string;
  visitTriple(e: SparqlTripleElement): string;
  visitInsert(e: SparqlInsertElement): string;
  visitContainer(e: SparqlContainerElement): string;
  visitPrefix(e: SparqlPrefixElement): string;
}
