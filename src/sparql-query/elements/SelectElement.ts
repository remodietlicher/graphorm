import ContainerElement from "./ContainerElement";
import QueryElement from "./QueryElement";
import QueryToStringVisitor from "../visitors/QueryToStringVisitor";

export default class SelectElement
  extends ContainerElement
  implements QueryElement
{
  private readonly _select: string[];

  constructor(select: string[]) {
    super();
    this._select = select;
  }

  /**
   * get the query variables returned by this select query
   */
  getSelect(): string[] {
    return this._select;
  }
  acceptToString(visitor: QueryToStringVisitor): string {
    return visitor.visitSelect(this);
  }
}
