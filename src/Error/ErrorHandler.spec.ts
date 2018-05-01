import "mocha";
import { expect } from "chai";
import { stub } from "sinon";

import handler from "./ErrorHandler";
import { NotFound } from ".";

describe("ErrorHandler", () => {
  it("Should set response status code and json body", () => {
    const jsonStub = stub();
    const statusStub = stub()
      .withArgs(404)
      .returns({ json: jsonStub });
    handler(new NotFound(), {} as any, { status: statusStub } as any, {} as any);

    expect(statusStub.called).to.be.eql(true);
    expect(jsonStub.called).to.be.eql(true);
  });

  it("Should set response status code and json body with 404 defaults", () => {
    const jsonStub = stub();
    const statusStub = stub()
      .withArgs(404)
      .returns({ json: jsonStub });
    const er = new NotFound();
    handler(er, {} as any, { status: statusStub } as any, {} as any);

    expect(statusStub.getCall(0).args[0]).to.eql(404);
    expect(jsonStub.getCall(0).args[0]).to.eql({
      details: void 0,
      message: "Resource not found error.",
      name: "NotFoundError",
      status: 404,
    });
  });

  it("Should use default error if non API error sent", () => {
    const jsonStub = stub();
    const statusStub = stub()
      .withArgs(500)
      .returns({ json: jsonStub });
    const er = new Error();
    handler(er, {} as any, { status: statusStub } as any, {} as any);

    expect(statusStub.getCall(0).args[0]).to.eql(500);
    expect(jsonStub.getCall(0).args[0]).to.eql({
      details: undefined,
      message: "Internal server error.",
      name: "ServerError",
      status: 500,
    });
  });

  it("Should use default error (with custom message) if non API error sent", () => {
    const jsonStub = stub();
    const statusStub = stub()
      .withArgs(500)
      .returns({ json: jsonStub });
    const er = new Error(`I'm an error`);
    handler(er, {} as any, { status: statusStub } as any, {} as any);

    expect(statusStub.getCall(0).args[0]).to.eql(500);
    expect(jsonStub.getCall(0).args[0]).to.eql({
      details: undefined,
      message: `I'm an error`,
      name: "ServerError",
      status: 500,
    });
  });

  it("Should send stack trace if DEBUG env variable is set to 'true'", () => {
    process.env.DEBUG = "true";
    const jsonStub = stub();
    const statusStub = stub()
      .withArgs(404)
      .returns({ json: jsonStub });
    const er = new NotFound();
    handler(er, {} as any, { status: statusStub } as any, {} as any);
    delete process.env.DEBUG;
    expect(statusStub.getCall(0).args[0]).to.eql(404);
    expect(jsonStub.getCall(0).args[0]).to.have.all.keys(
      "details",
      "message",
      "name",
      // "stack",
      "status",
    );
    expect(jsonStub.getCall(0).args[0].stack).to.be.a("string");
  });
});
