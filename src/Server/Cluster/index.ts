import { isMaster } from "cluster";
import master from "./master";
import worker from "./worker";

import { APIServer } from "../APIServer";

export default function(server: APIServer, port = 8882, processes?: number) {
  return isMaster ? master({ port, processes }) : worker({ port, processes }, server);
}
