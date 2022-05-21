import { QueryDriverType } from "../../driver/QueryDriver";
import { ObjectType } from "../../util/ObjectType";

interface DataModelOptions {
  type: QueryDriverType;
  subjects: ObjectType<any>[];
}

export default DataModelOptions;
