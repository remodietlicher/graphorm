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

  toType<Node>(bindings: any): Node[] {
    let out: any[] = [];

    // get all select elements in query
    const filter = this._root
      .getChildren()
      .filter((c) => c instanceof SelectElement);

    // there should only be a single one, else throw error
    if (filter.length === 1) {
      const select = filter[0] as SelectElement;

      // get targets of all edges and convert to Node member type
      bindings.map((b) => {
        let node: any = {};
        select.getSelect().map((s) => {
          const value = b.get(`${s.name}`)!.value;
          switch (s.type?.toLowerCase()) {
            case "string": {
              node[s.name] = value;
              break;
            }
            case "number": {
              node[s.name] = +value;
              break;
            }
          }
        });
        out.push(node);
      });
    } else {
      throw new Error(
        "Invalid Select query: does not contain exactly one select pattern"
      );
    }

    // by construction, the above process yield Node elements
    return out as Node[];
  }

  addElement(element: QueryElement) {
    this._root.addChild(element);
  }
}
