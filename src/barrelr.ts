import FileGatherer from "./fileGatherer";
import BarrelProducer from "./barrelProducer";

import * as vscode from "vscode";
import * as path from "path";

export default class Barrelr {
    fileGatherer: FileGatherer = new FileGatherer();
    barrelProducer: BarrelProducer = new BarrelProducer();

    barrel(fileLocation: string): Promise<string> {
       return this.fileGatherer.gather(fileLocation).then((result) => {
            return this.barrelProducer.produceBarrel(fileLocation, result);
        });
    }
}