import { NodeManager } from "../entity/NodeManager";
import { MultipleMetadataError } from "../error/metadata/MetadataError";
import { MissingMetadataError } from "../error/metadata/MissingMetadataError";
import { getMetadataArgsStorage } from "../globals";
import { NodeMetadata } from "../metadata/NodeMetadata";
import { NodeMetadataBuilder } from "../metadata/NodeMetadataBuilder";
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
SELECT ?topic ?diploma WHERE {    <----- user input => from manager call
  ?x1 a Thesis;
      hasTopic ?topic;
      partOf ?diploma.            <----- ?diploma   => from metadata

  ?x2 a Person;
      name ?name;                 <----- "Remo"     => from manager call
      hasObtained ?diploma;
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

  private _nodeMetadatas: NodeMetadata[];
  public queryType: string;

  constructor(options: DataModelOptions) {
    this.queryType = options.type;

    this.buildMetadatas();
    this.createNodeManager();
  }

  /**
   * Get metadata for target class. @param target can either be the name of
   * the class or the class constructor function.
   */
  getMetadata(target: Function | string): NodeMetadata | undefined {
    const targetName =
      typeof target === "string" ? target : target.name.toLowerCase();
    const metadata = this._nodeMetadatas.filter(
      (metadata) => metadata.target.name.toLowerCase() === targetName
    );
    if (!metadata || metadata.length == 0)
      throw new MissingMetadataError(targetName);
    if (metadata.length != 1) throw new MultipleMetadataError(targetName);
    return metadata[0];
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
