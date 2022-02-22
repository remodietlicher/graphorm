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
      const predicates = predicateArgs.map((p) => {
        const primary = p.options?.primary ? p.options.primary : false;
        return new PredicateMetadata(
          p.predicate,
          p.type,
          p.target,
          p.propertyKey,
          primary
        );
      });
      s.registerPredicates(predicates);
      return s;
    });

    return subjectMetadatas;
  }
}
