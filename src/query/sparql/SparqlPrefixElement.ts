import SparqlElement from "./SparqlElement";
import SparqlLeafElement from "./SparqlLeafElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlPrefixElement
  extends SparqlLeafElement
  implements SparqlElement
{
  private readonly _abbrev: string;
  private readonly _uri: string;

  constructor(abbrev: string, uri: string) {
    super();
    this._abbrev = abbrev;
    this._uri = uri;
  }

  getAbbreviation() {
    return this._abbrev;
  }

  getUri() {
    return this._uri;
  }

  acceptToString(visitor: SparqlVisitor): string {
    return visitor.visitPrefix(this);
  }
}
