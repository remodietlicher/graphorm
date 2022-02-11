import { Column } from "../../../src/decorator/Column";
import { Entity } from "../../../src/decorator/Entity";

@Entity()
export class Person {
  @Column()
  name: string;

  @Column()
  address: string;
}
