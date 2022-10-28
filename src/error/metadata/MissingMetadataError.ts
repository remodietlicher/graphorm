/**
 * Error emitted when form metadata initialization failed
 */
export class MissingMetadataError extends Error {
  constructor(className: string) {
    super(
      `Failed to initialize metadata: no metadata found for class ${className}`
    );
  }
}
