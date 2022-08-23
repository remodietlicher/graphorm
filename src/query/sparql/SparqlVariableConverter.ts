export const SparqlLiteralConverter = (e) => e;
export const SparqlStringConverter = (e) => `"${e}"`;

export const typeToConverter = new Map<String, (e: string) => string>();
typeToConverter.set("String", SparqlStringConverter);
typeToConverter.set("Number", SparqlLiteralConverter);
typeToConverter.set("Literal", SparqlLiteralConverter);
