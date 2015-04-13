open Ast
open Fvs

exception IllformedExpression

let rec subst e1 var e2 = match e1 with
	| Var x -> let Var(x1) = var in if x1 = x then e2 else var
	| App(e, arg) -> App(subst e var e2, subst arg var e2)
	| Lam(x, e) -> let Var(x1) = var in 
		if x1 = x then e1 else
			let fv = fvs_exp e in
				if not (VarSet.mem x fv) then 
					Lam(x, subst e var e2)
					else failwith "Rewrite e1 with a fresh variable"


let rec eval g c = 
	match c with
		| App(e1, e2) -> let arg = eval g e1 in
			failwith "Feed the arg to the func"
		| Lam(x, e) -> failwith "Lambda definition"
		| Var x -> failwith "hit a variable"
