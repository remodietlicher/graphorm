import { getMetadataArgsStorage } from "../../src/globals";
import { Person } from "./subject/Person";

describe("Adding a column should change global state of metadata", () => {
  it("should add the hello column", () => {
    const person = new Person();
    const predicates = getMetadataArgsStorage().predicates;
    const subjects = getMetadataArgsStorage().subjects;
    expect(predicates[0].propertyKey).toBe("name");
    expect(predicates[0].target.name).toBe("Person");
    expect(predicates[1].propertyKey).toBe("age");
    expect(subjects[0].target.name).toBe("Person");
  });
});
