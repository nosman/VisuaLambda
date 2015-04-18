open Ast

module VarSet = Set.Make(struct
	type t = var
	let compare = Pervasives.compare
end)
type varset = VarSet.t

(* calculate free variables of an expression e *)
let rec fvs_exp (e:exp) : VarSet.t = 
  match e with 
    | Var x -> 
      VarSet.singleton x
    | Lam(x,e) -> 
      VarSet.remove x (fvs_exp e)
    | App(e1,e2) -> 
      VarSet.union (fvs_exp e1) (fvs_exp e2)
    | Let(x, e1, e2) -> VarSet.union (fvs_exp e1) (VarSet.remove x (fvs_exp e2))

(* generate a variable that is similar to x but fresh for vs *)
let rec fresh (x:var) (xs:VarSet.t) : var = 
  let rec aux (x:var) (n:int) : var = 
    let x_n = x ^ "_" ^ string_of_int n in 
    if VarSet.mem x_n xs then 
      aux x (succ n) 
    else x_n in 
  if VarSet.mem x xs then 
    aux x 0
  else 
    x