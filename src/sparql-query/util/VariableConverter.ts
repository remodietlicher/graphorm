export const LiteralConverter = (e) => e;
export const StringConverter = (e) => `"${e}"`;

export const typeToConverter = new Map<String, (e: string) => string>();
typeToConverter.set("String", StringConverter);
typeToConverter.set("Number", LiteralConverter);
typeToConverter.set("Literal", LiteralConverter);
