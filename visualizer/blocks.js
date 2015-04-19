/*Draws block primitives. */
'use strict'

var COLOR_MAPPINGS = {
    
}

function labeledRect(str, svg, env) {
    var textElem = textFactory.text(0, 0, str)
    var bbox = textElem.getBBox()
    console.log("Text bounding box")
    console.log(bbox)
    var totalHeight = bbox.height + 2.0*LABEL_PADDING
    var totalWidth = bbox.width + 2.0*LABEL_PADDING
    var r = svg.rect(env.x, env.y, totalWidth, totalHeight)
    r.attr({"fill" : env.color})
    var group = svg.group(r)
    textElem.attr({"font-family" : FONT_FAMILY})
    textElem.attr({"x" : env.x + LABEL_PADDING, "y" : env.y + bbox.height + LABEL_PADDING})
    group.append(textElem)
    return group
}

