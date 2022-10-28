/**
 * Error emitted when query element construction fails
 */
export class QueryElementError extends Error {
  constructor(message: string) {
    super(`Failed to construct query: ${message}`);
  }
}
