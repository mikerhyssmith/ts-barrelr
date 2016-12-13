import * as assert from 'assert';
import * as Sinon from 'sinon';

import BarrelProducer from "../src/barrelProducer";

suite("File Gatherer Tests", () => {
    var barrelProducer: BarrelProducer

    suiteSetup(() => {
        this.barrelProducer = new BarrelProducer();
    })

    test("Given file name add export should add export", () => {
        let returnedName = this.barrelProducer.addExport("./file");

        assert.equal(returnedName, "export * from \"./file\"");
    });

    test("Given file names produceExports add exports to all files and directorys", () => {
        let returnedNames = this.barrelProducer.produceExports(["./file", "./folder", "./secondFolder"]);

        assert.deepStrictEqual(returnedNames, ["export * from \"./file\"", "export * from \"./folder\"", "export * from \"./secondFolder\""]);
    });
});