import { DataModel } from "../../src/data-model/DataModel";
import { Person } from "./node/Person";
import { Store, Parser } from "n3";
import fs from "fs";

import path from "path";
import { Dog } from "./node/Dog";

describe("The node manager", () => {
  let store: Store;
  let model: DataModel;
  beforeAll(async () => {
    model = new DataModel({
      type: "comunica",
    });

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
  it("should find a single level class by object type within the N3 store", async () => {
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
  it("should save a single level class data in the N3 store", async () => {
    const p = new Person();
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
    ).toBe(4);
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
  it("should find a multilevel class of depth 1 within the N3 store", async () => {
    const results = await model.manager.findAll(Dog, [store], {
      condition: { name: "Bello", owner: { firstName: "Remo" } },
    });

    if (results && results.length > 0) {
      const bello = results[0];
      expect(bello.name).toBe("Bello");
      expect(bello.owner.firstName).toBe("Remo");
      expect(bello.owner.lastName).toBe("Dietlicher");
      expect(bello.owner.age).toBe(31);
    } else {
      expect("results are undefined").toBe("never");
    }
  });
});
