import { NodeMetadata } from "../metadata/NodeMetadata";
import { ObjectType } from "../util/ObjectType";
import { ComunicaSourceType } from "./comunica/ComunicaSourceType";

export type QueryDriverType = "comunica";

abstract class QueryDriver {
  abstract runSelectQuery(
    query: string,
    metadata: NodeMetadata,
    sources: string[] | ComunicaSourceType[]
  );
  abstract runInsertQuery(query: string, source: string | ComunicaSourceType);
}

export default QueryDriver;
