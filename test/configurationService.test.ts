import * as assert from 'assert';
import * as Sinon from 'sinon';
import * as vscode from 'vscode';
import * as fs from "fs";

import ConfigurationService from "../src/configurationService";
import { Configuration } from "../src/model";

suite("Configuration Service tests", () => {
    var configurationService: ConfigurationService;
    var glob: Sinon.SinonStub;
    var getLintConfigStub: Sinon.SinonStub;
    const directoryObject = { isDirectory() { return true }, isFile() { return false } };

    suiteSetup(() => {
        configurationService = new ConfigurationService();
        getLintConfigStub = Sinon.stub(configurationService, "getLintConfig");
    });

    teardown(() => {
        getLintConfigStub.reset();
    });

    test("Given getLintConfig returns config with single quotes getConfiguration shoudl return configuration with single quotes", (done) => {
        getLintConfigStub.onFirstCall().returns(Promise.resolve([true, "single"]));
        configurationService.getConfiguration().then((quoteConfig: Configuration) => {
            assert.equal(quoteConfig.quoteType, "\'");
            done();
        });
    });

    test("Given getLintConfig returns config with double quotes getConfiguration should return configuration with double quotes", (done) => {
        getLintConfigStub.onFirstCall().returns(Promise.resolve([true, "double"]));
        configurationService.getConfiguration().then((quoteConfig: Configuration) => {
            assert.equal(quoteConfig.quoteType, "\"");
            done();
        });
    });

    test("Given getLintConfig rejects promise should return configuration with single quotes", (done) => {
        getLintConfigStub.onFirstCall().returns(Promise.reject("An error occured locating tsconfig, defaulting to single quotes."));
        configurationService.getConfiguration().then((quoteConfig: Configuration) => {
            assert.equal(quoteConfig.quoteType, "\'");
            done();
        });
    });

    suite("getConfiguration", () => {
        var configurationService: ConfigurationService;
        const tsLintWithQuoteRule = "{" +
            "\"rules\": {" +
            "\"quotemark\": [true, \"double\"]" +
            "}" +
            "}"
        const emptyTsLint = "{ }"
        var getTsLintFile: Sinon.SinonStub;
        var fsReadFile: Sinon.SinonStub;

        suiteSetup(() => {
            configurationService = new ConfigurationService();
            getTsLintFile = Sinon.stub(configurationService, "getTsLintFile");
        });
        teardown(() => {
            getTsLintFile.reset();
            fsReadFile.restore();
        });

        test("Given tslint config exists and quotemark rule exists getLintConfig should return quotemark array", (done) => {
            getTsLintFile.onFirstCall().returns(Promise.resolve([ vscode.Uri.file("tslint.json")]));
            fsReadFile = Sinon.stub(fs, "readFile", function(path, callback) {
                return callback(undefined, tsLintWithQuoteRule);
            });

            configurationService.getLintConfig().then((quoteConfig: Array<any>) => {
                assert.equal(quoteConfig.length, 2);
                assert.equal(quoteConfig[0], true);
                assert.equal(quoteConfig[1], "double");
                done();
            });
        });

        test("Given tslint config exists but quotemark rule doesnt exist getLintConfig should reject promise", (done) => {
            getTsLintFile.onFirstCall().returns(Promise.resolve([vscode.Uri.file("tslint.json")]));
            fsReadFile = Sinon.stub(fs, "readFile", function(path, callback) {
                return callback(undefined, emptyTsLint);
            });

            configurationService.getLintConfig().then((quoteConfig: Array<any>) => {})
                .catch(() => {
                    done();
                });
        });

        test("Given tslint config does not exist getLintConfig should return empty array", (done) => {
            getTsLintFile.onFirstCall().returns(Promise.resolve([]));
            configurationService.getLintConfig().then((quoteConfig: Array<any>) => {
                assert.equal(quoteConfig.length, 0);
                done();
            });
        });
    });
});