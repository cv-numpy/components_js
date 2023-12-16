// radius: 75% of the distance between two circle's center
var radius_alpha = 0.75;
// var radius = 0;

// create and call a function in canvas_listener.js 
// to calculate the radius of the circle
// if the radius parameter is needed.

import { Motor } from "./motorObj.js"
import { getSize, latest_center_of_circles, latest_rectCornerPoints } from "./canvas_listener.js";
import { circle, text, compass } from "./drawing.js";

const rows = 4;
const cols = 4;

var circleCenters = null;
var rectCenters = null;
function update_centers(){
    circleCenters = latest_center_of_circles();
    rectCenters = latest_rectCornerPoints();
}

export function build(rows_num, cols_num, init_angle = 90){
    var distance = getSize()/cols_num;
    var radius = Math.floor( (distance/2)*radius_alpha )

    var motors = [];
    for (var loc_y=0; loc_y<rows_num; loc_y++){
        for (var loc_x=0; loc_x<cols_num; loc_x++){
            let a_motor = new Motor(loc_x, loc_y, init_angle);

            // add radius property to a_motor object
            a_motor.set_radius(radius);
            motors.push(a_motor);
        }
    }    
    return motors
}



export function init_circles(context, motor_object_list){
    // var do_all_element = Array(rows*cols).fill(true);
    update_centers();
    motor_object_list.forEach((motor_object, index)=>{
        // draw circle
        custom_circle(context, motor_object);
        // draw vector
        draw_vectors(context, motor_object);
        // draw angle
        show_angle(context, motor_object);
    });
}
export function init_rect(context, motor_object_list){
    var do_all_element = Array(rows*cols).fill(true);
    update_rect(context, motor_object_list, do_all_element);
}

export function update_circles(context, motor_object_list, selected){
    update_centers();
    motor_object_list.forEach((motor_object, index)=>{

        if (selected[index]){
            // draw circle
            custom_circle(context, motor_object);

            motor_object.been_clicked(context, circleCenters);
            // draw vector
            draw_vectors(context, motor_object);
            // draw angle
            // show_angle(context, motor_object);
        }
    });

}
export function update_rect(context, motor_object_list, selected){
    update_centers();
    motor_object_list.forEach((motor_object, index)=>{
   
        if (selected[index]){
            // draw text field
            rectangle(context, motor_object);

            // draw text in the field
            var [left_top, center, right_bottom] = rectCenters[motor_object.loc_y][motor_object.loc_x];
            text(context, 'item-'+index, center[0], center[1], ( right_bottom[0]-left_top[0] )/(5), 'black');
        }
    });
}


export function custom_circle(context, motor_object){
    console.log(motor_object.angle);
    var theta = motor_object.angle/180*Math.PI;
    var tubeWidth_vs_radius = 0.2
    var lineWidth_vs_radius = tubeWidth_vs_radius * 0.1;
    var center = circleCenters[motor_object.loc_y][motor_object.loc_x];
    
    // circle(context, center[0], center[1], motor_object.radius*(1-tubeWidth_vs_radius/2), 'white', motor_object.radius*tubeWidth_vs_radius, 0, Math.PI);
    circle(context, center[0], center[1], motor_object.radius*(1-tubeWidth_vs_radius/2), 'white', motor_object.radius*tubeWidth_vs_radius, 0, Math.PI*2);
    circle(context, center[0], center[1], motor_object.radius*(1-tubeWidth_vs_radius/2), 'green', motor_object.radius*lineWidth_vs_radius*4, 0, theta);
    circle(context, center[0], center[1], motor_object.radius*(1-tubeWidth_vs_radius/2), 'black', motor_object.radius*(tubeWidth_vs_radius-lineWidth_vs_radius*2), theta, 0);
}


export function draw_vectors(context, motor_object){
    var radius = motor_object.radius;
    var theta = motor_object.angle/180*Math.PI;
    var center = circleCenters[motor_object.loc_y][motor_object.loc_x];
    // console.log(center);
    compass(context, center[0], center[1], radius, radius*0.8, theta*0, 'white');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.1, 'rgba(75, 125, 225, 0.1)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.2, 'rgba(75, 125, 225, 0.2)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.3, 'rgba(75, 125, 225, 0.3)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.4, 'rgba(75, 125, 225, 0.4)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.5, 'rgba(75, 125, 225, 0.5)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.6, 'rgba(75, 125, 225, 0.6)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.7, 'rgba(75, 125, 225, 0.7)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.8, 'rgba(75, 125, 225, 0.8)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*0.9, 'rgba(75, 125, 225, 0.9)');
    compass(context, center[0], center[1], radius, radius*0.8, theta*1.0, 'red');
}

// draw text
export function show_angle(context, motor_object){
    var center = circleCenters[motor_object.loc_y][motor_object.loc_x];
    var radius = motor_object.radius;
    // console.log(center);
    // text(context, motor_object.angle, center[0], center[1], radius/2);
    text(context, motor_object.angle, center[0], center[1], radius/(1.5));
}

export function rectangle(context, motor_object){
    // console.log(rectCenters);
    var [left_top, center_point, right_bottom] = rectCenters[motor_object.loc_y][motor_object.loc_x];
    context.fillStyle = 'white';
    context.fillRect(
        left_top[0], 
        left_top[1],
        right_bottom[0]-left_top[0],
        right_bottom[1]-left_top[1] );
}