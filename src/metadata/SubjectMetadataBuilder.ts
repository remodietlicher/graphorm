import { Connection } from "../connection/Connection";
import { MetadataArgsStorage } from "./args/MetadataArgsStorage";
import { PredicateMetadata } from "./PredicateMetadata";
import { SubjectMetadata } from "./SubjectMetadata";

export class SubjectMetadataBuilder {
  private _metadataArgsStorage: MetadataArgsStorage;

  private _connection: Connection;

  constructor(
    metadataArgsStorage: MetadataArgsStorage,
    connection: Connection
  ) {
    this._metadataArgsStorage = metadataArgsStorage;
    this._connection = connection;
  }

  build(): SubjectMetadata[] {
    let subjectMetadatas = this._metadataArgsStorage.subjects.map((s) => {
      const subjectMetadata = new SubjectMetadata(this._connection, s);
      subjectMetadata.build();
      return subjectMetadata;
    });

    subjectMetadatas = subjectMetadatas.map((s) => {
      const predicateArgs = this._metadataArgsStorage.predicates.filter(
        (p) => p.target.name === s.target.name
      );
      const predicates = predicateArgs.map(
        (p) => new PredicateMetadata(p.target, p.propertyKey)
      );
      s.registerPredicates(predicates);
      return s;
    });

    return subjectMetadatas;
  }
}
