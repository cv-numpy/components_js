import { fillCircle ,circle, text, compass } from "./drawing.js";

class Circle{
    constructor(x, y, radius, angle){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = angle;
    }
}

var motor_objects_list = [];
export function create_objects(servo_num, x_coordinates_list, y_coordinates_list, radius_list, angle_list){
    for (var i =0; i< servo_num; i++){
        motor_objects_list.push(new Circle(x_coordinates_list[i], y_coordinates_list[i], radius_list[i], angle_list[i]));
    }
    // console.log(motor_objects_list[1]);
}

export function init_circles(context){
    motor_objects_list.forEach((motor_object, index)=>{
        // draw angle
        show_angle(context, motor_object);
        // draw vector
        draw_vectors(context, motor_object);
    });
}


export function draw_vectors(context, motor_object){
    var radius = motor_object.radius;
    var theta = motor_object.angle/180*Math.PI;
    var center = [motor_object.x, motor_object.y];
    var w = radius*0.1;

    compass(context, center[0], center[1], radius*1, radius*0.8, theta*0, w, 'black');
    compass(context, center[0], center[1], radius*1, radius*0.8, theta*1.0, w, 'black');

    var num = Math.floor(motor_object.angle/10);
    for (var i=0; i<num; i++){
        compass(context, center[0], center[1], radius*1, radius*0.8, theta*(i/num), w, 'rgba(75, 125, 225, '+(i/num)+')');
    }
}

// draw text
export function show_angle(context, motor_object){
    var center = [motor_object.x, motor_object.y];
    var radius = motor_object.radius;
    var tubeWidth = 0.2
    fillCircle(context, center[0], center[1], radius*(1-tubeWidth), 'black');
    text(context, motor_object.angle, center[0], center[1], radius/(1.5), 'white');
}