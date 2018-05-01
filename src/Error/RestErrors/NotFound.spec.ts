import "mocha";
import { expect } from "chai";

import { APIError, NotFound } from "..";

describe("NotFound", () => {
  it("Should create an instance that extends Error object", () => {
    const err = new NotFound();
    expect(err instanceof Error).to.be.eql(true);
  });

  it("Should create an instance that extends APIError object", () => {
    const err = new NotFound();
    expect(err instanceof APIError).to.be.eql(true);
  });

  it("Should create an instance with no details and default msg", () => {
    const err = new NotFound();
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("Resource not found error.");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and custom message", () => {
    const err = new NotFound("yeah this is bad!");
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("yeah this is bad!");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and default message, if input msg is empty string", () => {
    const err = new NotFound("");
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("Resource not found error.");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with details", () => {
    const err = new NotFound(void 0, { a: 1 });
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("Resource not found error.");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql({ a: 1 });
  });

  it("Should create an instance with details and custom message", () => {
    const err = new NotFound("this is bad", { a: 1 });
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("this is bad");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql({ a: 1 });
  });
});
