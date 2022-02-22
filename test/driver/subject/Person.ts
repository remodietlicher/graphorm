import { Predicate } from "../../../src/decorator/Predicate";
import { Subject } from "../../../src/decorator/Subject";

@Subject("<http://xmlns.com/foaf/0.1/Person>")
export class Person {
  @Predicate("<http://xmlns.com/foaf/0.1/firstName>", { primary: true })
  firstName: string;
  @Predicate("<http://xmlns.com/foaf/0.1/lastName>", { primary: true })
  lastName: string;
  @Predicate("<http://xmlns.com/foaf/0.1/age>")
  age: number;
}
