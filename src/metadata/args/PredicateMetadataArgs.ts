import { PredicateOptions } from "../../decorator/options/PredicateOptions";

export class PredicateMetaDataArgs {
  readonly target: Function;
  readonly propertyKey: string;
  readonly options: PredicateOptions | undefined;
}
