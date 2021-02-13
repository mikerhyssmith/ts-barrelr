import * as fs from "fs";
import * as vscode from "vscode";

export default class BarrelProducer {

  config = vscode.workspace.getConfiguration("barrelr");
  denoConfig = vscode.workspace.getConfiguration("deno");

  constructor(private directory: string, private fileNames: Array<string>) { }

  produceBarrel(): Promise<string> {
    const exportedFileNames = this.produceExports(this.fileNames);
    return this.writeFiles(exportedFileNames, this.directory);
  }

  produceExports(fileNames: Array<string>): Array<string> {
    return fileNames.map(this.addExport, this);
  }

  writeFiles(exportedFileNames: Array<string>, directory: string): Promise<string> {
    const fileName = this.getPlatform() === "deno" ? "/mod.ts" : "/index.ts";

    return new Promise((resolve, reject) => {
      fs.writeFile(directory + fileName, exportedFileNames.join(""), (err) => {
        if (err) reject(err);
        else resolve("Barrel written");
      });
    });
  }

  addExport(fileName: string): string {
    const fileExtension = this.getPlatform() === "deno" ? ".ts" : "";
    const quotemark = this.getQuoteMark();
    const semiColon = this.getSemiColon();
    const lineEnding = this.getLineEnding()
    return `export * from ${quotemark}${fileName}${fileExtension}${quotemark}${semiColon}${lineEnding}`;
  }

  private getQuoteMark(): string {
    if (this.config.useDoubleQuotes) {
      return "\"";
    }
    return "'";
  }

  private getSemiColon(): string {
    if (this.config.useSemiColons) {
      return ";";
    }

    return "";
  }

  private getLineEnding(): string {
    const setting = this.config.lineEnding || "CRLF";
    if(setting === "LF") {
      return "\n";
    }
    return "\r\n";
  }

  private getPlatform(): 'deno' | 'node' {
    if (this.denoConfig?.get("enabled")) {
      return 'deno';
    }
    return 'node';
  }
}


