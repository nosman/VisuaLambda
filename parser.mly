%{
	open Ast
	open Printf
	open Lexing
%}

%token <int> INT
%token <string> VAR
%token LPAREN RPAREN IN DOT LAMBDA LET VAR EQUALS EOF

%type <Ast.exp> exp

%start exp

%%

exp : LAMBDA VAR DOT exp 	{ Lam ($2, $4) }
	| LET VAR EQUALS exp IN exp {Let($2, $4, $6)}
	| appexp			 	{ $1 }

appexp : appexp aexp 		{ App($1, $2) }
	| aexp 					{ $1 }

aexp : VAR					{ Var $1 }
	 | LPAREN exp RPAREN 	{ $2 }