import "mocha";
import { expect } from "chai";
import * as Joi from "joi";

import { JSONSchemaRunTime } from "./JSONSchemaRunTimeType";
import { BadRequest } from "../Error";

describe("JSONSchemaRunTimeType", () => {
  const schema = {
    properties: {
      smaller: {
        type: "number",
        maximum: { $data: "1/larger" },
      },
      larger: { type: "number" },
    },
  };
  it("Should be a JSONSchemaRunTimeType instance", () => {
    const type = new JSONSchemaRunTime({});
    expect(type instanceof JSONSchemaRunTime).to.be.eql(true);
  });

  it("Should be a JSONSchemaRunTime instance given validation options", () => {
    const type = new JSONSchemaRunTime({}, { messages: true });
    expect(type instanceof JSONSchemaRunTime).to.be.eql(true);
  });

  it("Should validate and return data if input is correct", async () => {
    const data = {
      smaller: 5,
      larger: 7,
    };
    const sch = new JSONSchemaRunTime(schema, { $data: true });
    expect(await sch.validate(data)).to.be.eql(data);
  });

  it("Should a reject if input is incorrect", async () => {
    const data = {
      smaller: 9,
      larger: 7,
    };
    const sch = new JSONSchemaRunTime(schema, { $data: true });
    try {
      await sch.validate(data);
    } catch (err) {
      expect(err instanceof BadRequest).to.be.eql(true);
    }
  });
});
