/*tslint:disable:max-line-length*/
import { fromNullable, some, none } from "fp-ts/lib/Option";
import { APIError } from "../APIError";

const name = "ConflictError";
const message = "Conflict error.";
const status = 409;

export class Conflict extends APIError {
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
    Object.setPrototypeOf(this, Conflict.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
