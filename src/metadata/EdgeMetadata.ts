export class EdgeMetadata {
  readonly predicate: string;
  readonly type: string;
  readonly target: Function;
  readonly name: string;
  readonly primary: boolean;

  constructor(
    edge: string,
    type: string,
    target: Function,
    name: string,
    primary: boolean
  ) {
    this.predicate = edge;
    this.type = type;
    this.target = target;
    this.name = name;
    this.primary = primary;
  }
}
