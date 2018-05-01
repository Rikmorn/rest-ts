import "mocha";
import { expect } from "chai";

import { LoggerInstance } from "winston";
import { get, Loggers } from "./logger";

// These tests are  not great, should improve them quite a bit!
describe("Logger", () => {
  it("Should get 'Server' logger", () => {
    const log = get(Loggers.server);
    expect(log.info).to.be.a("function");
    expect(log.error).to.be.a("function");
    expect(log.warn).to.be.a("function");
  });

  it("Should get 'Error' logger", () => {
    const log = get(Loggers.error);
    expect(log.info).to.be.a("function");
    expect(log.error).to.be.a("function");
    expect(log.warn).to.be.a("function");
  });

  it("Should get 'Access' logger", () => {
    const log = get(Loggers.access);
    expect(log.info).to.be.a("function");
    expect(log.error).to.be.a("function");
    expect(log.warn).to.be.a("function");
  });
});
