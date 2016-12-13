'use strict';
import * as vscode from 'vscode';
import * as path from "path";
import Barrelr from './barrelr';

export function activate(context: vscode.ExtensionContext) {
    var barrelr: Barrelr = new Barrelr();
    let disposable = vscode.commands.registerCommand('extension.barrel', () => {
        barrelr.barrel(path.dirname(vscode.window.activeTextEditor.document.fileName)).then((result) => {
            vscode.window.showInformationMessage(result);
        }).catch(err => {
            console.log(err);
        })
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {
}