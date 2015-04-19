//drawing_func is a function that is used to recursively draw the inner elements of given AST node.
//node is the current ast node.
//Svg is the global svg object.
//env is a js object that stores the relevant information to draw the current node: eg. origin coordinates, color, etc.

function draw_lam(drawing_func, node, svg, env) {
    //code
}

function draw_let(drawing_func, node, svg, env) {
    //code
}

function draw_app(drawing_func, node, svg, env) {
    //code
}

//Base case
function draw_var(drawing_func, node, svg, env) {
    labeledRect(node.id, svg, env)
}



var drawing_functions = {
    "lambda" : draw_lam,
    "let" : draw_let,
    "app" : draw_app,
    "var" : draw_var
}


function draw_program(program, svg) {
    var env = {
        x : "0",
        y : "0",
        color : "#bada55"
    }
    drawing_functions[program.kind](draw_program, program, svg, env)
}