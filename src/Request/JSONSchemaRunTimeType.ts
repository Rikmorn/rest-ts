import * as AJV from "ajv";
import { fromNullable, none, Option, some } from "fp-ts/lib/Option";
import { BadRequest } from "../Error";
import { IRunTimeType } from "./types";

export class JSONSchemaRunTime<T> implements IRunTimeType<T> {
  private readonly validateFunction: AJV.ValidateFunction;

  constructor(private readonly schema: object, options?: AJV.Options) {
    const ajv = fromNullable(options).foldL(() => new AJV(), (opt) => new AJV(opt));
    this.validateFunction = ajv.compile({ $async: true, ...this.schema });
  }
  public async validate(data: object): Promise<T> {
    // at run time data arg is user input which can be anything, compiler cannot inforce object
    if (typeof data !== "object") {
      throw new BadRequest(`Validation Error, data is a primitive type ${typeof data}`);
    }

    try {
      // validator allows primitive values
      return await this.validateFunction(data);
    } catch (err) {
      // can't do instanceof AJV.ValidationError
      if (err.errors) {
        throw new BadRequest(err.message, err.errors);
      }
      throw err;
    }
  }
}
