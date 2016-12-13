import FileGatherer from "./fileGatherer";
import BarrelProducer from "./barrelProducer";

import * as vscode from "vscode";
import * as path from "path";

export default class Barrelr {
    fileGatherer: FileGatherer = new FileGatherer();
    barrelProducer: BarrelProducer = new BarrelProducer();

    barrel(fileLocation: string): Promise<string> {
        console.log(fileLocation);
       return this.fileGatherer.gather(fileLocation).then((result) => {
           console.log(result);
            return this.barrelProducer.produceBarrel(fileLocation, result);
        })
        .catch(err => {
            console.log("Barrelr" + err);
        })
    }
}