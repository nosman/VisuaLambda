var c = Snap("#interpreter")
var textFactory = Snap("#textFactory")

console.log(c)
var v = { "kind":"lambda", 
"var": "yellow",
"body": { "kind":"var", "id":"blue" }}

main(v, c)