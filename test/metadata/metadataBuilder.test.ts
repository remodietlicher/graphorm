import { DataModel } from "../../src/data-model/DataModel";
import { Person } from "./subject/Person";

describe("From the globally collected metadata args, concrete Metadata objects are created", () => {
  it("should create subject metadata objects", () => {
    const p = new Person();
    const model = new DataModel({
      type: "comunica-solid",
      subjects: [Person],
    });
    model.buildMetadatas();
    expect(model._subjectMetadatas[0].predicates[0].name).toBe("name");
    expect(model._subjectMetadatas[0].predicates[1].name).toBe("age");
  });
});
