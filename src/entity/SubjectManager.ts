import { Connection } from "../connection/Connection";

export class SubjectManager {
  readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
}
