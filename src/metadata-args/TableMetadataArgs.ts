import { TableOptions } from "../decorator/options/TableOptions";

export class TableMetaDataArgs {
  readonly target: Function;
  readonly options: TableOptions | undefined;
}
