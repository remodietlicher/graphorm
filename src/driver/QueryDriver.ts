import { NodeMetadata } from "../metadata/NodeMetadata";
import { ObjectType } from "../util/ObjectType";
import { ComunicaSourceType } from "./comunica/ComunicaSourceType";

export type QueryDriverType = "comunica" | "comunica-solid";

abstract class QueryDriver {
  abstract selectQuery<Node>(
    nodeClass: ObjectType<Node>,
    metadata: NodeMetadata,
    sources: string[] | ComunicaSourceType[]
  );
  abstract insertQuery<Node>(
    node: Node,
    metadata: NodeMetadata,
    source: string | ComunicaSourceType
  );
}

export default QueryDriver;
