// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "spec-runner" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(registerSpecRunner());
}

function registerSpecRunner() {
  return vscode.commands.registerCommand(
    "spec-runner.run-test-on-active-file",
    () => {
      const activeEditorFilename =
        vscode.window.activeTextEditor?.document?.uri.fsPath;

      if (activeEditorFilename) {
        const [_, relativePath] = activeEditorFilename.split("root\\src\\");

        const terminal = vscode.window.createTerminal(`test runner`);
        terminal.sendText(`npm run test -- --include="${relativePath}"`);
        terminal.show();

        vscode.window.showInformationMessage(relativePath ?? "");
      } else {
        vscode.window.showErrorMessage("No active spec file to execute");
      }
    }
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
