import QueryElement from "./QueryElement";
import QueryVisitor from "../visitors/QueryVisitor";

export default abstract class LeafElement implements QueryElement {
  addChild(child: QueryElement): void {
    console.log("cannot add child to leaf element");
  }

  getChildren(): QueryElement[] {
    console.log("Leaf element does not have any children");
    return [];
  }

  abstract acceptToString(visitor: QueryVisitor): string;
}
