import SparqlInsertElement from "./SparqlInsertElement";
import SparqlPrefixElement from "./SparqlPrefixElement";
import SparqlSelectElement from "./SparqlSelectElement";
import SparqlTripleElement from "./SparqlTripleElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlToStringVisitor implements SparqlVisitor {
  visitSelect(e: SparqlSelectElement): string {
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

  visitInsert(e: SparqlInsertElement): string {
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    const query = `INSERT DATA { ${childrenQuery.join("\n")} }`;
    return query;
  }

  visitContainer(e: SparqlInsertElement): string {
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    return childrenQuery.join("\n");
  }

  visitPrefix(e: SparqlPrefixElement): string {
    return `PREFIX ${e.getAbbreviation()}: <${e.getUri()}#>\n`;
  }
}
