import { Predicate } from "../../../src/decorator/Predicate";
import { Subject } from "../../../src/decorator/Subject";

@Subject("<http://xmlns.com/foaf/0.1/Person>")
export class Person {
  @Predicate("<http://xmlns.com/foaf/0.1/name>")
  name: string;
  @Predicate("<http://xmlns.com/foaf/0.1/age>")
  age: number;
}
