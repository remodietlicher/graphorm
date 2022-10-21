import { DataModel } from "../../src/data-model/DataModel";
import { Person } from "./node/Person";

describe("From the globally collected metadata args, concrete Metadata objects are created", () => {
  it("should create node metadata objects", () => {
    const p = new Person();
    const model = new DataModel({
      type: "comunica",
    });
    expect(model.getMetadata(Person)?.edges[0].name).toBe("name");
    expect(model.getMetadata(Person)?.edges[1].name).toBe("age");
  });
});
