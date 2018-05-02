import { Request, Response, NextFunction } from "express";

export type RawHandler = (req: Request, res: Response, next: NextFunction) => void;

export type AsyncHandler = (req: Request, res: Response) => PromiseLike<void>;

export type Middleware = AsyncHandler | RawHandler;

function isAsyncHandler(cb: Middleware): cb is AsyncHandler {
  return cb.length === 2;
}
export function handler(cb: Middleware) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isAsyncHandler(cb)) {
      try {
        await cb(req, res);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      cb(req, res, next);
    }
  };
}
