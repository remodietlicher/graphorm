import "reflect-metadata";
import { getMetadataArgsStorage } from "../globals";
import { EdgeOptions } from "./options/EdgeOptions";

export function Edge(edge: string, options?: EdgeOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    getMetadataArgsStorage().edges.push({
      edge: edge,
      type: type.name,
      target: target.constructor,
      propertyKey: propertyKey,
      options: options,
    });
  };
}
