import { NodeMetadata } from "../metadata/NodeMetadata";
import { QueryOptions } from "./QueryOptions";

export class QueryBuilder {
  constructor() {}

  buildSelectQuery(metadata: NodeMetadata, options?: QueryOptions) {
    const select = metadata.edges.map((e) => `?${e.name}`);

    const triplets = metadata.edges.map((p) => `?x ${p.edge} ?${p.name}.`);

    const query = `
      SELECT ${select.join(" ")} WHERE {
        ?x a ${metadata.rdfObject}.
        ${triplets.join("\n")}
      }
    `;

    return query;
  }

  buildInsertQuery<Node>(
    node: Node,
    metadata: NodeMetadata,
    options?: QueryOptions
  ) {
    const data: string[] = [];

    const primaryNames = metadata.edges
      .filter((e) => e.primary)
      .map((e) => e.name);

    let primaryPropertyValues: string[] = [];
    for (const [key, value] of Object.entries(node)) {
      if (primaryNames.includes(key)) primaryPropertyValues.push(value);
    }

    const nodeName = primaryPropertyValues.join("");

    for (const [key, value] of Object.entries(node)) {
      const edge = metadata.edges.find((e) => e.name === key);

      let rdfObject = "";
      if (edge) {
        switch (edge.type) {
          case "String": {
            rdfObject = `"${value}"`;
            break;
          }
          case "Number": {
            rdfObject = `${value}`;
            break;
          }
        }
        data.push(`
        :${nodeName} ${edge.edge} ${rdfObject}.
      `);
      }
    }

    const query = `
      PREFIX : <${options ? options.baseIRI : ""}#>
      INSERT DATA {
        ${data.join("\n")}
      }
    `;

    return query;
  }
}
