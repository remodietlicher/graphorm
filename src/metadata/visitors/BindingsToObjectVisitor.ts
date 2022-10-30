import { Bindings } from "@comunica/types";
import { MetadataParsingError } from "../../error/metadata/MetadataParsingError";
import { EdgeMetadata } from "../EdgeMetadata";
import { NodeMetadata } from "../NodeMetadata";
import { generateObjectName } from "./MetadataToTripleVisitor";

export default class BindingsToObjectVisitor {
  /**
   * map bindings onto the edge data type
   * or delegate to class node if edge has no primitive type
   */
  visitEdge(edge: EdgeMetadata, bindings: Bindings) {
    const targetMetadata = edge.getTargetNodeMetadata();
    let result;
    if (targetMetadata) {
      result = targetMetadata.acceptBindingsToObjectVisitor(this, bindings);
    } else {
      const name = generateObjectName(edge.target.name, edge.name);
      const value = bindings.get(name).value;
      switch (edge.type.toLowerCase()) {
        case "string": {
          result = value;
          break;
        }
        case "number": {
          result = +value;
          break;
        }
        default: {
          throw new MetadataParsingError(
            edge.name,
            edge.type,
            edge.target.name
          );
        }
      }
    }
    return result;
  }
  visitNode(node: NodeMetadata, bindings: Bindings) {
    const nodeObject: any = {};
    node.edges.map((e) => {
      nodeObject[e.name] = e.acceptBindingsToObjectVisitor(this, bindings);
    });
    return nodeObject;
  }
}
