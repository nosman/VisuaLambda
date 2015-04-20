//drawing_func is a function that is used to recursively draw the inner elements of given AST node.
//node is the current ast node.
//Svg is the global svg object.
//env is a js object that stores the relevant information to draw the current node: eg. origin coordinates, color, etc.

function draw_lam(drawing_func, node, svg, env) {
    //Pass down relative coords in the env objects
    env["color"] = "#ffffff"
    var lam = labeledRect("lambda", svg, env)
    //Maybe put this in the callee
    //Copy the env each time?
    env = incrementEnvOrigin(env)
    env["color"] = "#bada55"
    //var newenv = {"x" : env.x + env.width + LABEL_PADDING, y : env.y, color : "#ff0000"}
    var arg = labeledRect(node.var, svg, env)
    env["color"] = "#ffffff"
    env = incrementEnvOrigin(env)
    var dot = labeledRect(".", svg, env)
    env = incrementEnvOrigin(env)
    env["color"] = "#bada55"
    var body = drawing_func(node.body, svg, env)
}

function draw_let(drawing_func, node, svg, env) {
    //code
}

function draw_app(drawing_func, node, svg, env) {
    //code
}

//Base case
function draw_var(drawing_func, node, svg, env) {
    return labeledRect(node.id, svg, env)
}



var drawing_functions = {
    "lambda" : draw_lam,
    "let" : draw_let,
    "app" : draw_app,
    "var" : draw_var
}

function main(program, svg) {
     var env = {
        x : 0,
        y : 0,
        width : 0,
        height : 0,
        color : "#bada55"
    }
    draw_program(program, svg, env)
}


function draw_program(program, svg, env) {
    drawing_functions[program.kind](draw_program, program, svg, env)
}