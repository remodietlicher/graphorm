import { NodeMetadata } from "../metadata/NodeMetadata";
import Query from "../sparql-query/Query";
import { QueryOptions } from "../sparql-query/QueryOptions";

export type QueryDriverType = "comunica";

abstract class QueryDriver {
  abstract runSelectQuery(
    query: Query<any>,
    metadata: NodeMetadata,
    sources: any,
    options?: QueryOptions
  );
  abstract runInsertQuery(
    query: Query<any>,
    source: any,
    options?: QueryOptions
  );
}

export default QueryDriver;
