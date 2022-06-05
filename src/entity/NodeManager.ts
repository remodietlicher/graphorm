import { DataModel } from "../data-model/DataModel";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import QueryDriver, { QueryDriverType } from "../driver/QueryDriver";
import { QueryBuilder } from "../query-builder/QueryBuilder";
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
    sources: string[]
  ) {
    const metadata = this._model.getMetadata(nodeClass);

    const queryBuilder = new QueryBuilder();

    if (metadata) {
      const query = queryBuilder.buildSelectQuery(metadata);
      const result = await this._driver.runSelectQuery(
        query,
        metadata,
        sources
      );
      return result as Node;
    }
  }

  async save<Node>(node: Node, source: string) {
    const metadata = this._model.getMetadata(
      Object.getPrototypeOf(node).constructor
    );
    const queryBuilder = new QueryBuilder();
    if (metadata) {
      const query = queryBuilder.buildInsertQuery(node, metadata);
      const result = await this._driver.runInsertQuery(query, source);
    }
  }
}
