import { getMetadataArgsStorage } from "../globals";
import { SubjectOptions } from "./options/SubjectOptions";

export function Subject(
  targetObject: string,
  options?: SubjectOptions
): ClassDecorator {
  return function (target: Function) {
    getMetadataArgsStorage().subjects.push({
      rdfObject: targetObject,
      target: target,
      options: options,
    });
  };
}
