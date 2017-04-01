import * as assert from "assert";
import * as Sinon from "sinon";

import BarrelProducer from "../src/barrelProducer";

suite("Barrel Producer Tests", () => {

        let barrelProducer: BarrelProducer
        let getQuoteMark: Sinon.SinonStub;

     suiteSetup(() => {
        barrelProducer = new BarrelProducer("./", []);
        getQuoteMark = Sinon.stub(barrelProducer, "getQuoteMark");
    })


    test("Given file name and single quote configuration add export should add export with single quote ", () => {
        getQuoteMark.returns("'");
        const returnedName = barrelProducer.addExport("./file");

        assert.equal(returnedName, "export * from \'./file\';\n");
    });

    test("Given file name and double quote configuration add export should add export with double quote ", () => {
        getQuoteMark.returns("\"");
        const returnedName = barrelProducer.addExport("./file");

        assert.equal(returnedName, "export * from \"./file\";\n");
    });


    test("Given file names produceExports add exports to all files and directorys", () => {
        getQuoteMark.returns("\"");
        const returnedNames = barrelProducer.produceExports(["./file", "./folder", "./secondFolder"]);

        assert.deepStrictEqual(returnedNames, ["export * from \"./file\";\n", "export * from \"./folder\";\n", "export * from \"./secondFolder\";\n"]);
    });
});