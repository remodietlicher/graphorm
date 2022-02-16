import { PredicateOptions } from "../../decorator/options/PredicateOptions";

export class PredicateMetadataArgs {
  readonly predicate: string;
  readonly type: string;
  readonly target: Function;
  readonly propertyKey: string;
  readonly options: PredicateOptions | undefined;
}
