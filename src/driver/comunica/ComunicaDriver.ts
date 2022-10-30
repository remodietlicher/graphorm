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
    sources: any,
    options?: QueryOptions
  ) {
    const bindingStream = await this._engine.queryBindings(query.toString(), {
      sources: sources,
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });

    return bindingStream.toArray();
  }

  async runInsertQuery(query: Query<any>, source: any, options?: QueryOptions) {
    await this._engine.queryVoid(query.toString(), {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });
  }
}
