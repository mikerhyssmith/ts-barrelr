import * as fs from "fs";
import * as vscode from "vscode";
import * as glob from "glob";

import { Configuration } from "./model";

const TSLINT_NAME = "tslint.json";
export default class ConfigurationService {


    getConfiguration(): Promise<Configuration> {
        return this.getLintConfig().then((config: Array<any>) => {
            if (config[0] === true && config[1] === "double") {
                return new Configuration("\"");
            }
            return new Configuration("\'");
        }).catch(() => {
            return new Configuration("\'");
        });
    }

    getLintConfig(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {

            const quoteMarksConfig: Array<any> = [];
            this.getTsLintFile().then((matches: Array<vscode.Uri>) => {
                if (matches.length === 1) {
                    fs.readFile(matches[0].fsPath, (err, data) => {
                        try {
                            const dataString = JSON.parse(data.toString());
                            const quoteRulesArray = dataString.rules.quotemark;
                            if (quoteRulesArray) {
                                resolve(quoteRulesArray);
                            }
                        } catch (error) {
                            reject("An error occured locating tsconfig, defaulting to single quotes.");
                        }
                    });
                }
                resolve(quoteMarksConfig);
            });
        });
    }

    private getRootPath(): string {
        return vscode.workspace.rootPath;
    }

    private getTsLintFile(): Thenable<Array<vscode.Uri>> {
        const root = this.getRootPath();
        return vscode.workspace.findFiles(root + "/**/" + TSLINT_NAME, "**∕node_modules∕**", 1).then((value) => {
            return value;
        });
    }
}


