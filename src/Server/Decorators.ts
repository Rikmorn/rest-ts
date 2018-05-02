import { serverMeta, IServerOptions, IServerMetadata, IStatic } from "./Metadata";
import { some, fromNullable } from "fp-ts/lib/Option";
import { IServerAPI } from "./APIServer";
import { Middleware } from "../Middleware";

export function Rest<T extends object>(options?: IServerOptions) {
  return (target: IServerAPI<T>) => {
    serverMeta.set("ctor", some(target));
    fromNullable(options).map((o) => serverMeta.set("options", o));
  };
}

export function Pre<T extends object>(preProcessors: Middleware | Middleware[]) {
  return (target: IServerAPI<T>) => {
    serverMeta.set("preprocess", Array.isArray(preProcessors) ? preProcessors : [preProcessors]);
  };
}

export function Pos<T extends object>(posProcessors: Middleware | Middleware[]) {
  return (target: IServerAPI<T>) => {
    serverMeta.set("posprocess", Array.isArray(posProcessors) ? posProcessors : [posProcessors]);
  };
}

export function Static<T extends object>(staticOptions: IStatic | IStatic[]) {
  return (target: IServerAPI<T>) => {
    serverMeta.set("static", Array.isArray(staticOptions) ? staticOptions : [staticOptions]);
  };
}
