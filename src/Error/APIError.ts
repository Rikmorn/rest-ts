/*tslint:disable:max-line-length*/
export class APIError extends Error {
  constructor(
    public readonly status: number,
    public readonly name: string,
    public readonly message: string,
    public readonly details?: object,
  ) {
    super();

    // Set the prototype explicitly.
    // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, APIError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
