---
paths:
  - "**/*.rs"
  - "Cargo.toml"
---

# Rust Style & Conventions

## Module layout - no `mod.rs`

Use modern module style (Rust 2018+). Never create `mod.rs` files.

```
src/
├── worker.rs          # declares submodules, re-exports
├── worker/
│   ├── desk.rs
│   └── state.rs
└── main.rs
```

## Naming

- Types: `PascalCase` - acronyms capitalize only first letter (`HttpClient`, not `HTTPClient`)
- Functions/methods: `snake_case`
- Constants: `SCREAMING_SNAKE_CASE`
- Modules/files: `snake_case`

## Control flow

- Early return with guard clauses. Happy path last.
- Use `?` for error propagation. Never `.unwrap()` or `.expect()` in production paths.
- Prefer `if let` / `let else` over `match` when only one variant matters.

## Types

- Newtypes for IDs and domain values (`struct WorkerId(String)`, not bare `String`).
- Enums over stringly-typed values.
- Make invalid states unrepresentable.
- Derive `Debug, Clone, Serialize, Deserialize` on public types. Add `PartialEq, Eq` when meaningful.

## Functions

- Keep functions short. If it scrolls, split it.
- One level of abstraction per function.
- Prefer `&str` over `String` in args. Use `impl Into<String>` if you need ownership.

## Iterators & async

- Prefer `.iter().map().filter().collect()` over manual loops - but don't chain 6+ combinators.
- Never block the tokio runtime - no `std::thread::sleep` in async fns.
- Use `tokio::spawn` for background tasks, `JoinSet` for multiple.

## Imports

- Group: std -> external crates -> `crate::` internal
- Explicit imports, not glob (`use module::Thing` not `use module::*`)
- Exception: test modules may glob-import from parent

## Error handling

- `thiserror` for typed domain/application/infrastructure errors
- `anyhow` only at edges: `main.rs`, CLI, startup wiring
- Use `.context("...")` from `anyhow::Context` for descriptive messages at edges
