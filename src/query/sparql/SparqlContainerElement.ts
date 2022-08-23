import SparqlElement from "./SparqlElement";
import SparqlVisitor from "./SparqlVisitor";

export default class SparqlContainerElement implements SparqlElement {
  private _children: SparqlElement[] = [];
  addChild(child: SparqlElement | SparqlElement[]) {
    if (Array.isArray(child)) {
      this._children.push(...child);
    } else {
      this._children.push(child);
    }
  }
  getChildren() {
    return this._children;
  }

  acceptToString(visitor: SparqlVisitor) {
    return visitor.visitContainer(this);
  }
}
