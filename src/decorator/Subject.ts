import { getMetadataArgsStorage } from "../globals";
import { SubjectOptions } from "./options/SubjectOptions";

export function Subject(options?: SubjectOptions): ClassDecorator {
  return function (target: Function) {
    getMetadataArgsStorage().subjects.push({
      target: target,
      options: options,
    });
  };
}
