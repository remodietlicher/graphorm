import { DataModel } from "../data-model/DataModel";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import QueryDriver from "../driver/QueryDriver";
import { QueryBuilder } from "../query-builder/QueryBuilder";
import { QueryOptions } from "../query-builder/QueryOptions";
import { ObjectType } from "../util/ObjectType";

export class NodeManager {
  readonly _model: DataModel;
  readonly _driver: QueryDriver;

  constructor(model: DataModel) {
    this._model = model;

    switch (this._model.queryType) {
      case "comunica":
        this._driver = new ComunicaDriver();
        break;
    }
  }

  async findAll<Node>(
    nodeClass: ObjectType<Node>,
    condition: any,
    sources: any,
    options?: QueryOptions
  ) {
    const metadata = this._model.getMetadata(nodeClass);

    const queryBuilder = new QueryBuilder();

    if (metadata) {
      const query = queryBuilder.buildSelectQuery(metadata, options);
      const result = await this._driver.runSelectQuery(
        query,
        metadata,
        sources,
        options
      );
      return result as Node[];
    }
  }

  async save<Node>(node: Node, source: any, options?: QueryOptions) {
    const metadata = this._model.getMetadata(
      Object.getPrototypeOf(node).constructor
    );
    const queryBuilder = new QueryBuilder();
    if (metadata) {
      const query = queryBuilder.buildInsertQuery(node, metadata, options);
      const result = await this._driver.runInsertQuery(query, source);
    }
  }
}
