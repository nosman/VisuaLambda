var c = Snap("#interpreter")
var textFactory = Snap("#textFactory")

console.log(c)
var v = { "kind":"app",
 "func":{ "kind":"lambda", 
"var": "x",
"body": { "kind":"lambda", 
"var": "y",
"body": { "kind":"var", "id":"y" }}},"arg":{ "kind":"lambda", 
"var": "x",
"body": { "kind":"lambda", 
"var": "y",
"body": { "kind":"var", "id":"x" }}}}


main(v, c)