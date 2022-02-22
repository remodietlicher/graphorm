import {
  ActorInitSparql,
  newEngine,
} from "@comunica/actor-init-sparql/index-browser";

export class SolidComunicaDriver {
  private _engine: ActorInitSparql;

  constructor(engine: ActorInitSparql) {
    this._engine = newEngine();
  }
}
