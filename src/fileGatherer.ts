import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export default class FileGatherer {
     gather(directory: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, files) => {
                if (err)reject(err)
                else
                resolve(this.produceBarreledNames(files, directory));

            })
        })
     }

    produceBarreledNames(files: string[], directory): Array<string> {
        const directories: string[] = [];
        const outputFiles: string[] = [];

        // Make this async
        files.filter(file => fs.statSync(directory + "/" + file).isDirectory())
            .forEach((directory) => {
                directories.push(this.produceBarellableName(directory, true));
        });

        // Make this async
        files.filter(file => fs.statSync(directory + "/" + file).isFile()
            && file !== "index.ts"
            && path.extname(file).match(this.getExtensionsRegEx())
            && !file.match(this.getExcludeRegEx())
        ).forEach((file) => {
            outputFiles.push(this.produceBarellableName(file, false));
        });

        return directories.concat(outputFiles);
    }

    produceBarellableName(name: string, directory: boolean): string {
        if (directory) {
            return  "./" +  path.basename(name);
        } else {
            return "./" + path.basename(name, ".ts");
        }
    }

    private getExcludeRegEx(): string {
        const config = vscode.workspace.getConfiguration("barrelr");
        return config["excludeFileRegex"];
    }

    private getExtensionsRegEx(): string {
        const config = vscode.workspace.getConfiguration("barrelr");
        return config["fileExtensionRegex"];
    }

}