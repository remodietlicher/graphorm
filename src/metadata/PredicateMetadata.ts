import { PredicateOptions } from "../decorator/options/PredicateOptions";

export class PredicateMetadata {
  readonly target: Function;

  readonly name: string;

  readonly options: PredicateOptions;

  constructor(target: Function, name: string) {
    this.target = target;
    this.name = name;
  }
}
