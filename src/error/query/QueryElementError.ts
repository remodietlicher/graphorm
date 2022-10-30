/**
 * Error emitted when query construction fails
 */
export class QueryConstructionError extends Error {
  constructor(message: string) {
    super(`Failed to construct query: ${message}`);
  }
}
