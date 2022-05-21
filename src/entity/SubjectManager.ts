import { DataModel } from "../data-model/DataModel";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import { SolidComunicaDriver } from "../driver/comunica/SolidComunicaDriver";
import QueryDriver, { QueryDriverType } from "../driver/QueryDriver";
import { ObjectType } from "../util/ObjectType";

export class SubjectManager {
  readonly _model: DataModel;
  readonly _driver: QueryDriver;

  constructor(model: DataModel) {
    this._model = model;

    switch (this._model.queryType) {
      case "comunica":
        this._driver = new ComunicaDriver();
        break;
      case "comunica-solid":
        this._driver = new SolidComunicaDriver();
        break;
    }
  }

  async findAll<Subject>(
    subjectClass: ObjectType<Subject>,
    condition: any,
    sources: string[]
  ) {
    const metadata = this._model.getMetadata(subjectClass);

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
    const metadata = this._model.getMetadata(
      Object.getPrototypeOf(subject).constructor
    );
    const queryDriver = new SolidComunicaDriver();
    if (metadata) {
      const result = await queryDriver.insertQuery(subject, metadata, source);
    }
  }
}
