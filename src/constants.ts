import * as path from 'path';
import * as os from 'os';

export const XEL = {
    CONFIG: {
        BINARY_PATH: 'binaryPath',
    },
    DEFAULTS: {
        BINARY_PATH: path.join(os.homedir(), '.local', 'bin', os.platform() === 'win32' ? 'xel.exe' : 'xel'),
        TERM_WIDTH: 80,
    },
    COMMANDS: {
        RUN: 'xel.run',
    },
    ERROR_MESSAGES: {
        PROCESS_START: 'Failed to start Xel process:',
    },
};
