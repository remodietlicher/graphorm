import { EdgeOptions } from "../../decorator/options/EdgeOptions";

export class EdgeMetadataArgs {
  readonly edge: string;
  readonly type: string;
  readonly target: Function;
  readonly propertyKey: string;
  readonly options: EdgeOptions | undefined;
}
