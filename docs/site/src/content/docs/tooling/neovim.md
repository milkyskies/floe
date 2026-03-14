---
title: Neovim
---

ZenScript works with Neovim's built-in LSP client. No plugins required beyond a standard Neovim setup.

## Setup

Add to your `init.lua`:

```lua
-- Register .zs files
vim.filetype.add({ extension = { zs = "zenscript" } })

-- Start the LSP
vim.api.nvim_create_autocmd("FileType", {
  pattern = "zenscript",
  callback = function()
    vim.lsp.start({
      name = "zenscript",
      cmd = { "zsc", "lsp" },
      root_dir = vim.fs.dirname(
        vim.fs.find({ ".git" }, { upward = true })[1]
      ),
    })
  end,
})
```

### With nvim-lspconfig

```lua
local lspconfig = require("lspconfig")
local configs = require("lspconfig.configs")

if not configs.zenscript then
  configs.zenscript = {
    default_config = {
      cmd = { "zsc", "lsp" },
      filetypes = { "zenscript" },
      root_dir = lspconfig.util.root_pattern(".git"),
    },
  }
end

lspconfig.zenscript.setup({})
```

## Syntax Highlighting

Copy the included Vim syntax file:

```bash
cp editors/neovim/syntax/zenscript.vim ~/.config/nvim/syntax/
```

## Features

All LSP features work out of the box:

- **Diagnostics** - inline errors and warnings
- **Hover** (`K`) - type signatures and docs
- **Completions** (`<C-x><C-o>`) - symbols, keywords, pipe-aware autocomplete
- **Go to Definition** (`gd`)
- **Find References** (`gr`)
- **Document Symbols** - works with Telescope, fzf, etc.
- **Quick Fix** - auto-insert return types on exported functions

## Requirements

- `zsc` in your `$PATH` (`cargo install --path .` from the repo)
- Neovim 0.8+
