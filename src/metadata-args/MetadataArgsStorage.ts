import { ColumnMetaDataArgs } from "./ColumnMetadataArgs";
import { TableMetaDataArgs } from "./TableMetadataArgs";

export class MetadataArgsStorage {
  columns: ColumnMetaDataArgs[] = [];
  tables: TableMetaDataArgs[] = [];
}
