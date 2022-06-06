import { DataModel } from "../../src/data-model/DataModel";
import { Person } from "./node/Person";
import { Store, Parser } from "n3";
import fs from "fs";

import path from "path";

describe("Executing a query should produce the correct SPARQL query string", () => {
  let store: Store;
  beforeAll(async () => {
    store = new Store();

    // read text from file
    let ttlSrc = path.join(__dirname, "../data/person.ttl");
    const ttlFile = fs.readFileSync(ttlSrc, "utf8");
    const parser = new Parser();
    parser.parse(ttlFile, (err, quad, prefixes) => {
      if (quad) store.addQuad(quad);
    });
  });
  afterAll(async () => {});
  it("should produce correct SPARQL syntax for node class with N3 store", async () => {
    const model = new DataModel({
      type: "comunica",
      nodes: [Person],
    });

    model.buildMetadatas();
    model.createNodeManager();

    const results: Person[] | undefined = await model.manager.findAll(
      Person,
      [store],
      { condition: { lastName: "Dietlicher" } }
    );

    if (results) {
      const remo = results[0];
      expect(remo.firstName).toBe("Remo");
      expect(remo.lastName).toBe("Dietlicher");
      expect(remo.age).toBe(31);
      const meret = results[1];
      expect(meret.firstName).toBe("Meret");
      expect(meret.lastName).toBe("Dietlicher");
      expect(meret.age).toBe(32);
    } else {
      expect("results are undefined").toBe("never");
    }
  });
  it("should produce a correct SPARQL insert data query for node class", async () => {
    const p = new Person();
    const model = new DataModel({
      type: "comunica",
      nodes: [Person],
    });

    model.buildMetadatas();
    model.createNodeManager();

    p.firstName = "Hans";
    p.lastName = "Muster";
    p.age = 89;

    await model.manager.save(p, store, {
      baseIRI: "https://example.org/people",
    });

    expect(
      store.countQuads(
        "https://example.org/people#HansMuster",
        null,
        null,
        null
      )
    ).toBe(3);
    expect(
      store.getObjects(
        "https://example.org/people#HansMuster",
        "http://xmlns.com/foaf/0.1/firstName",
        null
      )[0].value
    ).toBe(p.firstName);
    expect(
      store.getObjects(
        "https://example.org/people#HansMuster",
        "http://xmlns.com/foaf/0.1/lastName",
        null
      )[0].value
    ).toBe(p.lastName);
    expect(
      store.getObjects(
        "https://example.org/people#HansMuster",
        "http://xmlns.com/foaf/0.1/age",
        null
      )[0].value
    ).toBe(p.age.toString());
  });
});
