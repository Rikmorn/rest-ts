import { fromNullable, some } from "fp-ts/lib/Option";

import { Middleware } from "../Middleware";
import { ControllerMeta } from "./Metadata";
import { Verb } from "./Endpoint";

export interface IController<T extends object> {
  new (): T;
}

export function Controller<T extends object>(path?: string) {
  return (target: IController<T>) => {
    const ctrl = ControllerMeta.get(target.name);
    ctrl.set("path", fromNullable(path).getOrElseL(() => target.name.toLowerCase()));
  };
}

//

// export function Parent<T>(parent: string, path?: string): (target: IConstructableController<T>) => void;
// export function Parent<T>(parent: IConstructableController<any>,
//                           path: string): (target: IConstructableController<T>) => void;
// export function Parent<T>(...args: any[]) {
//   return (target: IConstructableController<T>) => {
//     const parent = args[0];
//     const name = (typeof parent === "string") ? parent : parent.name;

//     const entityData = manager.init(target);
//     entityData.parent = some({
//       type: (typeof parent === "string") ? ParentType.namespace : ParentType.controller,
//       name,
//       path: args[1],
//     });
//   };
// }

export function Pre(preProcessors: Middleware | Middleware[]) {
  return (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => {
    const ctrl = ControllerMeta.get(target.name);

    const mw = Array.isArray(preProcessors) ? preProcessors : [preProcessors];
    // Class level MW
    if (propertyKey === void 0 || descriptor === void 0) {
      ctrl.set("preprocess", mw);
    } else {
      // Method level MW
      ctrl
        .get("endpoints")
        .get(propertyKey)
        .set("preprocess", mw);
    }
  };
}

export function Pos(posProcessors: Middleware | Middleware[]) {
  return (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => {
    const ctrl = ControllerMeta.get(target.name);

    const mw = Array.isArray(posProcessors) ? posProcessors : [posProcessors];
    // Class level MW
    if (propertyKey === void 0 || descriptor === void 0) {
      ctrl.set("posprocess", mw);
    } else {
      // Method level MW
      ctrl
        .get("endpoints")
        .get(propertyKey)
        .set("posprocess", mw);
    }
  };
}

function assignVerb<T>(verb: Verb, path: string) {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
    const endpointMeta = ControllerMeta.get(target.name)
      .get("endpoints")
      .get(propertyKey);

    endpointMeta.set("verb", verb);
    endpointMeta.set("path", path);
  };
}

// Endpoint specific
export function Get<T>(p: string) {
  return assignVerb<T>(Verb.GET, p);
}

export function Post<T>(p: string) {
  return assignVerb<T>(Verb.POST, p);
}

export function Patch<T>(p: string) {
  return assignVerb<T>(Verb.PATCH, p);
}

export function Put<T>(p: string) {
  return assignVerb<T>(Verb.PUT, p);
}

export function Delete<T>(p: string) {
  return assignVerb<T>(Verb.DELETE, p);
}
