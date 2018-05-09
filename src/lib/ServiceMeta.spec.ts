import "mocha";
import { expect } from "chai";

import { ServiceMeta } from "./ServiceMeta";
import { some, none } from "fp-ts/lib/Option";

// These tests are  not great, should improve them quite a bit!
describe("ServiceMeta", () => {
  it("Should get 'ServiceMeta' instance", () => {
    const meta = new ServiceMeta({ a: 1 });
    expect(meta instanceof ServiceMeta).to.be.eql(true);
  });

  it("Should get a some of a known property", () => {
    const meta = new ServiceMeta({ a: 1 });
    expect(meta.get("a")).to.be.eql(1);
  });

  it("Should set a known property", () => {
    const meta = new ServiceMeta({ a: 1 });
    meta.set("a", 2);
    expect(meta.get("a")).to.be.eql(2);
  });

  it("Should return none if property is null", () => {
    const meta = new ServiceMeta({ a: null });
    expect(meta.get("a")).to.be.eql(null);
  });

  it("Should return none if property is undefined", () => {
    const meta = new ServiceMeta({ a: void 0 });
    expect(meta.get("a")).to.be.eql(void 0);
  });

  it("Should get entire metadata object", () => {
    const meta = new ServiceMeta({ a: 1 });
    expect(meta.metadata).to.be.eql({ a: 1 });
  });
});
