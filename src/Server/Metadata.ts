import { ServiceMeta } from "../lib/metadata";
import { Option, none } from "fp-ts/lib/Option";
import { IServerAPI } from "./APIServer";
import { Middleware } from "../Middleware";
import { ServeStaticOptions as IStaticOptions } from "serve-static";

export interface IStatic {
  targetFolder: string;
  mountPath?: string;
  options?: IStaticOptions;
}

export interface IServerOptions {
  port?: number;
  processes?: number;
}

export interface IStaticOption {
  targetFolder: string;
  mountPath: string;
  options: string;
}

export interface IServerMetadata {
  options: IServerOptions;
  preprocess: Middleware[];
  posprocess: Middleware[];
  static: IStatic[];
  ctor: Option<IServerAPI<any>>;
}

export const serverMeta = new ServiceMeta<IServerMetadata>({
  options: {},
  preprocess: [],
  posprocess: [],
  static: [],
  ctor: none,
});
