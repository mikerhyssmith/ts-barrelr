import FileGatherer from "./fileGatherer";
import BarrelProducer from "./barrelProducer";
export default class Barrelr {
    fileGatherer: FileGatherer = new FileGatherer();
    barrelProducer: BarrelProducer;
    BARREL_GLOB_ENDING = "\\*";
    RECURSIVE_BARREL_GLOB_ENDING = "\\**\\*";

    barrel(fileLocation: string): Promise<string> {
        return this.fileGatherer.gather(fileLocation).then((result) => {
            this.barrelProducer = new BarrelProducer(fileLocation, result)
            return this.barrelProducer.produceBarrel();
        });
    }
}