/*Draws block primitives. */
'use strict'

var COLOR_MAPPINGS = {
    
}

function updateEnv(attrs) {
    for (var prop in attrs) {
        env[prop] = attrs[prop]
    }
}


//Add functions to move around like directions- Origin is like a "cursor"
function incrementEnvOrigin(env, incrementHeight) {
    env.x = env.x + env.width + LABEL_PADDING
    if (incrementHeight) {
        env.y = env.y + env.height + LABEL_PADDING
    }
    return env
}

function labeledRect(str, svg, env, color) {
    if (!color) {
        color = env.color
    }
    var textElem = textFactory.text(0, 0, str)
    var bbox = textElem.getBBox()
    console.log("Text bounding box")
    console.log(bbox)
    var totalHeight = bbox.height + 2.0*LABEL_PADDING
    var totalWidth = bbox.width + 2.0*LABEL_PADDING
    var r = svg.rect(parseFloat(env.x), parseFloat(env.y), totalWidth, totalHeight)
    r.attr({"fill" : color})
    var group = svg.group(r)
    textElem.attr({"font-family" : FONT_FAMILY})
    textElem.attr({"x" : env.x + LABEL_PADDING, "y" : env.y + bbox.height})
    env["width"] = totalWidth
    env["height"] = totalHeight
    group.append(textElem)
    return group
}

