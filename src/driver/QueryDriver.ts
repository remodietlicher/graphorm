import { NodeMetadata } from "../metadata/NodeMetadata";
import Query from "../query/Query";
import { QueryOptions } from "../query/QueryOptions";

export type QueryDriverType = "comunica";

abstract class QueryDriver {
  abstract runSelectQuery(
    query: Query,
    metadata: NodeMetadata,
    sources: any,
    options?: QueryOptions
  );
  abstract runInsertQuery(query: Query, source: any, options?: QueryOptions);
}

export default QueryDriver;
