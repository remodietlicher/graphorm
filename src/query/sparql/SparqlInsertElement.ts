import SparqlContainerElement from "./SparqlContainerElement";
import SparqlElement from "./SparqlElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlInsertElement
  extends SparqlContainerElement
  implements SparqlElement
{
  acceptToString(visitor: SparqlVisitor): string {
    return visitor.visitInsert(this);
  }
}
