import { getMetadataArgsStorage } from "../globals";
import { NodeOptions } from "./options/NodeOptions";

export function Node(
  targetObject: string,
  options?: NodeOptions
): ClassDecorator {
  return function (target: Function) {
    getMetadataArgsStorage().nodes.push({
      rdfObject: targetObject,
      target: target,
      options: options,
    });
  };
}
