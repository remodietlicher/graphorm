import SparqlElement from "./SparqlElement";
import SparqlLeafElement from "./SparqlLeafElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlTripleElement
  extends SparqlLeafElement
  implements SparqlElement
{
  private readonly _subject;
  private readonly _predicate;
  private readonly _object;

  constructor(subject: string, predicate: string, object: string) {
    super();
    this._subject = subject;
    this._predicate = predicate;
    this._object = object;
  }

  getTriple(): string[] {
    return [this._subject, this._predicate, this._object];
  }

  acceptToString(visitor: SparqlVisitor): string {
    return visitor.visitTriple(this);
  }
}
