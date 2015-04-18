function draw_lambda(drawing_func, prog, Svg) {
    //code
}

function draw_let(drawing_func, prog, Svg) {
    //code
}

function draw_app(drawing_func, prog, Svg) {
    //code
}

function draw_var(drawing_func, prog, Svg) {
    //code
}



var drawing_functions = {
    "lambda" : draw_lambda,
    "let" : draw_let,
    "app" : draw_app,
    "var" : draw_var
}


function draw_program(program, Svg) {
    drawing_functions[program.kind](program)
}