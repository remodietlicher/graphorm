import { NodeMetadata } from "../metadata/NodeMetadata";
import { QueryOptions } from "../query-builder/QueryOptions";

export type QueryDriverType = "comunica";

abstract class QueryDriver {
  abstract runSelectQuery(
    query: string,
    metadata: NodeMetadata,
    sources: any,
    options?: QueryOptions
  );
  abstract runInsertQuery(query: string, source: any, options?: QueryOptions);
}

export default QueryDriver;
