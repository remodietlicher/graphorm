import ContainerElement from "./ContainerElement";
import QueryElement from "./QueryElement";
import QueryToStringVisitor from "../visitors/QueryToStringVisitor";
import QueryVariable from "../util/QueryVariable";

export default class SelectElement
  extends ContainerElement
  implements QueryElement
{
  private readonly _select: QueryVariable[];

  constructor(select: QueryVariable[]) {
    super();
    this._select = select;
  }

  getSelect(): QueryVariable[] {
    return this._select;
  }
  acceptToString(visitor: QueryToStringVisitor): string {
    return visitor.visitSelect(this);
  }
}
