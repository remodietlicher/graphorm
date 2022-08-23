import Query from "../Query";
import SparqlContainerElement from "./SparqlContainerElement";
import SparqlElement from "./SparqlElement";
import SparqlSelectElement from "./SparqlSelectElement";
import SparqlToStringVisitor from "./SparqlToStringVisitor";

export default class SparqlQuery<Node> implements Query {
  private _root: SparqlContainerElement;
  private readonly _type: Node;

  constructor() {
    this._root = new SparqlContainerElement();
  }

  toString() {
    return this._root.acceptToString(new SparqlToStringVisitor());
  }

  toType<Node>(bindings: any): Node[] {
    let out: any[] = [];

    // get all select elements in query
    const filter = this._root
      .getChildren()
      .filter((c) => c instanceof SparqlSelectElement);

    // there should only be a single one, else throw error
    if (filter.length === 1) {
      const select = filter[0] as SparqlSelectElement;

      // get targets of all edges and convert to Node member type
      bindings.map((b) => {
        let node: any = {};
        select.getSelect().map((s) => {
          const value = b.get(`${s.name}`)!.value;
          switch (s.type) {
            case "String": {
              node[s.name] = value;
              break;
            }
            case "Number": {
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

  addElement(element: SparqlElement) {
    this._root.addChild(element);
  }
}
