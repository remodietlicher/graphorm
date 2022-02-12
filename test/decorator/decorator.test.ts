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
    const columns = getMetadataArgsStorage().columns;
    const tables = getMetadataArgsStorage().tables;
    expect(columns[0].propertyKey).toBe("name");
    expect(columns[0].target.name).toBe("Person");
    expect(columns[1].propertyKey).toBe("address");
    expect(tables[0].target.name).toBe("Person");
  });
});
