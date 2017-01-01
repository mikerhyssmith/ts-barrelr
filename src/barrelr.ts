import FileGatherer from "./fileGatherer";
import BarrelProducer from "./barrelProducer";

import * as vscode from "vscode";
import * as path from "path";

export default class Barrelr {
    fileGatherer: FileGatherer = new FileGatherer();
    barrelProducer: BarrelProducer = new BarrelProducer();
    BARREL_GLOB_ENDING: string = "\\*";
    RECURSIVE_BARREL_GLOB_ENDING: string = "\\**\\*";

    barrel(fileLocation: string): Promise<string> {
       return this.fileGatherer.gather(fileLocation + this.BARREL_GLOB_ENDING).then((result) => {
            return this.barrelProducer.produceBarrel(fileLocation, result);
        });
    }
    
    barrelRecursivey(fileLocation: string): Promise<string> {
       return this.fileGatherer.gather(fileLocation + this.RECURSIVE_BARREL_GLOB_ENDING).then((result) => {
            return this.barrelProducer.produceBarrel(fileLocation, result);
        });
    }
}