import {
  ActorInitSparql,
  IQueryResultBindings,
} from "@comunica/actor-init-sparql";
import { newEngine } from "@comunica/actor-init-sparql-solid";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { NodeMetadata } from "../../metadata/NodeMetadata";
import { ObjectType } from "../../util/ObjectType";
import QueryDriver from "../QueryDriver";
import { ComunicaSourceType } from "./ComunicaSourceType";

export class SolidComunicaDriver implements QueryDriver {
  private _engine: ActorInitSparql;

  constructor() {
    this._engine = newEngine();
  }

  async selectQuery<Node>(
    nodeClass: ObjectType<Node>,
    metadata: NodeMetadata,
    sources: string[] | ComunicaSourceType[]
  ) {
    const select = metadata.edges.map((e) => `?${e.name}`);

    const triplets = metadata.edges.map((p) => `?x ${p.edge} ?${p.name}.`);

    const query = `
      SELECT ${select.join(" ")} WHERE {
        ?x a ${metadata.rdfObject}.
        ${triplets.join("\n")}
      }
    `;

    const raw = await this._engine.query(query, {
      sources: sources,
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        getDefaultSession(),
    });

    const bindings = await (raw as IQueryResultBindings).bindings();

    let out: any = {};
    metadata.edges.map((s) => {
      bindings.map((b) => {
        const value = b.get(`?${s.name}`).value;
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
    return out as Node;
  }

  async insertQuery<Node>(
    node: Node,
    metadata: NodeMetadata,
    source: string | ComunicaSourceType
  ) {
    const data: string[] = [];

    const primaryNames = metadata.edges
      .filter((e) => e.primary)
      .map((e) => e.name);

    let primaryPropertyValues: string[] = [];
    for (const [key, value] of Object.entries(node)) {
      if (primaryNames.includes(key)) primaryPropertyValues.push(value);
    }

    const nodeName = primaryPropertyValues.join("");

    const nodeURI = `<${source}#${nodeName}>`;

    for (const [key, value] of Object.entries(node)) {
      const edge = metadata.edges.find((e) => e.name === key);

      let rdfObject = "";
      if (edge) {
        switch (edge.type) {
          case "String": {
            rdfObject = `"${value}"`;
            break;
          }
          case "Number": {
            rdfObject = `${value}`;
            break;
          }
        }
        data.push(`
        ${nodeURI} ${edge.edge} ${rdfObject}.
      `);
      }
    }

    const query = `
      INSERT DATA {
        ${data.join("\n")}
      }
    `;

    console.log(query);
    const result = await this._engine.query(query, {
      sources: [source],
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        getDefaultSession(),
    });
    await (result as any).updateResult;
  }
}
