type token =
  | INT of (int)
  | VAR of (string)
  | LPAREN
  | RPAREN
  | DOT
  | LAMBDA
  | EOF

val exp :
  (Lexing.lexbuf  -> token) -> Lexing.lexbuf -> Ast.exp
