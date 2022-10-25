import QueryElement from "./QueryElement";
import QueryVisitor from "../visitors/QueryVisitor";

export default class ContainerElement implements QueryElement {
  private _children: QueryElement[] = [];
  addChild(child: QueryElement | QueryElement[]) {
    if (Array.isArray(child)) {
      this._children.push(...child);
    } else {
      this._children.push(child);
    }
  }
  getChildren() {
    return this._children;
  }

  acceptToString(visitor: QueryVisitor) {
    return visitor.visitContainer(this);
  }
}
