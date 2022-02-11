import { getMetadataArgsStorage } from "../globals";
import { EntityOptions } from "./options/EntityOptions";

export function Entity(options?: EntityOptions): ClassDecorator {
  return function (target: Function) {
    getMetadataArgsStorage().tables.push({
      target: target,
      options: options,
    });
  };
}
