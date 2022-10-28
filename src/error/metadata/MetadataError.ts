/**
 * Error emitted when class metadata initialization failed
 */
export class MultipleMetadataError extends Error {
  constructor(className: string) {
    super(
      `Failed to initialize metadata: multiple metadata found for class ${className}`
    );
  }
}
