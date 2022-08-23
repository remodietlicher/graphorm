import { QueryDocumentKeys } from "graphql/language/visitor";
import SparqlInsertElement from "../../src/query/sparql/SparqlInsertElement";
import SparqlPrefixElement from "../../src/query/sparql/SparqlPrefixElement";
import SparqlQuery from "../../src/query/sparql/SparqlQuery";
import SparqlSelectElement from "../../src/query/sparql/SparqlSelectElement";
import SparqlToStringVisitor from "../../src/query/sparql/SparqlToStringVisitor";
import SparqlTripleElement from "../../src/query/sparql/SparqlTripleElement";

describe("The query builder should produce a valid SPARQL query string", () => {
  it("Should produce a triple pattern", async () => {
    const triple = new SparqlTripleElement("ex:s", "ex:p", "ex:o");
    const query = triple.acceptToString(new SparqlToStringVisitor());
    expect(query).toBe("ex:s ex:p ex:o.");
  });
  it("Should produce a triple pattern with literals", async () => {
    const triple = new SparqlTripleElement("ex:s", "ex:p", "Remo", {
      objectType: "String",
    });
    const query = triple.acceptToString(new SparqlToStringVisitor());
    expect(query).toBe('ex:s ex:p "Remo".');
  });
  it("Should produce a select query with triple pattern", async () => {
    const triple = new SparqlTripleElement("ex:s", "ex:p", "?object");
    const select = new SparqlSelectElement([{ name: "object" }]);
    select.addChild(triple);
    const query = select.acceptToString(new SparqlToStringVisitor());
    expect(query).toBe("SELECT ?object WHERE { ex:s ex:p ?object. }");
  });
  it("Should produce a select query with multiple triple patterns", async () => {
    const query = new SparqlQuery();
    const triple1 = new SparqlTripleElement("ex:s", "ex:p", "?object");
    const triple2 = new SparqlTripleElement("ex:s", "ex:p2", "ex:o");
    const select = new SparqlSelectElement([{ name: "object" }]);
    select.addChild(triple1);
    select.addChild(triple2);
    query.addElement(select);
    const stringQuery = query.toString();
    expect(stringQuery).toBe(
      "SELECT ?object WHERE { ex:s ex:p ?object.\nex:s ex:p2 ex:o. }"
    );
  });
  it("Should produce an insert query with triple pattern", async () => {
    const triple = new SparqlTripleElement("ex:s", "ex:p", "ex:o");
    const insert = new SparqlInsertElement();
    insert.addChild(triple);
    const query = insert.acceptToString(new SparqlToStringVisitor());
    expect(query).toBe("INSERT DATA { ex:s ex:p ex:o. }");
  });
  it("Should produce an select query with prefix", async () => {
    const query = new SparqlQuery();
    const prefix = new SparqlPrefixElement("ex", "http://example.com/ex");
    const triple = new SparqlTripleElement("ex:s", "ex:p", "ex:o");
    const insert = new SparqlInsertElement();
    query.addElement(prefix);
    insert.addChild(triple);
    query.addElement(insert);
    const stringQuery = query.toString();
    expect(stringQuery).toBe(
      "PREFIX ex: <http://example.com/ex#>\n\nINSERT DATA { ex:s ex:p ex:o. }"
    );
  });
});
