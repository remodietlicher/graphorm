import {
  ActorInitSparql,
  IQueryResultBindings,
  newEngine,
} from "@comunica/actor-init-sparql";
import { Subject } from "../../decorator/Subject";
import { SubjectMetadata } from "../../metadata/SubjectMetadata";
import { ObjectType } from "../../util/ObjectType";
import { ComunicaSourceType } from "./ComunicaSourceType";
export class ComunicaDriver {
  private _engine: ActorInitSparql;

  constructor() {
    this._engine = newEngine();
  }

  async selectQuery<Subject>(
    subjectClass: ObjectType<Subject>,
    metadata: SubjectMetadata,
    sources: ComunicaSourceType[]
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

    const raw = await this._engine.query(query, { sources: sources });

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
}
