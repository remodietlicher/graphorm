import { Edge } from "../../../src/decorator/Edge";
import { Node } from "../../../src/decorator/Node";

@Node("<http://xmlns.com/foaf/0.1/Person>")
export class Person {
  @Edge("<http://xmlns.com/foaf/0.1/firstName>", { primary: true })
  firstName: string;
  @Edge("<http://xmlns.com/foaf/0.1/lastName>", { primary: true })
  lastName: string;
  @Edge("<http://xmlns.com/foaf/0.1/age>")
  age: number;
}
