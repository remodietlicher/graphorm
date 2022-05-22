import { QueryDriverType } from "../../driver/QueryDriver";
import { ObjectType } from "../../util/ObjectType";

interface DataModelOptions {
  type: QueryDriverType;
  nodes: ObjectType<any>[];
}

export default DataModelOptions;
