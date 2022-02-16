import { Predicate } from "../../../src/decorator/Predicate";
import { Subject } from "../../../src/decorator/Subject";

@Subject("ioh")
export class Person {
  @Predicate("blib")
  name: string;

  @Predicate("blub")
  age: number;
}
