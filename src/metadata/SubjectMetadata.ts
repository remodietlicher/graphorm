import { Connection } from "../connection/Connection";
import { SubjectMetaDataArgs } from "./args/SubjectMetadataArgs";

export class SubjectMetadata {
  target: Function;

  metadataArgs: SubjectMetaDataArgs;

  readonly _connection: Connection;

  constructor(connection: Connection, metadataArgs: SubjectMetaDataArgs) {
    this._connection = connection;
    this.metadataArgs = metadataArgs;
  }
}
