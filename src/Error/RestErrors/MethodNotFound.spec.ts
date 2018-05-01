import "mocha";
import { expect } from "chai";

import { APIError, MethodNotFound } from "..";

describe("MethodNotFound", () => {
  it("Should create an instance that extends Error object", () => {
    const err = new MethodNotFound();
    expect(err instanceof Error).to.be.eql(true);
  });

  it("Should create an instance that extends APIError object", () => {
    const err = new MethodNotFound();
    expect(err instanceof APIError).to.be.eql(true);
  });

  it("Should create an instance with no details and default msg", () => {
    const err = new MethodNotFound();
    expect(err.status).to.be.eql(405);
    expect(err.message).to.be.eql("Method not found.");
    expect(err.name).to.be.eql("MethodNotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and custom message", () => {
    const err = new MethodNotFound("yeah this is bad!");
    expect(err.status).to.be.eql(405);
    expect(err.message).to.be.eql("yeah this is bad!");
    expect(err.name).to.be.eql("MethodNotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and default message, if input msg is empty string", () => {
    const err = new MethodNotFound("");
    expect(err.status).to.be.eql(405);
    expect(err.message).to.be.eql("Method not found.");
    expect(err.name).to.be.eql("MethodNotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with details", () => {
    const err = new MethodNotFound(void 0, { a: 1 });
    expect(err.status).to.be.eql(405);
    expect(err.message).to.be.eql("Method not found.");
    expect(err.name).to.be.eql("MethodNotFoundError");
    expect(err.details).to.be.eql({ a: 1 });
  });

  it("Should create an instance with details and custom message", () => {
    const err = new MethodNotFound("this is bad", { a: 1 });
    expect(err.status).to.be.eql(405);
    expect(err.message).to.be.eql("this is bad");
    expect(err.name).to.be.eql("MethodNotFoundError");
    expect(err.details).to.be.eql({ a: 1 });
  });
});
