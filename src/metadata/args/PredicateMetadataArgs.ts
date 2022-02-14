import { PredicateOptions } from "../../decorator/options/PredicateOptions";

export class PredicateMetadataArgs {
  readonly target: Function;
  readonly propertyKey: string;
  readonly options: PredicateOptions | undefined;
}
