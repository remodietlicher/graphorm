import { SubjectManager } from "../entity/SubjectManager";
import { SubjectMetadata } from "../metadata/SubjectMetadata";
import { ObjectType } from "../util/ObjectType";

/*
Target:
-------
SELECT * WHERE {
  ?x a Thesis.
  ?x isPartOf ?y.
  ?z hasObtained ?y.
  ?z name "Remo".
  ?x topic ?res.
}

Person:
-------
SELECT ?name ?diploma ?email ?adress WHERE {
  ?x a Person;
     name ?name;
     hasObtained ?diploma;
  ?diploma a Diploma.
}

Thesis:
-------
SELECT ?topic ?supervisor ?associatedDiploma WHERE {
  ?x a Thesis;
     hasTopic ?topic;
     supervisedBy ?supervisor;
     partOf ?associatedDiploma.
}

Combined Thesis + Person:
-------------------------
SELECT ?topic WHERE {             <----- user input => from manager call
  ?x1 a Thesis;
      hasTopic ?topic;
      partOf ?associatedDiploma.  <----- ?diploma   => from metadata

  ?x2 a Person;
      name ?name;                 <----- "Remo"     => from manager call
      hasObtained ?diploma;
  ?diploma a Diploma.
}

User code:
----------

@Subject(...)
class Person {
  @Predicate(...)
  name: string
  @Predicate(...)
  diplomas: string[]
}

@Subject(...)
class Thesis {
  @Predicate(...)
  topic: string
  @Predicate(...)
  partOf: string
}

connection.manager.findAll([Thesis], {name: "Remo"})

*/

export class Connection {
  readonly manager: SubjectManager;

  readonly subjectMetadatas: SubjectMetadata[] = [];

  constructor(manager: SubjectManager) {
    this.manager = manager;
  }

  findMetadata(target: ObjectType<any>): SubjectMetadata | undefined {
    return this.subjectMetadatas.find((metadata) => {
      return metadata.target === target;
    });
  }

  getMetadata(target: ObjectType<any>): SubjectMetadata | undefined {
    return this.findMetadata(target);
  }
}
