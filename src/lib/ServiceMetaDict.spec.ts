import "mocha";
import { expect } from "chai";

import { ServiceMetaDict } from "./ServiceMetaDict";
import { ServiceMeta } from "./ServiceMeta";
import { some, none } from "fp-ts/lib/Option";

class TestMetaMap extends ServiceMetaDict<{ a: string }> {
  protected newEntry(name: string): ServiceMeta<{ a: string }> {
    return this.save(name, new ServiceMeta({ a: "test" }));
  }
}

// These tests are  not great, should improve them quite a bit!
describe("ServiceMetaDict", () => {
  it("Should get 'ServiceMetaDict' instance", () => {
    const metaDict = new TestMetaMap();
    expect(metaDict instanceof ServiceMetaDict).to.be.eql(true);
  });

  it("Should get 'ServiceMeta' instance when creating new entry", () => {
    const metaDict = new TestMetaMap();
    const meta = metaDict.get("hello");

    expect(meta instanceof ServiceMeta).to.be.eql(true);
  });

  it("Should get 'ServiceMeta' instance when getting existing entry", () => {
    const metaDict = new TestMetaMap();
    metaDict.get("hello");
    const meta = metaDict.get("hello");

    expect(meta instanceof ServiceMeta).to.be.eql(true);
  });

  it("Should get entry if previous exists", () => {
    const metaDict = new TestMetaMap();
    metaDict.get("hello");
    const meta = metaDict.get("hello");

    expect(meta instanceof ServiceMeta).to.be.eql(true);
  });

  it("Should create new entry when getting if it doesn't exists", () => {
    const metaDict = new TestMetaMap();
    const meta = metaDict.get("hello");

    expect(meta instanceof ServiceMeta).to.be.eql(true);
  });
});
