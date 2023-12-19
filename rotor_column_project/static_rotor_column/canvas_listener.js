import { create_objects, init_circles } from "./motorObj_call_drawingFn.js";

var servo_num = 8;
const HEIGHT = 960;
const WIDTH = (HEIGHT / servo_num) * 1.5; 
var r = HEIGHT / servo_num / 2;

var first_angle = 90;
let angles_list = Array(servo_num).fill(first_angle);
let radius_list = Array(servo_num).fill(r);
var angle_list = [];
for (var i=0; i<servo_num; i++){
    angle_list.push(i*(360/servo_num));
}

var motors_canvas = document.getElementById('canvas_motor');
motors_canvas.height = HEIGHT;
motors_canvas.width = WIDTH;
var context_motors = motors_canvas.getContext('2d');


var x_coordinates_list = Array(servo_num).fill(WIDTH/2);
var y_coordinates_list = [];
for (var i=0; i<servo_num; i++){
    y_coordinates_list.push(i * (HEIGHT / servo_num) + r)}
console.log(y_coordinates_list);

create_objects(servo_num, x_coordinates_list, y_coordinates_list, radius_list, angle_list);

init_circles(context_motors);