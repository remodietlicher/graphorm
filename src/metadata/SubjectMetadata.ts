import { Connection } from "../connection/Connection";
import { SubjectMetadataArgs } from "./args/SubjectMetadataArgs";
import { PredicateMetadata } from "./PredicateMetadata";

export class SubjectMetadata {
  rdfObject: string;

  target: Function;

  metadataArgs: SubjectMetadataArgs;

  predicates: PredicateMetadata[] = [];

  readonly _connection: Connection;

  constructor(connection: Connection, metadataArgs: SubjectMetadataArgs) {
    this._connection = connection;
    this.metadataArgs = metadataArgs;
  }

  build() {
    this.rdfObject = this.metadataArgs.rdfObject;
    this.target = this.metadataArgs.target;
  }

  registerPredicates(predicates: PredicateMetadata[]) {
    this.predicates.push(...predicates);
  }
}
