"use strict";
import * as vscode from "vscode";
import * as path from "path";
import Barrelr from "./barrelr";

export function activate(context: vscode.ExtensionContext) {
    const barrelr: Barrelr = new Barrelr();
    // Move tsconfig search here
    const barrel = vscode.commands.registerCommand("extension.barrel", () => {
        barrelr.barrel(path.dirname(vscode.window.activeTextEditor.document.fileName))
        .catch(err => {
            vscode.window.showErrorMessage(err);
        });
    });

    context.subscriptions.push(barrel);

}

export function deactivate() {}