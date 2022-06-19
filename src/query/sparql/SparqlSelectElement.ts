import SparqlContainerElement from "./SparqlBaseElement";
import SparqlElement from "./SparqlElement";
import SparqlToStringVisitor from "./SparqlToStringVisitor";

export default class SparqlSelectElement
  extends SparqlContainerElement
  implements SparqlElement
{
  private readonly _select: string[];

  constructor(select: string[]) {
    super();
    this._select = select;
  }

  getSelect(): string[] {
    return this._select;
  }
  acceptToString(visitor: SparqlToStringVisitor): string {
    return visitor.visitSelect(this);
  }
}
