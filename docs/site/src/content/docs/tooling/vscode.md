---
title: VS Code Extension
---

The ZenScript VS Code extension provides syntax highlighting, LSP integration, and code snippets.

## Installation

### From Marketplace

Search for "ZenScript" in the VS Code extensions panel.

### From Source

```bash
cd editors/vscode
npm install
npm run build
# Then install the .vsix file
```

## Features

### Syntax Highlighting

Full TextMate grammar for `.zs` files:
- Keywords (`const`, `function`, `match`, `type`, etc.)
- Operators (`|>`, `->`, `=>`, `?`)
- JSX elements and attributes
- Template literals with interpolation
- Banned keyword highlighting (visual warning for `let`, `class`, etc.)

### Language Server

Full IDE features powered by `zsc lsp`:

- **Diagnostics** - parse errors, type errors, unused variable/import warnings
- **Hover** - type signatures and documentation
- **Completions** - symbols, keywords, builtins, cross-file with auto-import
- **Pipe-aware autocomplete** - type `|>` and see functions that match the piped type
- **Go to Definition** - jump to symbol definitions across files
- **Find References** - find all usages of a symbol
- **Document Symbols** - outline view of functions, types, and constants
- **Quick Fix: Add return type** - auto-insert inferred return type on exported functions

### Snippets

| Prefix | Description |
|--------|-------------|
| `fn` | Function declaration |
| `efn` | Exported function |
| `match` | Match expression |
| `matchr` | Match on Result |
| `matcho` | Match on Option |
| `type` | Record type |
| `union` | Union type |
| `comp` | React component |
| `imp` | Import statement |
| `pipe` | Pipe expression |
| `co` | Const declaration |
| `brand` | Brand type |
| `opaque` | Opaque type |

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `zenscript.serverPath` | Path to the `zsc` binary | `"zsc"` |

## Troubleshooting

**Diagnostics not showing:** Make sure `zsc` is installed and in your PATH. Check `zenscript.serverPath` in settings.

**Extension not activating:** Ensure the file has a `.zs` extension. The extension activates on the `zenscript` language ID.
