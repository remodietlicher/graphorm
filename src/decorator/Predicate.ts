import { getMetadataArgsStorage } from "../globals";
import { PredicateOptions } from "./options/PredicateOptions";

export function Predicate(options?: PredicateOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string) {
    getMetadataArgsStorage().predicates.push({
      target: target.constructor,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
