import QueryVariable from "../../sparql-query/util/QueryVariable";
import { EdgeMetadata } from "../EdgeMetadata";
import { NodeMetadata } from "../NodeMetadata";
import { generateObjectName } from "./MetadataToTripleVisitor";

export default class MetadataToSelectVariableVisitor {
  visitEdge(edge: EdgeMetadata): QueryVariable[] {
    const targetNodeMetadata = edge.getTargetNodeMetadata();
    if (targetNodeMetadata) {
      return targetNodeMetadata.acceptMetadataToSelectVariableVisitor(this);
    } else {
      return [
        {
          name: generateObjectName(edge.target.name, edge.name),
          type: edge.type,
        },
      ] as QueryVariable[];
    }
  }
  visitNode(node: NodeMetadata): QueryVariable[] {
    const queryVariables: QueryVariable[] = [];
    node.edges.forEach((e) => {
      queryVariables.push(...e.acceptMetadataToSelectVariableVisitor(this));
    });
    return queryVariables;
  }
}
