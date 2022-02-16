import "reflect-metadata";
import { getMetadataArgsStorage } from "../globals";
import { PredicateOptions } from "./options/PredicateOptions";

export function Predicate(
  predicate: string,
  options?: PredicateOptions
): PropertyDecorator {
  return function (target: Object, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    getMetadataArgsStorage().predicates.push({
      predicate: predicate,
      type: type.name,
      target: target.constructor,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
