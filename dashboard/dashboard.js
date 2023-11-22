var length = 960;
var num_of_motors = 4
export var distance = Math.floor(length/num_of_motors)
export var gap_distance = distance / 10;
export var radius = Math.floor( (distance/2)*0.75 )

var selected = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
]    

var angles = [
    [60, 60, 120, 120],
    [60, 60, 120, 120],
    [60, 60, 120, 120],
    [60, 60, 120, 120],
]    


export var circleCenters = [];
export var rectCenters = [];
for (var i=0; i<num_of_motors; i++){
    
    var center_of_circles = [];
    var center_of_rectangles = [];
    for (var j=0; j<num_of_motors; j++){
        var x = j*distance + Math.floor(distance*0.5);
        var y = i*distance + Math.floor(distance*0.5);
        y = y - gap_distance;
        
        center_of_circles.push([x, y]);

        var y_rectangle = y + radius + gap_distance*(0.5 + 1.5/2);
        center_of_rectangles.push([x, y_rectangle]);

    }
    circleCenters.push(center_of_circles);
    rectCenters.push(center_of_rectangles);
}

var canvas_1 = document.querySelector('canvas')

canvas_1.width = length
canvas_1.height = length

console.log(canvas_1)
var context_1 = canvas_1.getContext('2d')

import { init_circles } from "./drawing_fn.js";

init_circles(context_1)