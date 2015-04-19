var c = Snap("#interpreter")
var textFactory = Snap("#textFactory")

console.log(c)
var v = { "kind":"var", "id":"yellow"}
draw_program(v, c)