import { Connection } from "../../src/connection/Connection";
import { Person } from "./subject/Person";

describe("From the globally collected metadata args, concrete Metadata objects are created", () => {
  it("should create subject metadata objects", () => {
    const p = new Person();
    const connection = new Connection();
    connection.buildMetadatas();
    expect(connection.subjectMetadatas[0].predicates[0].name).toBe("name");
    expect(connection.subjectMetadatas[0].predicates[1].name).toBe("age");
  });
});
