open Ast
open Fvs

exception IllformedExpression

module Environment = Map.Make(struct
	type t = Ast.var
	let compare = Pervasives.compare
end)
type env = Ast.exp Environment.t

let rec eval_env (ex : Ast.exp) (ev : env) : Ast.exp * env =
		match ex with
		| App(e1, e2) -> print_endline "App"; let (e1', ev') =
			(eval_env e1 ev) in
				(match e1' with
					| Lam(x, body) -> eval_env body (Environment.add x (fst(eval_env e2 ev)) ev')
					| _ -> failwith "Not a function"
				)
		| Lam(x, e) -> print_endline "Lam"; (ex, ev)
		| Var x -> print_endline "Variable"; (Environment.find x ev, ev)

let eval (ex : Ast.exp) : Ast.exp =
	let rec eval_env (ex : Ast.exp) (ev : env) : Ast.exp * env =
		match ex with
		| App(e1, e2) -> print_endline "App"; let (e1', ev') =
			(eval_env e1 ev) in
				(match e1' with
					| Lam(x, body) -> eval_env body (Environment.add x (fst(eval_env e2 ev)) ev')
					| _ -> failwith "Not a function"
				)
		| Lam(x, e) -> print_endline "Lam"; (ex, ev)
		| Var x -> print_endline "Variable"; (Environment.find x ev, ev) in
		match (eval_env ex Environment.empty) with
		(ex', e) -> ex'
