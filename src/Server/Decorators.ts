import { serverMeta, IServerOptions } from "./Metadata";
import { some, fromNullable } from "fp-ts/lib/Option";
import { IServerAPI } from "./APIServer";

export function Rest<T extends object>(options?: IServerOptions) {
  return (target: IServerAPI<T>) => {
    serverMeta.set("ctor", some(target));
    fromNullable(options).map((o) => serverMeta.set("options", o));
  };
}

// export function Preprocess<T extends object>(preProcessors: IServerOptions) {
//   return (target: IServerAPI<T>) => {
//     serverMeta.set("preprocess", options);
//   };
// }

// export function PostProcess<T extends object>(postProcessors: IServerOptions) {
//   return (target: IServerAPI<T>) => {
//     serverMeta.set("postprocess", options);
//   };
// }

// export function Static<T extends object>(options: IServerOptions) {
//   return (target: IServerAPI<T>) => {
//     serverMeta.set("static", options);
//   };
// }
