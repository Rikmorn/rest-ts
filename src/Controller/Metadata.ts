import { ServiceMetaDict } from "../lib/ServiceMetaDict";
import { ServiceMeta } from "../lib/ServiceMeta";
import { Option, none, fromNullable } from "fp-ts/lib/Option";
import { Middleware } from "../Middleware";
import { EndpointMetadata } from "./Endpoint/Metadata";

export interface IControllerMetadata {
  parent: Option<string>;
  name: string;
  path: string;
  endpoints: EndpointMetadata;
  preprocess: Middleware[];
  posprocess: Middleware[];
}

export class CtrlMetadata extends ServiceMetaDict<IControllerMetadata> {
  protected newEntry(name: string): ServiceMeta<IControllerMetadata> {
    return this.save(
      name,
      new ServiceMeta<IControllerMetadata>({
        parent: none,
        name,
        path: "",
        endpoints: new EndpointMetadata(),
        preprocess: [],
        posprocess: [],
      }),
    );
  }
}

export const ControllerMeta = new CtrlMetadata();
