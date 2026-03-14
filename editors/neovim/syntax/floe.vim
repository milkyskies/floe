" Vim syntax file for Floe (.fl)
" Language: Floe

if exists("b:current_syntax")
  finish
endif

" Keywords
syn keyword floeKeyword       const fn type export import from
syn keyword floeKeyword       match return await async
syn keyword floeKeyword       if else opaque

" Built-in constructors
syn keyword floeBuiltin       Ok Err Some None

" Boolean literals
syn keyword floeBoolean       true false

" Types
syn keyword floeType          string number bool void Array Option Result

" Operators
syn match   floeOperator      /|>/
syn match   floeOperator      /=>/
syn match   floeOperator      /->/
syn match   floeOperator      /[+\-*/%=<>!&|?]/
syn match   floeOperator      /==/
syn match   floeOperator      /!=/
syn match   floeOperator      />=/
syn match   floeOperator      /<=/
syn match   floeOperator      /&&/
syn match   floeOperator      /||/
syn match   floeOperator      /\.\./

" Numbers
syn match   floeNumber        /\<\d\+\(\.\d\+\)\?\>/

" Strings
syn region  floeString        start=/"/ skip=/\\"/ end=/"/
syn region  floeTemplate      start=/`/ skip=/\\`/ end=/`/ contains=floeInterp
syn region  floeInterp        start=/\${/ end=/}/ contained

" Comments
syn match   floeComment       /\/\/.*/
syn region  floeComment       start=/\/\*/ end=/\*\// contains=floeComment

" JSX
syn region  floeJsxTag        start=/<\z([A-Z][a-zA-Z0-9]*\)/ end=/\/\?>/ contains=floeJsxAttr,floeString
syn match   floeJsxAttr       /\<[a-z][a-zA-Z0-9]*\>/ contained

" Highlights
hi def link floeKeyword       Keyword
hi def link floeBuiltin       Special
hi def link floeBoolean       Boolean
hi def link floeType          Type
hi def link floeOperator      Operator
hi def link floeNumber        Number
hi def link floeString        String
hi def link floeTemplate      String
hi def link floeInterp        Special
hi def link floeComment       Comment
hi def link floeJsxTag        Function
hi def link floeJsxAttr       Identifier

let b:current_syntax = "floe"
