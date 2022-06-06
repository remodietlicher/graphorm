import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { NodeMetadata } from "../../metadata/NodeMetadata";
import QueryDriver from "../QueryDriver";
import { ComunicaSourceType } from "./ComunicaSourceType";
import { QueryEngine } from "@comunica/query-sparql-solid";
import type * as RDF from "@rdfjs/types";
import { QueryOptions } from "../../query-builder/QueryOptions";

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
    let out: any = {};
    metadata.edges.map((s) => {
      bindings.map((b) => {
        const value = b.get(`${s.name}`)!.value;
        switch (s.type) {
          case "String": {
            out[s.name] = value;
            break;
          }
          case "Number": {
            out[s.name] = +value;
            break;
          }
        }
      });
    });
    return out;
  }

  async runInsertQuery(query: string, source: any, options?: QueryOptions) {
    console.log(query);
    await this._engine.queryVoid(query, {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        options?.session,
    });
  }
}
