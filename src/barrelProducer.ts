import * as fs from "fs";
import * as vscode from "vscode";

export default class BarrelProducer {

    constructor(private directory: string, private fileNames: Array<string>) { }

    produceBarrel(): Promise<string> {
        const exportedFileNames = this.produceExports(this.fileNames);
        return this.writeFiles(exportedFileNames, this.directory);
    }

    produceExports(fileNames: Array<string>): Array<string> {
        return fileNames.map(this.addExport, this)
    }

    writeFiles(exportedFileNames: Array<string>, directory: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.writeFile(directory + "/index.ts", exportedFileNames.join(""), (err) => {
                if (err) reject(err)
                else resolve("Barrel written")
            });
        });
    }

    addExport(fileName: string) {
        const quotemark = this.getQuoteMark();
        return "export * from " + quotemark + fileName + quotemark + ";\r\n";
    }

    private getQuoteMark() {
        const config = vscode.workspace.getConfiguration("barrelr");
        if (config["useDoubleQuotes"]) {
            return "\"";
        }
        return "'";
    }
}


