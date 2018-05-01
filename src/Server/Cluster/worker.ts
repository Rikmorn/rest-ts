import { fromNullable, some, none, option, Option } from "fp-ts/lib/Option";
import { Request, Response, NextFunction } from "express";
import * as cluster from "cluster";
import * as domain from "domain";
import { Server as HTTPServer } from "http";
import { APIServer } from "../APIServer";
import { get, Loggers } from "../../lib/logger";

const log = get(Loggers.server);

export type StickyCallback = (connection: any, workers: number) => Promise<number> | number;

export interface IClusterWorkerOptions {
  cluster: number;
  port: number;
  stickySessions?: StickyCallback;
}

// force handling of both cases!
const listen = (sticky: () => HTTPServer, normal: () => HTTPServer) => {
  return (opt: IClusterWorkerOptions) => {
    return opt.stickySessions ? sticky() : normal();
  };
};

const domainMiddleware = (rawServer: Option<HTTPServer>) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const d = domain.create();

  d.add(req);
  d.add(res);

  d.on("error", (err) => {
    // log errors
    log.error(err);

    // gracefully refuse requests and close existing before exit
    rawServer.map((s) =>
      s.close(() => {
        process.exit(1);
        log.info("Server has been closed");
      }),
    );

    // if longer than 20 seconds force exit - doesn't block event loop
    setTimeout(() => {
      process.exit(1);
      log.info("Server has been forced to close");
    }, 20000).unref();

    // @todo This should be within master code
    if (!cluster.worker.suicide) {
      cluster.worker.disconnect();
    }

    next(err);
  });

  d.run(() => next());
};

export default function(options: any, server: APIServer) {
  let maybeRawServer: Option<HTTPServer> = none;

  server.express.use(domainMiddleware(maybeRawServer));

  server.boot();

  const rawServer = listen(
    () => {
      // Don't expose our internal server to the outside.
      const app = server.express.listen(0, "localhost");

      // Listen to messages sent from the master. Ignore everything else.
      process.on("message", (message, connection) => {
        if (message === "sticky-session:connection") {
          // Emulate a connection event on the server by emitting the
          // event with the connection the master sent us.
          app.emit("connection", connection);

          connection.resume();
        }
      });

      return app;
    },
    () => {
      return server.express.listen(options.port, () => {
        log.info("Server listening on", {
          port: options.port,
          environment: server.express.get("env"),
        });
      });
    },
  )(options);

  maybeRawServer = some(rawServer);
}
