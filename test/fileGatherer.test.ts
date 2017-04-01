// import * as assert from 'assert';
// import * as Sinon from 'sinon';
// import * as fs from "fs";

// import FileGatherer from "../src/fileGatherer";

// suite("File Gatherer Tests", () => {
//     var fileGatherer: FileGatherer
//     var fsStatSync: Sinon.SinonStub;
//     const directoryObject = { isDirectory() {return true}, isFile() {return false}}
//     const fileObject = { isDirectory() {return false}, isFile() {return true}}

//     suiteSetup(() => {
//         fileGatherer = new FileGatherer();
//         fsStatSync = Sinon.stub(fs, "statSync");
//         fsStatSync.withArgs("C:/Mike/folder").returns(directoryObject);
//         fsStatSync.withArgs("C:/Mike/secondFolder").returns(directoryObject);
//         fsStatSync.withArgs("C:/Mike/file.ts").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/secondFile.ts").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/index.ts").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/template.html").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/image.png").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/file.test.ts").returns(fileObject);
//         fsStatSync.withArgs("C:/Mike/file.spec.ts").returns(fileObject);
//     })

//     test("Given Directory, produce barellable name should produce correct format", () => {
//         let returnedName = fileGatherer.produceBarellableName("C:/Mike/folder", true);

//         assert.equal(returnedName, "./folder");
//     });

//     test("Given File, produce barellable name should produce correct format", () => {
//         let returnedName = fileGatherer.produceBarellableName("C:/Mike/file.ts", false);

//         assert.equal(returnedName, "./file");
//     });

//     test("Given list of files, produceBarreledNames should produce correct array of files and folders", () => {
//         let returnedFileNames = fileGatherer.produceBarreledNames(["C:/Mike/folder", "C:/Mike/secondFolder", "C:/Mike/file.ts", "C:/Mike/secondFile.ts"]);
//         let expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
//         assert.deepStrictEqual(returnedFileNames, expectedFileNames);
//     });

//     test("Given list of files including existing barrel, produceBarreledNames should produce correct array of files and folders without barrel", () => {
//         let returnedFileNames = fileGatherer.produceBarreledNames(["C:/Mike/folder", "C:/Mike/secondFolder", "C:/Mike/file.ts", "C:/Mike/secondFile.ts", "C:/Mike/index.ts"]);
//         let expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
//         assert.deepStrictEqual(returnedFileNames, expectedFileNames);
//     });

//     test("Given list of files including non ts files, produceBarreledNames should produce correct array of files and folders without non typescript files", () => {
//         let returnedFileNames = fileGatherer.produceBarreledNames(["C:/Mike/folder", "C:/Mike/secondFolder", "C:/Mike/file.ts", "C:/Mike/secondFile.ts", "C:/Mike/template.html", "C:/Mike/image.png"]);
//         let expectedFileNames = ["./folder", "./secondFolder", "./file", "./secondFile"];
//         assert.deepStrictEqual(returnedFileNames, expectedFileNames);
//     });

//     test("Given list of files including test.ts files, produceBarreledNames should produce correct array of files and folders without test files", () => {
//         let returnedFileNames = fileGatherer.produceBarreledNames(["C:/Mike/file.ts", "C:/Mike/file.test.ts"]);
//         let expectedFileNames = ["./file"];
//         assert.deepStrictEqual(returnedFileNames, expectedFileNames);
//     });

//     test("Given list of files including spec.ts files, produceBarreledNames should produce correct array of files and folders without spec files", () => {
//         let returnedFileNames = fileGatherer.produceBarreledNames(["C:/Mike/file.ts", "C:/Mike/file.spec.ts"]);
//         let expectedFileNames = ["./file"];
//         assert.deepStrictEqual(returnedFileNames, expectedFileNames);
//     });
// });