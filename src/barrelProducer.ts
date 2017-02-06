import * as fs from "fs";
import { Configuration } from "./model";

/*To be refactored */
export default class BarrelProducer {

    constructor(private directory: string, private fileNames: Array<string>, private config: Configuration) { }

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
        const quotemark = this.config.quoteType;
        return "export * from " + quotemark + fileName + quotemark + ";\n";
    }
}


