import QueryElement from "./QueryElement";
import LeafElement from "./LeafElement";
import QueryVisitor from "../visitors/QueryVisitor";

export default class PrefixElement extends LeafElement implements QueryElement {
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

  acceptToString(visitor: QueryVisitor): string {
    return visitor.visitPrefix(this);
  }
}
