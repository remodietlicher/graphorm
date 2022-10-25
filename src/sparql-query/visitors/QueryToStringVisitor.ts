import InsertElement from "../elements/InsertElement";
import PrefixElement from "../elements/PrefixElement";
import SelectElement from "../elements/SelectElement";
import SparqlTripleElement from "../elements/TripleElement";
import QueryVisitor from "./QueryVisitor";

export default class QueryToStringVisitor implements QueryVisitor {
  visitSelect(e: SelectElement): string {
    const select = e.getSelect().map((s) => `?${s.name}`);
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    const query = `SELECT ${select.join(" ")} WHERE { ${childrenQuery.join(
      "\n"
    )} }`;
    return query;
  }

  visitTriple(e: SparqlTripleElement): string {
    const query = `${e.getTriple().join(" ")}.`;
    return query;
  }

  visitInsert(e: InsertElement): string {
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    const query = `INSERT DATA { ${childrenQuery.join("\n")} }`;
    return query;
  }

  visitContainer(e: InsertElement): string {
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    return childrenQuery.join("\n");
  }

  visitPrefix(e: PrefixElement): string {
    return `PREFIX ${e.getAbbreviation()}: <${e.getUri()}#>\n`;
  }
}
