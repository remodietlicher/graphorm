import QueryElement from "./QueryElement";
import QueryVisitor from "../visitors/QueryVisitor";
import { QueryConstructionError } from "../../error/query/QueryElementError";

export default abstract class LeafElement implements QueryElement {
  addChild(child: QueryElement): void {
    throw new QueryConstructionError("cannot add child to leaf element");
  }

  getChildren(): QueryElement[] {
    return [];
  }

  abstract acceptToString(visitor: QueryVisitor): string;
}
