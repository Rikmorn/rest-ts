import { Option, none, fromNullable } from "fp-ts/lib/Option";
import { ServiceMeta } from "../lib/metadata";

export abstract class MetadataHash<T extends object> {
  private entries: { [name: string]: ServiceMeta<T> | undefined } = {};

  public get(name: string): ServiceMeta<T> {
    return fromNullable(this.entries[name]).getOrElseL(() => this.newEntry(name));
  }
  protected abstract newEntry(name: string): ServiceMeta<T>;
  protected save(name: string, data: ServiceMeta<T>): ServiceMeta<T> {
    this.entries[name] = data;
    return data;
  }
}
