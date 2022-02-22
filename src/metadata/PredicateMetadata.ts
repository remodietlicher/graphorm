export class PredicateMetadata {
  readonly predicate: string;
  readonly type: string;
  readonly target: Function;
  readonly name: string;
  readonly primary: boolean;

  constructor(
    predicate: string,
    type: string,
    target: Function,
    name: string,
    primary: boolean
  ) {
    this.predicate = predicate;
    this.type = type;
    this.target = target;
    this.name = name;
    this.primary = primary;
  }
}
