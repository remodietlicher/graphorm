import { SubjectOptions } from "../../decorator/options/SubjectOptions";

export class SubjectMetadataArgs {
  readonly target: Function;
  readonly options: SubjectOptions | undefined;
}
