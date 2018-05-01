import * as Joi from "joi";
import { fromNullable, none, Option, some } from "fp-ts/lib/Option";
import { BadRequest } from "../Error";
import { IRunTimeType } from "./types";

// Needs to be generalized to work with more than just Joi

export class JoiRunTime<T> implements IRunTimeType<T> {
  private readonly options: Joi.ValidationOptions;

  constructor(private readonly schema: Joi.Schema, options?: Joi.ValidationOptions) {
    this.options = fromNullable(options).getOrElse({ allowUnknown: true });
  }

  public async validate(data: any): Promise<T> {
    return new Promise<T>((res, rej) => {
      Joi.validate(data, this.schema, this.options, (err, value) => {
        fromNullable(err).foldL(
          () => res(value),
          () => rej(new BadRequest(err.message, err.details)),
        );
      });
    });
  }
}
