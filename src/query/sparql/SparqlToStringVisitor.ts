import SparqlSelectElement from "./SparqlSelectElement";
import SparqlTripleElement from "./SparqlTripleElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlToStringVisitor implements SparqlVisitor {
  visitSelect(e: SparqlSelectElement): string {
    const select = e.getSelect().map((e) => `?${e}`);
    const childrenQuery = e.getChildren().map((e) => e.acceptToString(this));
    const query = `SELECT ${select.join(" ")} WHERE { ${childrenQuery} }`;
    return query;
  }

  visitTriple(e: SparqlTripleElement): string {
    const query = `${e.getTriple().join(" ")}.`;
    return query;
  }
}
