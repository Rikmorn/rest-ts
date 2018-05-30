import { ServiceMetaDict } from "../../lib/ServiceMetaDict";
import { ServiceMeta } from "../../lib/ServiceMeta";
import { Option, none, fromNullable } from "fp-ts/lib/Option";
import { Middleware } from "../../Middleware";
import { Verb } from ".";

export interface IEndpointMetadata {
  path: string;
  verb: Verb;
  preprocess: Middleware[];
  posprocess: Middleware[];
}

export class EndpointMetadata extends ServiceMetaDict<IEndpointMetadata> {
  protected newEntry(name: string): ServiceMeta<IEndpointMetadata> {
    return this.save(
      name,
      new ServiceMeta<IEndpointMetadata>({
        path: "",
        verb: Verb.GET,
        preprocess: [],
        posprocess: [],
      }),
    );
  }
}
