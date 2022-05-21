import { DataModel } from "../data-model/DataModel";
import { SubjectMetadataArgs } from "./args/SubjectMetadataArgs";
import { PredicateMetadata } from "./PredicateMetadata";

export class SubjectMetadata {
  rdfObject: string;

  target: Function;

  metadataArgs: SubjectMetadataArgs;

  predicates: PredicateMetadata[] = [];

  readonly _model: DataModel;

  constructor(model: DataModel, metadataArgs: SubjectMetadataArgs) {
    this._model = model;
    this.metadataArgs = metadataArgs;
  }

  build() {
    this.rdfObject = this.metadataArgs.rdfObject;
    this.target = this.metadataArgs.target;
  }

  registerPredicates(predicates: PredicateMetadata[]) {
    this.predicates.push(...predicates);
  }
}
