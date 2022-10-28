/**
 * Error emitted when class metadata initialization failed
 */
export class MissingMetadataError extends Error {
  constructor(className: string) {
    super(
      `Failed to initialize metadata: no metadata found for class ${className}`
    );
  }
}
