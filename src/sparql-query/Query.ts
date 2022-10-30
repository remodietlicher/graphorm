import ContainerElement from "./elements/ContainerElement";
import QueryElement from "./elements/QueryElement";
import SelectElement from "./elements/SelectElement";
import QueryToStringVisitor from "./visitors/QueryToStringVisitor";

export default class Query<Node> {
  private _root: ContainerElement;
  private readonly _type: Node;

  constructor() {
    this._root = new ContainerElement();
  }

  toString() {
    return this._root.acceptToString(new QueryToStringVisitor());
  }

  addElement(element: QueryElement) {
    this._root.addChild(element);
  }
}
