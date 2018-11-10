import * as assert from 'assert';
import * as Sinon from 'sinon';
import * as fs from "fs";

import FileGatherer from "../src/fileGatherer";

suite("File Gatherer Tests", () => {
    let fileGatherer: FileGatherer
    let fsStatSync: Sinon.SinonStub;
    let getExcludeRegEx: Sinon.SinonStub;
    let getExtensionsRegEx: Sinon.SinonStub;
    const directoryObject = { isDirectory() {return true}, isFile() {return false}}
    const fileObject = { isDirectory() {return false}, isFile() {return true}}

    suiteSetup(() => {
        fileGatherer = new FileGatherer();
        getExcludeRegEx = Sinon.stub(fileGatherer, "getExcludeRegEx");
        getExcludeRegEx.returns("(\\.spec\\.|\\.test\\.|\\.e2e\\.)");
        getExtensionsRegEx = Sinon.stub(fileGatherer, "getExtensionsRegEx");
        getExtensionsRegEx.returns("\\.tsx?$");
        fsStatSync = Sinon.stub(fs, "statSync");
        fsStatSync.withArgs("C:/Mike/folder").returns(directoryObject);
        fsStatSync.withArgs("C:/Mike/secondFolder").returns(directoryObject);
        fsStatSync.withArgs("C:/Mike/file.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/secondFile.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/index.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/template.html").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/image.png").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/file.test.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/file.spec.ts").returns(fileObject);
        fsStatSync.withArgs("C:/Mike/file.abc").returns(fileObject);
    })

    test("Given Directory, produce barellable name should produce correct format", () => {
        const returnedName = fileGatherer.produceBarellableName("C:/Mike/folder", true);

        assert.equal(returnedName, "./folder");
    });

    test("Given File, produce barellable name should produce correct format", () => {
        const returnedName = fileGatherer.produceBarellableName("C:/Mike/file.ts", false);

        assert.equal(returnedName, "./file");
    });

    test("Given list of files, produceBarreledNames should produce correct array of files and folders", () => {
        const returnedFileNames = fileGatherer.produceBarreledNames(["folder", "secondFolder", "file.ts", "secondFile.ts"], "C:/Mike");
        const expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });

    test("Given list of files including existing barrel, produceBarreledNames should produce correct array of files and folders without barrel", () => {
        const returnedFileNames = fileGatherer.produceBarreledNames(["folder", "secondFolder", "file.ts", "secondFile.ts", "index.ts"], "C:/Mike");
        const expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });

    test("Given list of files including non ts files, produceBarreledNames should produce correct array of files and folders without non typescript files", () => {
        const returnedFileNames = fileGatherer.produceBarreledNames(["folder", "secondFolder", "file.ts", "secondFile.ts", "template.html", "image.png"], "C:/Mike");
        const expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });

    test("Given list of files including test.ts files, produceBarreledNames should produce correct array of files and folders without test files", () => {
        const returnedFileNames = fileGatherer.produceBarreledNames(["file.ts", "file.test.ts"], "C:/Mike");
        const expectedFileNames = ["./file"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });

    test("Given list of files including spec.ts files, produceBarreledNames should produce correct array of files and folders without spec files", () => {
        const returnedFileNames = fileGatherer.produceBarreledNames(["file.ts", "file.spec.ts"], "C:/Mike");
        const expectedFileNames = ["./file"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });

    test("Given list of files with various extensions, produceBarreledNames uses fileExtensionRegex config setting to produce array of files with matching extensions", () => {
        getExtensionsRegEx.returns("\\.abc$");
        const returnedFileNames = fileGatherer.produceBarreledNames(["file.ts", "secondFile.ts", "file.abc"], "C:/Mike");
        const expectedFileNames = ["./file.abc"];
        assert.deepStrictEqual(returnedFileNames, expectedFileNames);
    });
});