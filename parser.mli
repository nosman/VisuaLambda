type token =
  | INT of (int)
  | VAR of (string)
  | LPAREN
  | RPAREN
  | IN
  | DOT
  | LAMBDA
  | LET
  | EQUALS
  | EOF

val exp :
  (Lexing.lexbuf  -> token) -> Lexing.lexbuf -> Ast.exp
