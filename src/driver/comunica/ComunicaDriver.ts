import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { NodeMetadata } from "../../metadata/NodeMetadata";
import QueryDriver from "../QueryDriver";
import { ComunicaSourceType } from "./ComunicaSourceType";
import { QueryEngine } from "@comunica/query-sparql-solid";
import type * as RDF from "@rdfjs/types";

export class ComunicaDriver implements QueryDriver {
  private _engine: QueryEngine;
  private _isBrowser: boolean;

  constructor() {
    this._engine = new QueryEngine();
    this._isBrowser = typeof window != "undefined";
  }

  async runSelectQuery(
    query: string,
    metadata: NodeMetadata,
    sources: string[] | ComunicaSourceType[] | RDF.Source[]
  ) {
    const bindingStream = await this._engine.queryBindings(query, {
      sources: sources as any,
      "@comunica/actor-http-inrupt-solid-client-authn:session": this._isBrowser
        ? getDefaultSession()
        : undefined,
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

  async runInsertQuery(query: string, source: string | ComunicaSourceType) {
    console.log(query);
    await this._engine.queryVoid(query, {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session": this._isBrowser
        ? getDefaultSession()
        : undefined,
    });
  }
}
