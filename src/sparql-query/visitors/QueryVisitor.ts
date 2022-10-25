import ContainerElement from "../elements/ContainerElement";
import InsertElement from "../elements/InsertElement";
import PrefixElement from "../elements/PrefixElement";
import SelectElement from "../elements/SelectElement";
import SparqlTripleElement from "../elements/TripleElement";

export default interface QueryVisitor {
  visitSelect(e: SelectElement): string;
  visitTriple(e: SparqlTripleElement): string;
  visitInsert(e: InsertElement): string;
  visitContainer(e: ContainerElement): string;
  visitPrefix(e: PrefixElement): string;
}
