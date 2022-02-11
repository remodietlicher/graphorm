import { ColumnOptions } from "../decorator/options/ColumnOptions";

export class ColumnMetaDataArgs {
  readonly target: Function;
  readonly propertyKey: string;
  readonly options: ColumnOptions | undefined;
}
