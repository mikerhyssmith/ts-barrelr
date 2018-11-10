"use strict";
import * as vscode from "vscode";
import * as path from "path";
import Barrelr from "./barrelr";

export function activate(context: vscode.ExtensionContext) {
  const barrelr: Barrelr = new Barrelr();

  const barrel = vscode.commands.registerCommand("extension.barrel", (folder) => {
    const filePath = folder && folder.fsPath ? folder.fsPath : path.dirname(vscode.window.activeTextEditor.document.fileName);
    barrelr.barrel(filePath)
      .catch(err => {
        vscode.window.showErrorMessage(err);
      });
  });

  context.subscriptions.push(barrel);
}

export function deactivate() { }
