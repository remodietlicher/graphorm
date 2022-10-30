import { DataModel } from "../data-model/DataModel";
import { ComunicaDriver } from "../driver/comunica/ComunicaDriver";
import QueryDriver from "../driver/QueryDriver";
import BindingsToObjectVisitor from "../metadata/visitors/BindingsToObjectVisitor";
import { QueryBuilder } from "../sparql-query/QueryBuilder";
import { QueryOptions } from "../sparql-query/QueryOptions";
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
      const bindingsArray = await this._driver.runSelectQuery(
        query,
        sources,
        options
      );

      // pass the bindings object from the sparql query result through
      // the metadata tree to recover a object with shape defined by the
      // metadata
      const results: any[] = [];
      bindingsArray.map((bindings) => {
        const classObject = metadata.acceptBindingsToObjectVisitor(
          new BindingsToObjectVisitor(),
          bindings
        );
        results.push(classObject);
      });

      return results as Node[];
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
