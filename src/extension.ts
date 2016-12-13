'use strict';
import * as vscode from 'vscode';
import Barrelr from './barrelr';
export function activate(context: vscode.ExtensionContext) {
    var barrelr: Barrelr = new Barrelr();
    let disposable = vscode.commands.registerCommand('extension.barrel', () => {
        barrelr.barrel(vscode.window.activeTextEditor.document.fileName);
        vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {
}