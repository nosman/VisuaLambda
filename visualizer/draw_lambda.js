//drawing_func is a function that is used to recursively draw the inner elements of given AST node.
//node is the current ast node.
//Svg is the global svg object.
//env is a js object that stores the relevant information to draw the current node: eg. origin coordinates, color, etc.
'use strict'

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


//Want to have a new line after the let expression
function draw_let(drawing_func, node, svg, env) {
    var x = env.x
    var y = env.y
    
    var l = labeledRect("let", svg, env, "#ffffff")
    
    env = incrementEnvOrigin(env)
    var v = labeledRect(node.var, svg, env)
    
    env = incrementEnvOrigin(env)
    var eq = labeledRect("=", svg, env, "#ffffff")
    
    env = incrementEnvOrigin(env)
    var exp = drawing_func(node.equals, svg, env)
    
    env = incrementEnvOrigin(env)
    var i = labeledRect("in", svg, env, "#ffffff")
    
    env.x = x
    env.y = y + env.height + LABEL_PADDING
    env.width = 0
    env.height = 0
    var rest = drawing_func(node.in, svg, env)
    
}

function draw_app(drawing_func, node, svg, env) {
    var lParen1 = labeledRect("(", svg, env, "#ffffff")
    
    env = incrementEnvOrigin(env)
    var func = drawing_func(node.func, svg, env)
    
    env = incrementEnvOrigin(env)
    var rParen1 = labeledRect(")", svg, env, "#ffffff")
    
    env = incrementEnvOrigin(env)
    var lParen2 = labeledRect("(", svg, env, "#ffffff")
    
    env = incrementEnvOrigin(env)
    var arg = drawing_func(node.arg, svg, env)
    
    env = incrementEnvOrigin(env)
    var rParen2 = labeledRect(")", svg, env, "#ffffff")
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