import { ActorInitSparql, newEngine } from "@comunica/actor-init-sparql";
import { ObjectType } from "../../util/ObjectType";
export class SparqlDriver {
  private _engine: ActorInitSparql;

  private _sources: string[];

  constructor(sources: string[]) {
    this._engine = newEngine();
    this._sources = sources;
  }

  selectQuery<T>(entityClass: ObjectType<T>) {}
}
