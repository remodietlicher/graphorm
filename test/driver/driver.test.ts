import { DataModel } from "../../src/data-model/DataModel";
import { Person } from "./node/Person";
import { Store, Parser } from "n3";
import fs from "fs";

import path from "path";

describe("Executing a query should produce the correct SPARQL query string", () => {
  let store;
  beforeAll(async () => {
    store = new Store();

    // read text from file
    let ttlSrc = path.join(__dirname, "../data/test.ttl");
    const ttlFile = fs.readFileSync(ttlSrc, "utf8");
    const parser = new Parser();
    parser.parse(ttlFile, (err, quad, prefixes) => {
      if (quad) store.addQuad(quad);
    });
  });
  afterAll(async () => {});
  it("should produce correct SPARQL syntax for node class with N3 store", async () => {
    // const p = new Person();
    const model = new DataModel({
      type: "comunica",
      nodes: [Person],
    });

    model.buildMetadatas();
    model.createNodeManager();

    const remo: Person | undefined = await model.manager.findAll(Person, {}, [
      store,
    ]);

    if (remo) {
      expect(remo.firstName).toBe("Remo");
      expect(remo.lastName).toBe("Dietlicher");
      expect(remo.age).toBe(31);
      // expect(remo instanceof Person).toBe(true); // False, but IDE thinks this works...
    } else {
      expect("remo is undefined").toBe("never");
    }
  });
  // it("should produce a correct SPARQL insert data query for node class", async () => {
  //   const p = new Person();
  //   const model = new DataModel({
  //     type: "comunica",
  //     nodes: [Person],
  //   });

  //   model.buildMetadatas();
  //   model.createNodeManager();

  //   p.firstName = "Hans";
  //   p.lastName = "Muster";
  //   p.age = 89;

  //   await model.manager.save(p, store);
  //   console.log("done");
  // });
});
