/**
 * Error emitted when form metadata initialization failed
 */
export class MultipleMetadataError extends Error {
  constructor(className: string) {
    super(
      `Failed to initialize metadata: multiple metadata found for class ${className}`
    );
  }
}
