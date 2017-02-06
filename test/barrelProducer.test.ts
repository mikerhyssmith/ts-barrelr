import * as assert from 'assert';
import * as Sinon from 'sinon';

import BarrelProducer from "../src/barrelProducer";
import { Configuration } from "../src/model";

suite("Barrel Producer Tests", () => {

    test("Given file name and single quote configuration add export should add export with single quote ", () => {
        const barrelProducer = new BarrelProducer("./", [], new Configuration("\'"));
        let returnedName = barrelProducer.addExport("./file");

        assert.equal(returnedName, "export * from \'./file\';\n");
    });

    test("Given file name and double quote configuration add export should add export with double quote ", () => {
        const barrelProducer = new BarrelProducer("./", [], new Configuration("\""));
        let returnedName = barrelProducer.addExport("./file");

        assert.equal(returnedName, "export * from \"./file\";\n");
    });


    test("Given file names produceExports add exports to all files and directorys", () => {
        const barrelProducer = new BarrelProducer("./", [], new Configuration("\""));
        let returnedNames = barrelProducer.produceExports(["./file", "./folder", "./secondFolder"]);

        assert.deepStrictEqual(returnedNames, ["export * from \"./file\";\n", "export * from \"./folder\";\n", "export * from \"./secondFolder\";\n"]);
    });
});