import { Edge } from "../../../src/decorator/Edge";
import { Node } from "../../../src/decorator/Node";

@Node("ioh")
export class Person {
  @Edge("blib")
  name: string;

  @Edge("blub")
  age: number;
}
