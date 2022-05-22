import { NodeManager } from "../entity/NodeManager";
import { getMetadataArgsStorage } from "../globals";
import { NodeMetadata } from "../metadata/NodeMetadata";
import { NodeMetadataBuilder } from "../metadata/NodeMetadataBuilder";
import { ObjectType } from "../util/ObjectType";
import DataModelOptions from "./options/DataModelOptions";

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

@Node(...)
class Person {
  @Edge(...)
  name: string
  @Edge(...)
  diplomas: string[]
}

@Node(...)
class Thesis {
  @Edge(...)
  topic: string
  @Edge(...)
  partOf: string
}

model.manager.findAll(Thesis, {name: "Remo"})

*/

export class DataModel {
  manager: NodeManager;

  _nodeMetadatas: NodeMetadata[];
  queryType: string;
  _connectedNodes: ObjectType<any>[];

  constructor(options: DataModelOptions) {
    this.queryType = options.type;
    this._connectedNodes = options.nodes;
  }

  findMetadata(target: ObjectType<any>): NodeMetadata | undefined {
    return this._nodeMetadatas.find((metadata) => {
      return metadata.target === target;
    });
  }

  getMetadata(target: ObjectType<any>): NodeMetadata | undefined {
    return this.findMetadata(target);
  }

  buildMetadatas() {
    const metadataBuilder = new NodeMetadataBuilder(
      getMetadataArgsStorage(),
      this
    );
    this._nodeMetadatas = metadataBuilder.build();
  }

  createNodeManager() {
    this.manager = new NodeManager(this);
  }
}
