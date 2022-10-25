import ContainerElement from "./ContainerElement";
import QueryElement from "./QueryElement";
import QueryVisitor from "../visitors/QueryVisitor";

export default class InsertElement
  extends ContainerElement
  implements QueryElement
{
  acceptToString(visitor: QueryVisitor): string {
    return visitor.visitInsert(this);
  }
}
