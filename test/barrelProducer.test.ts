import * as assert from "assert";
import * as Sinon from "sinon";

import BarrelProducer from "../src/barrelProducer";

suite("Barrel Producer Tests", () => {

  let barrelProducer: BarrelProducer;
  let getQuoteMark: Sinon.SinonStub;
  let getSemiColon: Sinon.SinonStub;
  let getLineEnding: Sinon.SinonStub;

  suiteSetup(() => {
    barrelProducer = new BarrelProducer("./", []);
    getQuoteMark = Sinon.stub(barrelProducer, "getQuoteMark");
    getSemiColon = Sinon.stub(barrelProducer, "getSemiColon");
    getLineEnding = Sinon.stub(barrelProducer, "getLineEnding");
  });

  setup(() => {
    getSemiColon.returns(";");
    getQuoteMark.returns("\"");
    getLineEnding.returns("\r\n");
  });


  test("Given file name and single quote configuration add export should add export with single quote ", () => {
    getQuoteMark.returns("'");
    const returnedName = barrelProducer.addExport("./file");

    assert.equal(returnedName, "export * from \'./file\';\r\n");
  });

  test("Given file name and double quote configuration add export should add export with double quote ", () => {
    const returnedName = barrelProducer.addExport("./file");

    assert.equal(returnedName, "export * from \"./file\";\r\n");
  });

  test("Given file names produceExports add exports to all files and directorys", () => {
    const returnedNames = barrelProducer.produceExports(["./file", "./folder", "./secondFolder"]);

    assert.deepStrictEqual(returnedNames, ["export * from \"./file\";\r\n", "export * from \"./folder\";\r\n", "export * from \"./secondFolder\";\r\n"]);
  });

  test("Given file name and no semiColon add export should add export without semicolon ", () => {
    getSemiColon.returns("");
    const returnedName = barrelProducer.addExport("./file");

    assert.equal(returnedName, "export * from \"./file\"\r\n");
  });

  test("Given file name and line ending set to LF should export non CRLF line ending", () => {
    getLineEnding.returns("\n");
    const returnedName = barrelProducer.addExport("./file");

    assert.equal(returnedName, "export * from \"./file\";\n");
  });
});
