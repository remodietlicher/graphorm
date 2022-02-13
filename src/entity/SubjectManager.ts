import { Connection } from "../connection/Connection";
import { ObjectType } from "../util/ObjectType";

export class SubjectManager {
  readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  findAll<T>(subjectClass: ObjectType<T>, condition: any) {
    const metadata = this.connection.getMetadata(subjectClass);
  }
}
