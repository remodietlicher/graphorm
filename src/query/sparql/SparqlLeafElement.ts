import SparqlElement from "./SparqlElement";
import SparqlVisitor from "./SparqlVisitor";

export default abstract class SparqlLeafElements implements SparqlElement {
  addChild(child: SparqlElement): void {
    console.log("cannot add child to leaf element");
  }

  getChildren(): SparqlElement[] {
    console.log("Leaf element does not have any children");
    return [];
  }

  abstract acceptToString(visitor: SparqlVisitor): string;
}
