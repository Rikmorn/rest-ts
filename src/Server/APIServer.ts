import * as express from "express";
import { NotFound } from "../Error";
import errorHandler from "../Error/ErrorHandler";

export interface IServerAPI<T extends object> {
  new (): T;
}

export class APIServer {
  private readonly expressServer: express.Express;
  // the ctor will hook up to the API lifecycle
  constructor(ctor: IServerAPI<any>) {
    this.expressServer = express();
  }

  get express(): express.Express {
    return this.expressServer;
  }

  public boot(): void {
    this.expressServer.disable("server");
    this.expressServer.disable("x-powered-by");

    // allocate preprocess middleware
    // allocate static content
    // allocate pos processing middleware

    this.expressServer.use((req, res, next) => next(new NotFound()));
    this.expressServer.use(errorHandler);
  }
}
