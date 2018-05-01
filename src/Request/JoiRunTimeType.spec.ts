import "mocha";
import { expect } from "chai";
import * as Joi from "joi";

import { JoiRunTime } from "./JoiRunTimeType";
import { BadRequest } from "../Error";

describe("JoiRunTime", () => {
  it("Should a JoiRunTime instance", () => {
    const type = new JoiRunTime(Joi.string());
    expect(type instanceof JoiRunTime).to.be.eql(true);
  });

  it("Should a JoiRunTime instance given joi validation options", () => {
    const type = new JoiRunTime(Joi.string(), { allowUnknown: true });
    expect(type instanceof JoiRunTime).to.be.eql(true);
  });

  it("Should validate and return data if input is correct", async () => {
    const type = new JoiRunTime(Joi.string());
    expect(await type.validate("hello")).to.be.eql("hello");
  });

  it("Should a reject if input is incorrect", async () => {
    const type = new JoiRunTime(Joi.string());
    try {
      await type.validate(1);
    } catch (err) {
      expect(err instanceof BadRequest).to.be.eql(true);
    }
  });
});
