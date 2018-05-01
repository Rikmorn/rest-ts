import { fromNullable, some, none } from "fp-ts/lib/Option";
import * as os from "os";
import * as cluster from "cluster";
import { createServer, Socket } from "net";
import { get, Loggers } from "../../lib/logger";
import { iterator } from "../../lib/iterator";
import { Either, left, right } from "fp-ts/lib/Either";

const log = get(Loggers.server);

function workerIndexByIP(connection: Socket, len: number): number {
  return fromNullable(connection.remoteAddress)
    .map((adds) => parseInt(adds.replace(/[^\d]/g, ""), 10))
    .chain((v) => (isNaN(v) ? none : some(v % len)))
    .filter((v) => !isNaN(v))
    .getOrElse(1);
}

function spawn(workers: cluster.Worker[], index: number) {
  workers[index] = cluster.fork();

  workers[index]
    .on("fork", () => {
      log.info(`worker[${index}] ${workers[index].process.pid} forked`);
    })
    .on("online", () => {
      log.info(`worker[${index}] ${workers[index].process.pid} online`);
    })
    .on("listening", () => {
      log.info(`worker[${index}] ${workers[index].process.pid} listening`);
    })
    .on("disconnect", () => {
      log.info(`worker[${index}] ${workers[index].process.pid} disconnected`);
      workers[index].removeAllListeners();
      spawn(workers, index);
    })
    .on("exit", () => {
      log.info(`worker[${index}] ${workers[index].process.pid} died`);
    })
    .on("error", (err) => {
      log.info(`worker[${index}] ${workers[index].process.pid} error`, err);
    });
}

function safeStickyCustomFunction(cb: StickyCallback) {
  return async (conn: Socket, len: number): Promise<number> => {
    let index = 0;
    try {
      index = (await cb(conn, len)) % len;
      if (isNaN(index)) {
        index = workerIndexByIP(conn, len);
      }
    } catch (err) {
      log.error("Error while obtaining worker index", err);
    }

    return index;
  };
}

// cl < 0 -> use all cpus minus cl
// cl = 0 -> use all cpus
// cl > 0 -> use cl cpus
function getClusterCount(total: number, cl?: number): number {
  let clusterCount = fromNullable(cl).getOrElse(1);

  if (clusterCount < 0) {
    clusterCount = total - clusterCount;
  } else if (clusterCount === 0) {
    clusterCount = total;
  }

  if (clusterCount < 0) {
    clusterCount = 1;
  }
  if (clusterCount > total) {
    clusterCount = total;
  }

  return clusterCount;
}

export type StickyCallback = (connection: Socket, workers: number) => Promise<number> | number;

export interface IClusterMasterOptions {
  processes?: number;
  port: number;
  stickySessions?: StickyCallback;
}

export default async function(options: IClusterMasterOptions): Promise<void> {
  const workers: cluster.Worker[] = [];
  const clusterSize = getClusterCount(os.cpus().length, options.processes);

  for (const w of iterator(clusterSize)) {
    spawn(workers, w);
  }

  if (options.stickySessions) {
    const workerIndexSafe = safeStickyCustomFunction(
      fromNullable(options.stickySessions).getOrElse(workerIndexByIP),
    );

    /**
     * Create the outside facing server listening on our port.
     */
    createServer({ pauseOnConnect: true }, async (connection) => {
      /**
       * We received a connection and need to pass it to the appropriate worker.
       * Get the worker for this connection's source IP and pass it the connection.
       */
      const worker = workers[await workerIndexSafe(connection, clusterSize)];
      worker.send("sticky-session:connection", connection);
    }).listen(options.port, () => {
      log.info(`Server listening on port ${options.port}`);
    });
  }
}
