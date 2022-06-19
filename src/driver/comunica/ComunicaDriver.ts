import { NodeMetadata } from "../../metadata/NodeMetadata";
import QueryDriver from "../QueryDriver";
import { QueryEngine } from "@comunica/query-sparql-solid";
import { QueryOptions } from "../../query/QueryOptions";

export class ComunicaDriver implements QueryDriver {
  private _engine: QueryEngine;

  constructor() {
    this._engine = new QueryEngine();
  }

  async runSelectQuery(
    query: string,
    metadata: NodeMetadata,
    sources: any,
    options?: QueryOptions
  ) {
    const bindingStream = await this._engine.queryBindings(query, {
      sources: sources,
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });

    const bindings = await bindingStream.toArray();
    let out: any[] = [];
    bindings.map((b) => {
      let node: any = {};
      metadata.edges.map((s) => {
        const value = b.get(`${s.name}`)!.value;
        switch (s.type) {
          case "String": {
            node[s.name] = value;
            break;
          }
          case "Number": {
            node[s.name] = +value;
            break;
          }
        }
      });
      out.push(node);
    });
    return out;
  }

  async runInsertQuery(query: string, source: any, options?: QueryOptions) {
    await this._engine.queryVoid(query, {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });
  }
}
