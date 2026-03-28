import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  Executable,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

function createClient(): LanguageClient {
  const config = vscode.workspace.getConfiguration("floe");
  const serverPath = config.get<string>("serverPath", "floe");

  const serverOptions: ServerOptions = {
    run: { command: serverPath, args: ["lsp"] } as Executable,
    debug: { command: serverPath, args: ["lsp"] } as Executable,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "floe" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.fl"),
    },
  };

  return new LanguageClient(
    "floe",
    "Floe Language Server",
    serverOptions,
    clientOptions
  );
}

export function activate(context: vscode.ExtensionContext) {
  client = createClient();
  client.start();

  const restartCommand = vscode.commands.registerCommand(
    "floe.restartServer",
    async () => {
      if (client) {
        await client.stop();
      }
      client = createClient();
      await client.start();
      vscode.window.showInformationMessage(
        "Floe Language Server restarted."
      );
    }
  );

  context.subscriptions.push(restartCommand);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
