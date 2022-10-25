import QueryVisitor from "../visitors/QueryVisitor";

export default interface QueryElement {
  addChild(child: QueryElement | QueryElement[]): void;
  getChildren(): QueryElement[];
  acceptToString(visitor: QueryVisitor): string;
}
