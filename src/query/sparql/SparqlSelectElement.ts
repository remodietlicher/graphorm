import SparqlContainerElement from "./SparqlContainerElement";
import SparqlElement from "./SparqlElement";
import SparqlToStringVisitor from "./SparqlToStringVisitor";
import SparqlVariable from "./SparqlVariable";

export default class SparqlSelectElement
  extends SparqlContainerElement
  implements SparqlElement
{
  private readonly _select: SparqlVariable[];

  constructor(select: SparqlVariable[]) {
    super();
    this._select = select;
  }

  getSelect(): SparqlVariable[] {
    return this._select;
  }
  acceptToString(visitor: SparqlToStringVisitor): string {
    return visitor.visitSelect(this);
  }
}
