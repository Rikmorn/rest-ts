import "mocha";
import { expect } from "chai";

import { APIError, TooManyRequests } from "..";

describe("TooManyRequests", () => {
  it("Should create an instance that extends Error object", () => {
    const err = new TooManyRequests();
    expect(err instanceof Error).to.be.eql(true);
  });

  it("Should create an instance that extends APIError object", () => {
    const err = new TooManyRequests();
    expect(err instanceof APIError).to.be.eql(true);
  });

  it("Should create an instance with no details and default msg", () => {
    const err = new TooManyRequests();
    expect(err.status).to.be.eql(429);
    expect(err.message).to.be.eql("Too many requests.");
    expect(err.name).to.be.eql("TooManyRequestsError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and custom message", () => {
    const err = new TooManyRequests("yeah this is bad!");
    expect(err.status).to.be.eql(429);
    expect(err.message).to.be.eql("yeah this is bad!");
    expect(err.name).to.be.eql("TooManyRequestsError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with no details and default message, if input msg is empty string", () => {
    const err = new TooManyRequests("");
    expect(err.status).to.be.eql(429);
    expect(err.message).to.be.eql("Too many requests.");
    expect(err.name).to.be.eql("TooManyRequestsError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an instance with details", () => {
    const err = new TooManyRequests(void 0, { a: 1 });
    expect(err.status).to.be.eql(429);
    expect(err.message).to.be.eql("Too many requests.");
    expect(err.name).to.be.eql("TooManyRequestsError");
    expect(err.details).to.be.eql({ a: 1 });
  });

  it("Should create an instance with details and custom message", () => {
    const err = new TooManyRequests("this is bad", { a: 1 });
    expect(err.status).to.be.eql(429);
    expect(err.message).to.be.eql("this is bad");
    expect(err.name).to.be.eql("TooManyRequestsError");
    expect(err.details).to.be.eql({ a: 1 });
  });
});
