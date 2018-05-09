import { fromNullable, Option, none, some } from "fp-ts/lib/Option";

export class ServiceMeta<M extends object> {
  // private meta: Option<M> = none;

  constructor(private meta: M) {
    // this.meta = fromNullable(meta);
  }

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
