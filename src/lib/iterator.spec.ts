import "mocha";
import { expect } from "chai";

import { iterator } from "./iterator";

describe("Iterator", () => {
  it("Should iterate up to given positive number", () => {
    const arr = [];
    for (const i of iterator(4)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([0, 1, 2, 3]);
  });

  it("Should iterate if given min < max (regardless of positive or negative)", () => {
    const arr = [];
    for (const i of iterator(-1, -3)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([-3, -2]);
  });

  it("Should not iterate if max < 0", () => {
    const arr = [];
    for (const i of iterator(-1)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([]);
  });

  it("Should not iterate if min = max (positive)", () => {
    const arr = [];
    for (const i of iterator(10, 10)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([]);
  });

  it("Should not iterate if min = max (negative)", () => {
    const arr = [];
    for (const i of iterator(-10, -10)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([]);
  });

  it("Should not iterate if min = max = 0", () => {
    const arr = [];
    for (const i of iterator(0, 0)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([]);
  });

  it("Should not iterate if max = 0 and min is defaulted", () => {
    const arr = [];
    for (const i of iterator(0)) {
      arr.push(i);
    }
    expect(arr).to.be.eql([]);
  });
});
