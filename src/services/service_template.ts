import * as vscode from 'vscode';

/**
 * Service template for creating new services in the extension.
 * Replace `ServiceName` with your actual service name.
 */
export class ServiceName {
    /**
     * Creates a new instance of the service.
     */
    constructor() {
        // Initialize your service here
    }

    /**
     * Example method that can be called from the extension.
     * @param param Example parameter
     * @returns A promise that resolves when the operation is complete
     */
    public async exampleMethod(param: string): Promise<void> {
        // Implement your method logic here
        console.log(`Service method called with: ${param}`);
    }

    /**
     * Cleans up resources when the extension is deactivated.
     */
    public dispose(): void {
        // Clean up any resources here
    }
}
