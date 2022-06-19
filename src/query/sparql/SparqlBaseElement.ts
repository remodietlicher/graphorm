import SparqlElement from "./SparqlElement";
import SparqlVisitor from "./SparqlVisitor";

export default abstract class SparqlContainerElement implements SparqlElement {
  private _children: SparqlElement[] = [];
  addChild(child: SparqlElement) {
    this._children.push(child);
  }
  getChildren() {
    return this._children;
  }

  abstract acceptToString(visitor: SparqlVisitor): string;
}
