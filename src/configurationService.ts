import * as fs from "fs";
import * as vscode from 'vscode';
import * as glob from "glob";

import { Configuration } from "./model";

const TSLINT_NAME = "tslint.json";
export default class ConfigurationService {


    getConfiguration(): Promise<Configuration> {
        return this.getLintConfig().then((config: Array<string>) => {
            if (config[0] === "true" && config[1] === "double") {
                return new Configuration("\"");
            }
            return new Configuration("\'");
        }).catch(() => {
            return new Configuration("\'");
        })
    }

    getLintConfig(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {

            let quoteMarksConfig: Array<string> = [];
            this.getTsLintFile().then((matches: Array<string>) => {
                if (matches.length === 1) {
                    let tsLintConfig = JSON.parse(fs.readFileSync(matches[0]).toString());
                    try {
                        let quoteRulesArray = tsLintConfig.rules.quotemark;
                        if (quoteRulesArray) {
                            resolve(quoteRulesArray);
                        }
                    } catch (error) {
                        reject("An error occured locating tsconfig, defaulting to single quotes.");
                    }
                }
                resolve(quoteMarksConfig);
            })
        });
    }

    private getRootPath(): string {
        return vscode.workspace.rootPath;
    }

    private getTsLintFile(): Promise<Array<string>> {
        let root = this.getRootPath();
        return new Promise((resolve, reject) => {
            glob(root + "/**/" + TSLINT_NAME, ((er, matches) => {
                if(er) reject(er);
                resolve(matches);
            }))
        })
    }
}


