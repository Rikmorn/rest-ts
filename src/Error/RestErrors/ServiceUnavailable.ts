/*tslint:disable:max-line-length*/
import { fromNullable, some, none } from "fp-ts/lib/Option";
import { APIError } from "../APIError";

const name = "ServiceUnavailableError";
const message = "Service unavailable error.";
const status = 503;

export class ServiceUnavailable extends APIError {
  constructor(errMessage?: string, details?: object) {
    super(
      status,
      name,
      fromNullable(errMessage)
        .chain((s) => (s === "" ? none : some(s)))
        .getOrElse(message),
      details,
    );

    // Set the prototype explicitly.
    // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ServiceUnavailable.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
