import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

interface RunProcessState {
    child: ChildProcessWithoutNullStreams | undefined;
    terminal: vscode.Terminal | undefined;
    pty: vscode.Pseudoterminal | undefined;
    writeEmitter: vscode.EventEmitter<string>;
    termWidth: number;
}

export class RunService {
    private state: RunProcessState = {
        child: undefined,
        terminal: undefined,
        pty: undefined,
        writeEmitter: new vscode.EventEmitter<string>(),
        termWidth: 80
    };

    /**
     * Gets the current terminal instance
     */
    public get terminal(): vscode.Terminal | undefined {
        return this.state.terminal;
    }

    private get xelPath(): string {
        const config = vscode.workspace.getConfiguration('xel');
        return config.get<string>('binaryPath') || 
            path.join(os.homedir(), '.local', 'bin', os.platform() === 'win32' ? 'xel.exe' : 'xel');
    }

    /**
     * Starts or restarts the Xel process with the given file
     * @param filePath Path to the Xel file to run
     */
    public async runFile(filePath: string): Promise<void> {
        if (this.state.child) {
            this.state.child.kill();
        }

        // Clear terminal using ANSI escape codes
        this.state.writeEmitter.fire(`\x1bc\r\n`);

        try {
            this.state.child = spawn(this.xelPath, ['run', filePath]);
            
            this.setupProcessListeners();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to start Xel process: ${error}`);
        }
    }

    /**
     * Sets up listeners for the Xel process
     */
    private setupProcessListeners(): void {
        const { child, writeEmitter } = this.state;

        if (!child) return;

        child.stdout.on('data', (data: Buffer) => {
            writeEmitter.fire(data.toString());
        });

        child.stderr.on('data', (data: Buffer) => {
            writeEmitter.fire(data.toString());
        });

        child.on('exit', (code: number) => {
            const exitMessage = `Exited with code ${code}`;
            const padding = Math.max(Math.floor((this.state.termWidth - exitMessage.length - 4) / 2), 0);
            
            writeEmitter.fire(`\r\n${'-'.repeat(padding)}< ${exitMessage} >${'-'.repeat(padding)}`);
        });
    }

    /**
     * Creates or updates the terminal instance
     * @returns Promise that resolves when terminal is ready
     */
    public async createOrUpdateTerminal(): Promise<void> {
        const { terminal, pty } = this.state;

        if (!terminal || !pty || (terminal.exitStatus !== undefined)) {
            this.state.writeEmitter = new vscode.EventEmitter<string>();

            this.state.pty = {
                onDidWrite: this.state.writeEmitter.event,
                open: () => this.runFile(vscode.window.activeTextEditor?.document.fileName || ''),
                handleInput: (data: string) => {
                    if (this.state.child?.stdin.writable) {
                        this.state.child.stdin.write(data);
                    }
                },
                setDimensions: (dimensions: vscode.TerminalDimensions) => {
                    this.state.termWidth = dimensions.columns;
                },
                close: () => {
                    if (this.state.child) this.state.child.kill();
                }
            };

            this.state.terminal = vscode.window.createTerminal({ name: 'Xel', pty: this.state.pty });
        }
    }

    /**
     * Cleans up resources when the extension is deactivated
     */
    public dispose(): void {
        if (this.state.child) this.state.child.kill();
        this.state.terminal?.dispose();
    }
}
