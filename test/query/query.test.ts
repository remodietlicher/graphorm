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
  it("Should produce a triple pattern", async () => {
    const triple = new SparqlTripleElement("ex:s", "ex:p", "?object");
    const select = new SparqlSelectElement(["object"]);
    select.addChild(triple);
    const query = select.acceptToString(new SparqlToStringVisitor());
    expect(query).toBe("SELECT ?object WHERE { ex:s ex:p ?object. }");
  });
});
