open Ast

let print_ident x =
	Format.printf "%s" x

let print_lambda p x e =
	Format.printf "@[<2>(lambda %s.@ " x;
	p e;
	Format.printf ")@]"

let print_binop p s x y = 
  Format.printf "@[<2>(";
  p x;
  Format.printf "@ %s@ " s;
  p y;
  Format.printf ")@]" 

(* Pretty print expression e *)
let print_exp e = 
  let rec loop e = 
    match e with 
      | Var x -> print_ident x
      | App (l,r) -> print_binop loop "" l r 
      | Lam(x,e) -> print_lambda loop x e in
  Format.printf "@[";
  loop e;
  Format.printf "@]"