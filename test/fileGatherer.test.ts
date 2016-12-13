import * as assert from 'assert';
import * as Sinon from 'sinon';
import * as fs from "fs";

import FileGatherer from "../src/fileGatherer";

suite("File Gatherer Tests", () => {
    var fileGatherer: FileGatherer

    suiteSetup(() => {
        this.fileGatherer = new FileGatherer();
    })

    test("Given Directory, produce barellable name should produce correct format", () => {
        let returnedName = this.fileGatherer.produceBarellableName("C:/Mike/folder", true);

        assert.equal(returnedName, "./folder");
    });

    test("Given File, produce barellable name should produce correct format", () => {
        let returnedName = this.fileGatherer.produceBarellableName("C:/Mike/file.ts", false);

        assert.equal(returnedName, "./file");
    });

    test("Given list of files, produceBarreledNames should produce correct array of files and folders", () => {
        let fsStatSync = Sinon.stub(fs, "statSync");
        const directoryObject = { isDirectory() {return true}, isFile() {return false}}
        const fileObject = { isDirectory() {return false}, isFile() {return true}}

        fsStatSync.withArgs("C:/Mike/folder").returns(directoryObject);
        fsStatSync.withArgs("C:/Mike/secondFolder").returns(directoryObject);
        fsStatSync.withArgs("C:/Mike/file.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/secondFile.ts").returns(fileObject);
        
        let returnedFileNames = this.fileGatherer.produceBarreledNames(["folder", "secondFolder", "file.ts", "secondFile.ts"], "C:/Mike");
        let expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });
});