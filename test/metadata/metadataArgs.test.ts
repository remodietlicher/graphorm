import { getMetadataArgsStorage } from "../../src/globals";
import { Person } from "./node/Person";

describe("Adding a column should change global state of metadata", () => {
  it("should add the hello column", () => {
    const person = new Person();
    const predicates = getMetadataArgsStorage().edges;
    const nodes = getMetadataArgsStorage().nodes;
    expect(predicates[0].propertyKey).toBe("name");
    expect(predicates[0].target.name).toBe("Person");
    expect(predicates[1].propertyKey).toBe("age");
    expect(nodes[0].target.name).toBe("Person");
  });
});
