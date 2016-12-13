import * as fs from "fs";

export default class FileGatherer {
     gather(directory: string) : Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, files) => {
                if(err) reject("Could not read directory")
                else
                resolve(this.produceBarreledNames(files));

            })
        })
     }
    
    produceBarreledNames(files: string[]): Array<string> {
        let directories: string[] = [];
        let outputFiles: string[] = [];

        files.filter(file => fs.statSync(file).isDirectory()).forEach((directory) => {
            directories.push(this.produceBarellableName(directory,true));
        });
        files.filter(file => fs.statSync(file).isFile()).forEach((file) => {
            outputFiles.push(this.produceBarellableName(file,false));
        });

        return directories.concat(outputFiles);
    }

    produceBarellableName(name: string, directory: boolean): string {
        if(directory) {
            return  "." +  name.substring(name.lastIndexOf("/"));
        }else {
            return "." + name.substring(name.lastIndexOf("/"), name.lastIndexOf("."));
        }
    }

}


