import FileGatherer from "./fileGatherer";
import BarrelProducer from "./barrelProducer";
import ConfigurationService from "./configurationService";
import { Configuration } from "./model";

import * as vscode from "vscode";
import * as path from "path";

export default class Barrelr {
    fileGatherer: FileGatherer = new FileGatherer();
    barrelProducer: BarrelProducer;
    configurationService: ConfigurationService = new ConfigurationService();
    BARREL_GLOB_ENDING: string = "\\*";
    RECURSIVE_BARREL_GLOB_ENDING: string = "\\**\\*";

    barrel(fileLocation: string): Promise<string> {
        return this.configurationService.getConfiguration().then((config: Configuration) => {
            return this.fileGatherer.gather(fileLocation + this.BARREL_GLOB_ENDING).then((result) => {
                this.barrelProducer = new BarrelProducer(fileLocation, result, config)
                return this.barrelProducer.produceBarrel();
            });
        });
    }

    barrelRecursivey(fileLocation: string): Promise<string> {
        // return this.fileGatherer.gather(fileLocation + this.RECURSIVE_BARREL_GLOB_ENDING).then((result) => {
        //     return this.barrelProducer.produceBarrel(fileLocation, result, new Configuration("\'"));
        // });
        return undefined;
    }
}