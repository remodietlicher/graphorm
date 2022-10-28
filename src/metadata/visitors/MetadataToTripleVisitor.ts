import ContainerElement from "../../sparql-query/elements/ContainerElement";
import QueryElement from "../../sparql-query/elements/QueryElement";
import TripleElement from "../../sparql-query/elements/TripleElement";
import { EdgeMetadata } from "../EdgeMetadata";
import { NodeMetadata } from "../NodeMetadata";

export const generateObjectName = (nodeName: string, edgeName: string) => {
  return `${nodeName.toLowerCase()}${edgeName
    .charAt(0)
    .toUpperCase()}${edgeName.slice(1)}`;
};

export default class MetadataToTriplesVisitor {
  visitEdge(edge: EdgeMetadata, condition?: any): QueryElement[] {
    const queryElements: QueryElement[] = [];
    const targetNodeMetadata = edge.getTargetNodeMetadata();

    // restrict query to concrete values of condition if provided
    // edge name is provided in any case to match select variables
    // if this edge targets another class node, restriction is delegated.
    let value = targetNodeMetadata
      ? `?${targetNodeMetadata.target.name}`
      : `?${generateObjectName(edge.target.name, edge.name)}`;
    if (condition && !targetNodeMetadata) {
      value = Object.keys(condition).includes(edge.name)
        ? `${value}, "${condition[edge.name]}"`
        : `${value}`;
    }
    queryElements.push(
      new TripleElement(`?${edge.target.name}`, edge.edge, value)
    );

    // for edges that target class nodes, add class node container
    if (targetNodeMetadata) {
      // only pass down the part of the condition object matching the member class type
      let subCondition =
        edge.target.name in condition ? condition[edge.target.name] : undefined;
      queryElements.push(
        targetNodeMetadata.acceptMetadataToTripleVisitor(this, subCondition)
      );
    }

    return queryElements;
  }
  visitNode(node: NodeMetadata, condition?: any): ContainerElement {
    const container = new ContainerElement();
    node.edges.forEach((e) => {
      container.addChild(e.acceptMetadataToTripleVisitor(this, condition));
    });
    return container;
  }
}
