import { getMetadataArgsStorage } from "../globals";
import { ColumnOptions } from "./options/ColumnOptions";

export function Column(options?: ColumnOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string) {
    getMetadataArgsStorage().columns.push({
      target: target.constructor,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
