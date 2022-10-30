/**
 * Error emitted when query result bindings cannot be parsed
 */
export class MetadataParsingError extends Error {
  constructor(
    propertyKey: string,
    propertyType: string,
    targetClassName: string
  ) {
    super(
      `failed to parse key ${propertyKey} of type ${propertyType} in class ${targetClassName}`
    );
  }
}
