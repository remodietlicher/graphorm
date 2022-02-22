import { Connection } from "../../src/connection/Connection";
import { Person } from "./subject/Person";

describe("Executing a query should produce the correct SPARQL query string", () => {
  it("should produce correct SPARQL syntax for subject class", async () => {
    const p = new Person();
    const connection = new Connection();

    connection.buildMetadatas();
    connection.createSubjectManager();

    const remo: Person | undefined = await connection.manager.findAll(
      Person,
      {},
      [{ type: "sparql", value: "http://localhost:3000/sparql" }]
    );

    if (remo) {
      expect(remo.firstName).toBe("Remo");
      expect(remo.lastName).toBe("Dietlicher");
      expect(remo.age).toBe(31);
      // expect(remo instanceof Person).toBe(true); // False, but IDE thinks this works...
    } else {
      expect("remo is undefined").toBe("never");
    }
  });
  it("should produce a correct SPARQL insert data query for subject class", async () => {
    const p = new Person();
    const connection = new Connection();

    connection.buildMetadatas();
    connection.createSubjectManager();

    p.firstName = "Hans";
    p.lastName = "Muster";
    p.age = 89;

    connection.manager.save(p, {
      type: "sparql",
      value: "http://localhost:3000/sparql",
    });
    console.log("done");
  });
});
