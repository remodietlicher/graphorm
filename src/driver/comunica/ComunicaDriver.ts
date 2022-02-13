import { ActorInitSparql, newEngine } from "@comunica/actor-init-sparql";
export class SparqlDriver {
  private _engine: ActorInitSparql;

  private _sources: string[];

  constructor(sources: string[]) {
    this._engine = newEngine();
    this._sources = sources;
  }
}
