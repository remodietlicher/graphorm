import { ActorInitSparql, newEngine } from "@comunica/actor-init-sparql";
export class SparqlDriver {
  private _engine: ActorInitSparql;

  constructor(private sources: string[]) {
    this._engine = newEngine();
  }
}
