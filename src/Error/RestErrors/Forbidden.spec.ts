import "mocha";
import { expect } from "chai";

import { APIError, Forbidden } from "..";

describe("Forbidden", () => {
  it("Should create an instance that extends Error object", () => {
    const err = new Forbidden();
    expect(err instanceof Error).to.be.eql(true);
  });

  it("Should create an instance that extends APIError object", () => {
    const err = new Forbidden();
    expect(err instanceof APIError).to.be.eql(true);
  });

  it("Should create an instance with no details and default msg", () => {
    const err = new Forbidden();
    expect(err.status).to.be.eql(403);
    expect(err.message).to.be.eql("Invalid access permissions.");
    expect(err.name).to.be.eql("ForbiddenError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and custom message", () => {
    const err = new Forbidden("yeah this is bad!");
    expect(err.status).to.be.eql(403);
    expect(err.message).to.be.eql("yeah this is bad!");
    expect(err.name).to.be.eql("ForbiddenError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and default message, if input msg is empty string", () => {
    const err = new Forbidden("");
    expect(err.status).to.be.eql(403);
    expect(err.message).to.be.eql("Invalid access permissions.");
    expect(err.name).to.be.eql("ForbiddenError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with details", () => {
    const err = new Forbidden(void 0, { a: 1 });
    expect(err.status).to.be.eql(403);
    expect(err.message).to.be.eql("Invalid access permissions.");
    expect(err.name).to.be.eql("ForbiddenError");
    expect(err.details).to.be.eql({ a: 1 });
  });

  it("Should create an instance with details and custom message", () => {
    const err = new Forbidden("this is bad", { a: 1 });
    expect(err.status).to.be.eql(403);
    expect(err.message).to.be.eql("this is bad");
    expect(err.name).to.be.eql("ForbiddenError");
    expect(err.details).to.be.eql({ a: 1 });
  });
});
