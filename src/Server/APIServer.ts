import * as express from "express";
import { NotFound } from "../Error";
import errorHandler from "../Error/ErrorHandler";
import { serverMeta } from "./Metadata";
import { fromNullable } from "fp-ts/lib/Option";

export interface IServerAPI<T extends object> {
  new (): T;
  // TODO: add lifecycle methods
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
    // may remove these defaults...
    this.expressServer.disable("server");
    this.expressServer.disable("x-powered-by");

    // add service wide pre process middleware
    serverMeta
      .get("preprocess")
      .reverse() // TS processes annotations from the bottom up
      .forEach((mw) => this.expressServer.use(mw));

    // add static handlers
    serverMeta
      .get("static")
      .reverse()
      .forEach((st) => {
        fromNullable(st.mountPath).foldL(
          () => this.expressServer.use(express.static(st.targetFolder, st.options)),
          (mp) => this.expressServer.use(mp, express.static(st.targetFolder, st.options)),
        );
      });

    // add service routes

    // add service pos process middleware
    serverMeta
      .get("posprocess")
      .reverse()
      .forEach((mw) => this.expressServer.use(mw));

    this.expressServer.use((req, res, next) => next(new NotFound()));
    this.expressServer.use(errorHandler);
  }
}
