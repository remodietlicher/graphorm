import { QueryDocumentKeys } from "graphql/language/visitor";
import InsertElement from "../../src/sparql-query/elements/InsertElement";
import PrefixElement from "../../src/sparql-query/elements/PrefixElement";
import Query from "../../src/sparql-query/Query";
import SelectElement from "../../src/sparql-query/elements/SelectElement";
import QueryToStringVisitor from "../../src/sparql-query/visitors/QueryToStringVisitor";
import TripleElement from "../../src/sparql-query/elements/TripleElement";

describe("The query builder should produce a valid SPARQL query string", () => {
  it("Should produce a triple pattern", async () => {
    const triple = new TripleElement("ex:s", "ex:p", "ex:o");
    const query = triple.acceptToString(new QueryToStringVisitor());
    expect(query).toBe("ex:s ex:p ex:o.");
  });
  it("Should produce a triple pattern with literals", async () => {
    const triple = new TripleElement("ex:s", "ex:p", "Remo", {
      objectType: "String",
    });
    const query = triple.acceptToString(new QueryToStringVisitor());
    expect(query).toBe('ex:s ex:p "Remo".');
  });
  it("Should produce a select query with triple pattern", async () => {
    const triple = new TripleElement("ex:s", "ex:p", "?object");
    const select = new SelectElement([{ name: "object" }]);
    select.addChild(triple);
    const query = select.acceptToString(new QueryToStringVisitor());
    expect(query).toBe("SELECT ?object WHERE { ex:s ex:p ?object. }");
  });
  it("Should produce a select query with multiple triple patterns", async () => {
    const query = new Query();
    const triple1 = new TripleElement("ex:s", "ex:p", "?object");
    const triple2 = new TripleElement("ex:s", "ex:p2", "ex:o");
    const select = new SelectElement([{ name: "object" }]);
    select.addChild(triple1);
    select.addChild(triple2);
    query.addElement(select);
    const stringQuery = query.toString();
    expect(stringQuery).toBe(
      "SELECT ?object WHERE { ex:s ex:p ?object.\nex:s ex:p2 ex:o. }"
    );
  });
  it("Should produce an insert query with triple pattern", async () => {
    const triple = new TripleElement("ex:s", "ex:p", "ex:o");
    const insert = new InsertElement();
    insert.addChild(triple);
    const query = insert.acceptToString(new QueryToStringVisitor());
    expect(query).toBe("INSERT DATA { ex:s ex:p ex:o. }");
  });
  it("Should produce an select query with prefix", async () => {
    const query = new Query();
    const prefix = new PrefixElement("ex", "http://example.com/ex");
    const triple = new TripleElement("ex:s", "ex:p", "ex:o");
    const insert = new InsertElement();
    query.addElement(prefix);
    insert.addChild(triple);
    query.addElement(insert);
    const stringQuery = query.toString();
    expect(stringQuery).toBe(
      "PREFIX ex: <http://example.com/ex#>\n\nINSERT DATA { ex:s ex:p ex:o. }"
    );
  });
});
