import { NodeMetadata } from "../../metadata/NodeMetadata";
import QueryDriver from "../QueryDriver";
import { QueryEngine } from "@comunica/query-sparql-solid";
import { QueryOptions } from "../../sparql-query/QueryOptions";
import Query from "../../sparql-query/Query";

export class ComunicaDriver implements QueryDriver {
  private _engine: QueryEngine;

  constructor() {
    this._engine = new QueryEngine();
  }

  async runSelectQuery(
    query: Query<any>,
    metadata: NodeMetadata,
    sources: any,
    options?: QueryOptions
  ) {
    const bindingStream = await this._engine.queryBindings(query.toString(), {
      sources: sources,
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });

    const bindings = await bindingStream.toArray();
    return query.toType(bindings);
  }

  async runInsertQuery(query: Query<any>, source: any, options?: QueryOptions) {
    await this._engine.queryVoid(query.toString(), {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });
  }
}
