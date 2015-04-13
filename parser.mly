%{
	open Ast
	open Printf
	open Lexing
%}

%token <int> INT
%token <string> VAR
%token LPAREN RPAREN DOT LAMBDA VAR EOF

%type <Ast.exp> exp

%start exp

%%

exp : LAMBDA VAR DOT exp 	{ Lam ($2, $4) }
	| appexp			 	{ $1 }

appexp : appexp aexp 		{ App($1, $2) }
	| aexp 					{ $1 }

aexp : VAR					{ Var $1 }
	 | LPAREN exp RPAREN 	{ $2 }