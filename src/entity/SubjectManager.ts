import { Connection } from "../connection/Connection";
import { ComunicaSourceType } from "../driver/comunica/ComunicaSourceType";
import { SolidComunicaDriver } from "../driver/comunica/SolidComunicaDriver";
import { ObjectType } from "../util/ObjectType";

export class SubjectManager {
  readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async findAll<Subject>(
    subjectClass: ObjectType<Subject>,
    condition: any,
    sources: string[]
  ) {
    const metadata = this.connection.getMetadata(subjectClass);

    const queryDriver = new SolidComunicaDriver();

    if (metadata) {
      const result = await queryDriver.selectQuery(
        subjectClass,
        metadata,
        sources
      );
      return result;
    }
  }

  async save<Subject>(subject: Subject, source: string) {
    const metadata = this.connection.getMetadata(
      Object.getPrototypeOf(subject).constructor
    );
    const queryDriver = new SolidComunicaDriver();
    if (metadata) {
      const result = await queryDriver.insertQuery(subject, metadata, source);
    }
  }
}
