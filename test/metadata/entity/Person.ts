import { Predicate } from "../../../src/decorator/Predicate";
import { Subject } from "../../../src/decorator/Subject";

@Subject()
export class Person {
  @Predicate()
  name: string;

  @Predicate()
  age: number;
}
