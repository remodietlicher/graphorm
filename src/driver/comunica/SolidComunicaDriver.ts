import {
  ActorInitSparql,
  IQueryResultBindings,
} from "@comunica/actor-init-sparql";
import { newEngine } from "@comunica/actor-init-sparql-solid";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { SubjectMetadata } from "../../metadata/SubjectMetadata";
import { ObjectType } from "../../util/ObjectType";

export class SolidComunicaDriver {
  private _engine: ActorInitSparql;

  constructor() {
    this._engine = newEngine();
  }

  async selectQuery<Subject>(
    subjectClass: ObjectType<Subject>,
    metadata: SubjectMetadata,
    sources: string[]
  ) {
    const select = metadata.predicates.map((e) => `?${e.name}`);

    const predicateTriplets = metadata.predicates.map(
      (p) => `?x ${p.predicate} ?${p.name}.`
    );

    const query = `
      SELECT ${select.join(" ")} WHERE {
        ?x a ${metadata.rdfObject}.
        ${predicateTriplets.join("\n")}
      }
    `;

    const raw = await this._engine.query(query, {
      sources: sources,
      "@comunica/actor-http-inrupt-solid-client-authn:session":
        getDefaultSession(),
    });

    const bindings = await (raw as IQueryResultBindings).bindings();

    let out: any = {};
    metadata.predicates.map((s) => {
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
    return out as Subject;
  }

  async insertQuery<Subject>(
    subject: Subject,
    metadata: SubjectMetadata,
    source: string
  ) {
    const data: string[] = [];

    const primaryNames = metadata.predicates
      .filter((e) => e.primary)
      .map((e) => e.name);

    let primaryPropertyValues: string[] = [];
    for (const [key, value] of Object.entries(subject)) {
      if (primaryNames.includes(key)) primaryPropertyValues.push(value);
    }

    const subjectName = primaryPropertyValues.join("");

    const subjectURI = `<${source}#${subjectName}>`;

    for (const [key, value] of Object.entries(subject)) {
      const predicate = metadata.predicates.find((e) => e.name === key);

      let rdfObject = "";
      if (predicate) {
        switch (predicate.type) {
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
        ${subjectURI} ${predicate.predicate} ${rdfObject}.
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