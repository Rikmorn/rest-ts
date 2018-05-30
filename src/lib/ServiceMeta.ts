import { fromNullable, Option, none, some } from "fp-ts/lib/Option";

export class ServiceMeta<M extends object> {
  constructor(private meta: M) {}

  public set<P extends keyof M>(prop: P, data: M[P]): this {
    this.meta[prop] = data;
    return this;
  }

  public get<P extends keyof M>(prop: P): M[P] {
    return this.meta[prop];
  }

  get metadata(): M {
    return this.meta;
  }
}
