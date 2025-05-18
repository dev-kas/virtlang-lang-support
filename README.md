# Xel Syntax & Language Tools

This extension provides official syntax highlighting and language recognition for the [Xel programming language](https://github.com/dev-kas/xel) in Visual Studio Code.

---

## Overview

**Xel Syntax & Language Tools** enables rich syntax highlighting and accurate language recognition for `.xel` files. It is the official extension for working with Xel source code, designed to help developers write clean and expressive Xel code within a familiar editor.

---

## Features

* Full TextMate grammar for `.xel` source files
* Highlighting for:
  * Language keywords (`let`, `fn`, `if`, `class`, etc.)
  * Function declarations and calls
  * Strings with escape sequences
  * Single-line (`//`) and block (`/* */`) comments
  * Numeric literals (integer and float)
  * Boolean values (`true`, `false`)
  * Operators (`=`, `==`, `+`, etc.)
* File extension `.xel` is automatically recognized
* Language mode switch to Xel from the VS Code status bar
* Predefined code snippets for:
  * Variable declarations (`let`, `const`)
  * Function definitions
  * Class declarations and members
  * Control structures (`if`, `while`, `try-catch`)
  * Module imports

---

## Getting Started

### Installation

1. Open **Visual Studio Code**
2. Go to the **Extensions** view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS)
3. Search for **Xel Syntax & Language Tools**
4. Click **Install**
5. Open or create a `.xel` file to get started

### Using Snippets

Begin typing any Xel keyword (e.g. `fn`, `class`, `try`) and select a snippet from the auto-suggest menu. Snippets help you scaffold common code patterns faster and with fewer errors.

---

## Extension Metadata

| Field                | Value                            |
| -------------------- | -------------------------------- |
| Extension Name       | Xel Syntax & Language Tools |
| Language ID          | `xel`                            |
| File Extension       | `.xel`                           |
| VS Code Engine       | `^1.98.0`                        |
| Category             | Programming Languages            |
| Syntax Scope Name    | `source.xel`                     |
| Syntax Config Path   | `./syntaxes/xel.tmLanguage.json` |
| Language Config Path | `./language-configuration.json`  |

---

## Roadmap

Planned improvements for future versions:

* Language Server Protocol (LSP) support for diagnostics, completion, and more
* Indentation and formatting rules
* Hover tooltips and go-to-definition
* Code linting and warnings

---

## Contributing

Contributions are welcome. You can:

* Fork the repo and open a pull request
* Submit bug reports or feature suggestions via [GitHub Issues](https://github.com/dev-kas/xel-lang-support/issues)
* Help improve the grammar rules for better syntax coverage

---

## License

Licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## Stay Connected

For updates, releases, and community discussions:

* GitHub: [https://github.com/dev-kas/xel-lang-support](https://github.com/dev-kas/xel-lang-support)
* Author: [@dev-kas](https://github.com/dev-kas)
