import { ServiceMeta } from "../lib/metadata";
import { Option, none } from "fp-ts/lib/Option";
import { IServerAPI } from "./APIServer";

export interface IServerOptions {
  port?: number;
  processes?: number;
}

export interface IServerMetadata {
  options: IServerOptions;
  preprocess: any[];
  postprocess: any[];
  static: any[];
  ctor: Option<IServerAPI<any>>;
}

export const serverMeta = new ServiceMeta<IServerMetadata>({
  options: {},
  preprocess: [],
  postprocess: [],
  static: [],
  ctor: none,
});
