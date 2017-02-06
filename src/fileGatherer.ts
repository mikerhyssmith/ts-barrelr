import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

export default class FileGatherer {
     gather(directory: string) : Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            glob(directory, (err, files) => {
                if(err)reject(err)
                else
                resolve(this.produceBarreledNames(files));
            });
        });
     }
    
    produceBarreledNames(files: string[]): Array<string> {
        let directories: string[] = [];
        let outputFiles: string[] = [];

        files.filter(file => fs.statSync(file).isDirectory()).forEach((directory) => {
            directories.push(this.produceBarellableName(directory,true));
        });
        files.filter(file => fs.statSync(file).isFile())
            .filter(file => !file.includes("index.ts"))
                .filter(file => path.extname(file) === ".ts")
                    .filter(file => !file.includes("spec."))
                        .filter(file => !file.includes("test."))
                    .forEach((file) => {
                        outputFiles.push(this.produceBarellableName(file,false));
        });

        return directories.concat(outputFiles);
    }

    produceBarellableName(name: string, directory: boolean): string {
        if(directory) {
            return  "./" +  path.basename(name);
        }else {
            return "./" + path.basename(name, ".ts");
        }
    }

}


