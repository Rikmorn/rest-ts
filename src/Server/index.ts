import { serverMeta } from "./Metadata";
import cluster from "./Cluster";
import { APIServer } from "./APIServer";
import { fromNullable } from "fp-ts/lib/Option";

export const start = () => {
  const apiServer = serverMeta
    .get("ctor")
    .map((ctor) => new APIServer(ctor))
    .getOrElseL(() => {
      throw Error(`"@Rest" annotation was not used to annotate a server class`);
    });

  fromNullable(serverMeta.get("options")).foldL(
    () => cluster(apiServer),
    ({ port, processes }) => cluster(apiServer, port, processes),
  );
};
