import { Person } from "./Person";
import { Edge } from "../../../src/decorator/Edge";
import { Node } from "../../../src/decorator/Node";

@Node("<http://dbpedia.org/ontology/Dog>")
export class Dog {
  @Edge("<http://xmlns.com/foaf/0.1/name>", { primary: true })
  name: string;
  @Edge("<http://dbpedia.org/ontology/owner>")
  owner: Person;
}
