import { Connection } from "../connection/Connection";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import { ComunicaSourceType } from "../driver/comunica/ComunicaSourceType";
import { ObjectType } from "../util/ObjectType";

export class SubjectManager {
  readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async findAll<Subject>(
    subjectClass: ObjectType<Subject>,
    condition: any,
    sources: ComunicaSourceType[]
  ) {
    const metadata = this.connection.getMetadata(subjectClass);

    const queryDriver = new ComunicaDriver();

    if (metadata) {
      const result = await queryDriver.selectQuery(
        subjectClass,
        metadata,
        sources
      );
      return result;
    }
  }

  async save<Subject>(subject: Subject, source: ComunicaSourceType) {
    const metadata = this.connection.getMetadata(
      Object.getPrototypeOf(subject).constructor
    );
    const queryDriver = new ComunicaDriver();
    if (metadata) {
      const result = await queryDriver.insertQuery(subject, metadata, source);
    }
  }
}
