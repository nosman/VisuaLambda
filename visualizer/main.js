var c = Snap("#interpreter")
var textFactory = Snap("#textFactory")

console.log(c)
var test = { "kind":"let",
"var": "true",
"equals":{ "kind":"lambda", 
"var": "x",
"body": { "kind":"lambda", 
"var": "y",
"body": { "kind":"var", "id":"x" }}},
 "in":{ "kind":"let",
"var": "false",
"equals":{ "kind":"lambda", 
"var": "x",
"body": { "kind":"lambda", 
"var": "y",
"body": { "kind":"var", "id":"y" }}},
 "in":{ "kind":"let",
"var": "and",
"equals":{ "kind":"lambda", 
"var": "b1",
"body": { "kind":"lambda", 
"var": "b2",
"body": { "kind":"app",
 "func":{ "kind":"app",
 "func":{ "kind":"var", "id":"b1" },"arg":{ "kind":"var", "id":"b2" }},"arg":{ "kind":"var", "id":"false" }}}},
 "in":{ "kind":"app",
 "func":{ "kind":"app",
 "func":{ "kind":"var", "id":"and" },"arg":{ "kind":"var", "id":"true" }},"arg":{ "kind":"var", "id":"false" }}}}}


main(test, c)