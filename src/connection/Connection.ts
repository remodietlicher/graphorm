import { SubjectManager } from "../entity/SubjectManager";

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
     hasEmail ?email;
     address ?adress.
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
SELECT ?topic WHERE {
  ?x1 a Thesis;
      hasTopic ?topic;
      supervisedBy ?supervisor;
      partOf ?associatedDiploma.  <----- ?diploma

  ?x2 a Person;
      name ?name;                 <----- "Remo"
      hasObtained ?diploma;
      hasEmail ?email;
      address ?adress.
  ?diploma a Diploma.
}

*/

export class Connection {
  readonly manager: SubjectManager;

  constructor(manager: SubjectManager) {
    this.manager = manager;
  }
}
