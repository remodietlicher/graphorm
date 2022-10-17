import { DataModel } from "../data-model/DataModel";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import QueryDriver from "../driver/QueryDriver";
import { QueryBuilder } from "../query/QueryBuilder";
import { QueryOptions } from "../query/QueryOptions";
import { ObjectType } from "../util/ObjectType";

export class NodeManager {
  readonly _model: DataModel;
  readonly _driver: QueryDriver;
  readonly _queryBuilder: QueryBuilder;

  constructor(model: DataModel) {
    this._model = model;

    this._queryBuilder = new QueryBuilder();

    switch (this._model.queryType) {
      case "comunica":
        this._driver = new ComunicaDriver();
        break;
    }
  }

  async findAll<Node>(
    nodeClass: ObjectType<Node>,
    sources: any,
    options?: QueryOptions
  ) {
    const metadata = this._model.getMetadata(nodeClass);

    if (metadata) {
      const query = this._queryBuilder.buildSelectQuery(metadata, options);
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
    if (metadata) {
      const query = this._queryBuilder.buildInsertQuery(
        node,
        metadata,
        options
      );
      await this._driver.runInsertQuery(query, source, options);
    }
  }
}
