import { NodeMetadata } from "../metadata/NodeMetadata";
import { QueryOptions } from "./QueryOptions";
import SparqlInsertElement from "./sparql/SparqlInsertElement";
import SparqlPrefixElement from "./sparql/SparqlPrefixElement";
import SparqlQuery from "./sparql/SparqlQuery";
import SparqlSelectElement from "./sparql/SparqlSelectElement";
import SparqlTripleElement from "./sparql/SparqlTripleElement";

export class QueryBuilder {
  buildSelectQuery(metadata: NodeMetadata, options?: QueryOptions) {
    // create new query
    const query = new SparqlQuery();

    // select element with all members/edges of the type
    const selectValues = metadata.edges.map((e) => {
      return { name: e.name, type: e.type };
    });
    const select = new SparqlSelectElement(selectValues);

    // add rdf type
    const rdfType = new SparqlTripleElement(
      "?x",
      "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
      metadata.rdfObject
    );
    select.addChild(rdfType);

    // construct triples that define for node "x" with given edges/members
    const triples = metadata.edges.map(
      (e) => new SparqlTripleElement("?x", e.edge, `?${e.name}`)
    );
    select.addChild(triples);

    // set additional restrictions on the query by providing
    // values for some of the members/edges
    if (options?.condition) {
      // only set restrictions for those members/edges given in the optional condition
      const restrictedEdges = metadata.edges.filter((e) =>
        Object.keys(options.condition).includes(e.name)
      );
      // map the restricted edges to triple elements
      const restrictions = restrictedEdges.map(
        (e) =>
          new SparqlTripleElement("?x", e.edge, options.condition[e.name], {
            objectType: e.type,
          })
      );
      // if there are any matches, add the restrictions to the select element
      if (restrictions) {
        select.addChild(restrictions);
      }
    }
    query.addElement(select);

    return query;
  }

  buildInsertQuery<Node>(
    node: Node,
    metadata: NodeMetadata,
    options?: QueryOptions
  ) {
    // create new query
    const query = new SparqlQuery();

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

    const insert = new SparqlInsertElement();

    // add rdf type
    const rdfType = new SparqlTripleElement(
      nodeName,
      "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
      metadata.rdfObject
    );
    insert.addChild(rdfType);

    // generate sparql triple elements for each member/edge
    for (const [key, value] of Object.entries(node)) {
      const edge = metadata.edges.find((e) => e.name === key);

      if (edge) {
        const triple = new SparqlTripleElement(nodeName, edge?.edge, value, {
          objectType: edge?.type,
        });
        insert.addChild(triple);
      }
    }

    // set ":" prefix such that new nodes can be added to document with ":NodeName"
    const uri = options?.baseIRI ? options.baseIRI : "";
    const prefix = new SparqlPrefixElement("", uri);

    // add all elements to the built query
    query.addElement(prefix);
    query.addElement(insert);

    return query;
  }
}
