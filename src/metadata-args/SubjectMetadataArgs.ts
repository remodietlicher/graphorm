import { SubjectOptions } from "../decorator/options/SubjectOptions";

export class SubjectMetaDataArgs {
  readonly target: Function;
  readonly options: SubjectOptions | undefined;
}
