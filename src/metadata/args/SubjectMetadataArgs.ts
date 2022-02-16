import { SubjectOptions } from "../../decorator/options/SubjectOptions";

export class SubjectMetadataArgs {
  readonly rdfObject: string;
  readonly target: Function;
  readonly options: SubjectOptions | undefined;
}
