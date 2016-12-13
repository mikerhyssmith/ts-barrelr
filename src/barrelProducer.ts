import * as fs from "fs";

export default class BarrelProducer {

    produceBarrel(directory: string, fileNames: Array<string>): Promise<string> {
        let exportedFileNames = this.produceExports(fileNames);
        return this.writeFiles(exportedFileNames, directory);
    }

    produceExports(fileNames: Array<string>): Array<string> {
        return fileNames.map(this.addExport)
    }

    writeFiles(exportedFileNames: Array<string>, directory:string): Promise<string>  {
        return new Promise((resolve, reject) => {
            fs.writeFile(directory + "/index.ts", exportedFileNames, (err) => {
                if(err) reject("Writing to file failed")
                else resolve("Barrel written")
            })
        });
    }

    addExport(fileName: string) {
        return "export * from " + "\"" + fileName + "\"";
    }

}


