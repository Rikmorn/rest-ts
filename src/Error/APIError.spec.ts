import "mocha";
import { expect } from "chai";

import { APIError } from "./APIError";

describe("APIError", () => {
  it("Should create an API error instance that extends Error object", () => {
    const err = new APIError(404, "NotFoundError", "Page not found.");
    expect(err instanceof Error).to.be.eql(true);
  });

  it("Should create an API error instance with no details", () => {
    const err = new APIError(404, "NotFoundError", "Page not found.");
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("Page not found.");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql(void 0);
  });

  it("Should create an API error instance with details", () => {
    const err = new APIError(404, "NotFoundError", "Page not found.", { a: 1 });
    expect(err.status).to.be.eql(404);
    expect(err.message).to.be.eql("Page not found.");
    expect(err.name).to.be.eql("NotFoundError");
    expect(err.details).to.be.eql({ a: 1 });
  });
});
