export class PredicateMetadata {
  readonly predicate: string;
  readonly type: string;
  readonly target: Function;
  readonly name: string;

  constructor(predicate: string, type: string, target: Function, name: string) {
    this.predicate = predicate;
    this.type = type;
    this.target = target;
    this.name = name;
  }
}
