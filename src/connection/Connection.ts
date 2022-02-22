import {
  getDefaultSession,
  login,
  Session,
} from "@inrupt/solid-client-authn-browser";
import { SubjectManager } from "../entity/SubjectManager";
import { getMetadataArgsStorage } from "../globals";
import { SubjectMetadata } from "../metadata/SubjectMetadata";
import { SubjectMetadataBuilder } from "../metadata/SubjectMetadataBuilder";
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

connection.manager.findAll(Thesis, {name: "Remo"})

*/

export class Connection {
  manager: SubjectManager;

  subjectMetadatas: SubjectMetadata[];

  readonly session: Session;

  constructor() {
    this.session = getDefaultSession();
  }

  async connect(oidcIssuer: string) {
    if (!this.session.info.isLoggedIn) {
      await login({
        oidcIssuer: oidcIssuer,
        redirectUrl: window.location.href,
        clientName: "sparql-orm",
      });
    }
  }

  findMetadata(target: ObjectType<any>): SubjectMetadata | undefined {
    return this.subjectMetadatas.find((metadata) => {
      return metadata.target === target;
    });
  }

  getMetadata(target: ObjectType<any>): SubjectMetadata | undefined {
    return this.findMetadata(target);
  }

  buildMetadatas() {
    const metadataBuilder = new SubjectMetadataBuilder(
      getMetadataArgsStorage(),
      this
    );
    this.subjectMetadatas = metadataBuilder.build();
  }

  createSubjectManager() {
    this.manager = new SubjectManager(this);
  }
}
