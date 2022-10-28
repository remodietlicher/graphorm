import { NodeMetadata } from "../metadata/NodeMetadata";
import { QueryOptions } from "./QueryOptions";
import InsertElement from "./elements/InsertElement";
import PrefixElement from "./elements/PrefixElement";
import Query from "./Query";
import SelectElement from "./elements/SelectElement";
import TripleElement from "./elements/TripleElement";
import MetadataToTriplesVisitor from "../metadata/visitors/MetadataToTripleVisitor";
import MetadataToSelectVariableVisitor from "../metadata/visitors/MetadataToSelectVariableVisitor";

export class QueryBuilder {
  buildSelectQuery(metadata: NodeMetadata, options?: QueryOptions) {
    // create new query
    const query = new Query();

    // select element with all members/edges of the type
    const selectValues = metadata.acceptMetadataToSelectVariableVisitor(
      new MetadataToSelectVariableVisitor()
    );
    const select = new SelectElement(selectValues);

    const tripleContainer = metadata.acceptMetadataToTripleVisitor(
      new MetadataToTriplesVisitor(),
      options?.condition
    );

    select.addChild(tripleContainer);
    query.addElement(select);

    return query;
  }

  buildInsertQuery<Node>(
    node: Node,
    metadata: NodeMetadata,
    options?: QueryOptions
  ) {
    // create new query
    const query = new Query();

    // filter class members/edges with "primary: true"
    // and get corresponding member/edge names
    const primaryNames = metadata.edges
      .filter((e) => e.primary)
      .map((e) => e.name);

    // get corresponding values to primary members/edges
    let primaryPropertyValues: string[] = [];
    for (const [key, value] of Object.entries(node)) {
      if (primaryNames.includes(key)) primaryPropertyValues.push(value);
    }

    // join all primary member/edge values, use ":" prefix
    const nodeName = `:${primaryPropertyValues.join("")}`;

    const insert = new InsertElement();

    // add rdf type
    const rdfType = new TripleElement(
      nodeName,
      "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
      metadata.rdfObject
    );
    insert.addChild(rdfType);

    // generate sparql triple elements for each member/edge
    for (const [key, value] of Object.entries(node)) {
      const edge = metadata.edges.find((e) => e.name === key);

      if (edge) {
        const triple = new TripleElement(nodeName, edge?.edge, value, {
          objectType: edge?.type,
        });
        insert.addChild(triple);
      }
    }

    // set ":" prefix such that new nodes can be added to document with ":NodeName"
    const uri = options?.baseIRI ? options.baseIRI : "";
    const prefix = new PrefixElement("", uri);

    // add all elements to the built query
    query.addElement(prefix);
    query.addElement(insert);

    return query;
  }
}
