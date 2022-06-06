import { NodeMetadata } from "../metadata/NodeMetadata";
import { QueryOptions } from "../query-builder/QueryOptions";

export type QueryDriverType = "comunica";

abstract class QueryDriver {
  abstract runSelectQuery(
    query: string,
    metadata: NodeMetadata,
    sources: any,
    queryOptions?: QueryOptions
  );
  abstract runInsertQuery(
    query: string,
    source: any,
    queryOptions?: QueryOptions
  );
}

export default QueryDriver;
