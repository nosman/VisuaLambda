type var = string
type loc = int

type exp =
	  Var of var
	| App of exp * exp
	| Lam of var * exp
	| Let of var * exp * exp