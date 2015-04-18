open Ast
open Eval

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

let print_let p x e1 e2 = 
  Format.printf "@[<2>let %s =@ " x; 
  p e1;
  Format.printf "@ in@ ";
  p e2;
  Format.printf "@]"

(* Pretty print expression e *)
let print_exp e = 
  let rec loop e = 
    match e with 
      | Var x -> print_ident x
      | App (l,r) -> print_binop loop "" l r 
      | Lam(x,e) -> print_lambda loop x e
      | Let(x, e1, e2) -> print_let loop x e1 e2 in
  Format.printf "@[";
  loop e;
  Format.printf "@]"

  let print_env env =
  Environment.iter (fun x y -> 
    Format.printf "@[<2>Var %s: @ " x;
    print_exp y;
    Format.printf "@]\n") env

  let json_of_env env =
  "{ \"kind\":\"env\"" ^
  (Environment.fold (fun x y acc ->
    acc ^ x
    ) env "")
  ^ "}"
  let json_of_let p x e1 e2 =
    "{ \"kind\":\"let\",\n\"var\": \"" ^ x
    ^ "\",\n\"equals\":" ^ (p e1) ^ ",\n \"in\":"
    ^ (p e2) ^ "}"

  let json_of_app p e1 e2 = 
  "{ \"kind\":\"app\",\n \"func\":" ^ (p e1)
  ^ ",\"arg\":" ^ (p e2) ^ "}" 

  let json_of_lambda p x e = 
    "{ \"kind\":\"lambda\", \n\"var\": \"" ^ x
    ^ "\",\n\"body\": " ^ (p e) ^ "}"

  let json_of_ident v =
    "\"" ^ v ^ "\""


let json_of_exp exp =
    let rec loop e =
      match e with
        | Var x -> json_of_ident x
        | App(l, r) -> json_of_app loop l r
        | Lam(x, e) -> json_of_lambda loop x e
        | Let(x, e1, e2) -> json_of_let loop x e1 e2 in
      loop exp
