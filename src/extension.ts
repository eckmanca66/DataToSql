// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "datatosql" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("datatosql.convert", () => {
    // The code you place here will be executed every time your command is executed
    convertToSql();
  });

  context.subscriptions.push(disposable);
}

function convertToSql() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const selected = editor.document.getText(editor.selection);

    if (selected.length === 0) {
      vscode.window.showWarningMessage("Data to SQL: no text selected");
    } else {
      const lines = selected.split(/\r?\n/);

      if (lines.length === 1) {
        vscode.window.showWarningMessage("Data to SQL: only one line of text");
      } else {
        const rows = new Array(lines.length);
        let maxColumns = 0;

        for (let index = 0; index < lines.length; index++) {
          const line = lines[index];
          rows[index] = line.split(/\t/);
          const columCount = rows[index].length;
          if (columCount > maxColumns) {
            maxColumns = columCount;
          }
        }

        let columns = new Array(maxColumns);
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];

          for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const col = row[colIndex];

            if (columns[colIndex] === undefined) {
              columns[colIndex] = col.length;
            } else if (columns[colIndex] < col.length) {
              columns[colIndex] = col.length;
            }
          }
        }

        const newRows = new Array(rows.length);

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          const length = row.length;

          if (length === 0 || row[0].length === 0) {
            newRows[rowIndex] = row;
          } else {
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
              const element = row[colIndex];
              row[colIndex] = element.padEnd(columns[colIndex], " ");
            }

            if (!row[0].startsWith("(")) {
              row[0] = "(" + row[0];
            }

            if (!row[length - 1].endsWith("),")) {
              row[length - 1] = row[length - 1] + "),";
            }

            newRows[rowIndex] = row.join(", ");
          }
        }

        const newLines = newRows.join("\n");

        editor.edit((e) => {
          e.replace(editor.selection, newLines);
        });

        vscode.window.showInformationMessage(
          "Data to SQL: conversion finished"
        );
      }
    }
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('Extension "datatosql" is now deactived.');
}
