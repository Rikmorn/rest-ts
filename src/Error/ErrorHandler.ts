import { NextFunction, Request, Response } from "express";
import { APIError } from "./APIError";
import { ServerError } from "./RestErrors/ServerError";

interface IErrorData extends APIError {
  stack?: string;
}

// that next is needed!
export default function(err: Error, req: Request, res: Response, next: NextFunction): void {
  const defaultedError = err instanceof APIError ? err : new ServerError(err.message);
  const { stack, ...e } = defaultedError;

  // add stack when debuging application.
  // makes testing a little easier, plus flag can be flipped without restarting the api
  const error = process.env.DEBUG === "true" ? defaultedError : e;

  // log.error(err);
  res.status(error.status).json(error);
}
