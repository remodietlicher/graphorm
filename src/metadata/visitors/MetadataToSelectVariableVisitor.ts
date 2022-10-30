import { EdgeMetadata } from "../EdgeMetadata";
import { NodeMetadata } from "../NodeMetadata";
import { generateObjectName } from "./MetadataToTripleVisitor";

export default class MetadataToSelectVariableVisitor {
  visitEdge(edge: EdgeMetadata): string[] {
    const targetNodeMetadata = edge.getTargetNodeMetadata();
    if (targetNodeMetadata) {
      return targetNodeMetadata.acceptMetadataToSelectVariableVisitor(this);
    } else {
      return [generateObjectName(edge.target.name, edge.name)];
    }
  }
  visitNode(node: NodeMetadata): string[] {
    const queryVariables: string[] = [];
    node.edges.forEach((e) => {
      queryVariables.push(...e.acceptMetadataToSelectVariableVisitor(this));
    });
    return queryVariables;
  }
}
