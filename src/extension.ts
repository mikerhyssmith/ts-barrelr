"use strict";
import * as vscode from "vscode";
import * as path from "path";
import Barrelr from "./barrelr";

export function activate(context: vscode.ExtensionContext) {
    const barrelr: Barrelr = new Barrelr();
    const barrel = vscode.commands.registerCommand("extension.barrel", () => {
        barrelr.barrel(path.dirname(vscode.window.activeTextEditor.document.fileName))
        .catch(err => {
            vscode.window.showErrorMessage(err);
        });
    });

    const barrelRecursive = vscode.commands.registerCommand("extension.recursiveBarrel", () => {
        barrelr.barrelRecursivey(path.dirname(vscode.window.activeTextEditor.document.fileName))
        .catch(err => {
            vscode.window.showErrorMessage(err);
        });
    });

    context.subscriptions.push(barrel);
    context.subscriptions.push(barrelRecursive);
}

export function deactivate() {}