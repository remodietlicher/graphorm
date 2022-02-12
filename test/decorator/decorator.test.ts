import { getMetadataArgsStorage } from "../../src/globals";
import { Person } from "./entity/Person";

class Dummy {
  constructor(private a: string) {
    console.log(a);
  }
}

describe("Adding a column should change global state of metadata", () => {
  it("should add the hello column", () => {
    const person = new Person();
    const dummy = new Dummy("blub");
    const predicates = getMetadataArgsStorage().predicates;
    const subjects = getMetadataArgsStorage().subjects;
    expect(predicates[0].propertyKey).toBe("name");
    expect(predicates[0].target.name).toBe("Person");
    expect(predicates[1].propertyKey).toBe("address");
    expect(subjects[0].target.name).toBe("Person");
  });
});
