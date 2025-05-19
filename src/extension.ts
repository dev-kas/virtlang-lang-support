import * as vscode from 'vscode';
import { RunService } from './services/runService';
import { XEL } from './constants';

/**
 * Main extension class that manages the Xel language support
 */
export class XelExtension {
    private runService: RunService;

    constructor() {
        this.runService = new RunService();
    }

    /**
     * Activates the extension
     * @param context Extension context provided by VS Code
     */
    public activate(context: vscode.ExtensionContext): void {
        console.log('Xel Language Support extension activated');

        // Register the run command
        const runCommand = vscode.commands.registerCommand(XEL.COMMANDS.RUN, async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            // Save the document if it's dirty
            if (editor.document.isDirty) {
                await editor.document.save();
            }

            try {
                // Create or update terminal
                await this.runService.createOrUpdateTerminal();
                
                // Run the current file
                await this.runService.runFile(editor.document.fileName);
                
                // Show the terminal
                this.runService.terminal?.show();
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to run Xel file: ${error}`);
            }
        });

        // Add command to context subscriptions
        context.subscriptions.push(runCommand);
    }

    /**
     * Deactivates the extension and cleans up resources
     */
    public deactivate(): void {
        this.runService.dispose();
    }
}

// Export the activation and deactivation functions that VS Code expects
export function activate(context: vscode.ExtensionContext): void {
    const extension = new XelExtension();
    extension.activate(context);
}

export function deactivate(): void {
    const extension = new XelExtension();
    extension.deactivate();
}
