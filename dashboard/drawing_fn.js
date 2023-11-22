import {circleCenters, rectCenters, distance, gap_distance, radius} from './dashboard.js';

var colors = [
    'rgba(100, 100, 200)',
    'rgba(100, 200, 100)', 
    'rgba( 50, 175, 175)', 
    'rgba(200, 100, 100)', 
];

export function custom_circle(context, loc_x, loc_y, radian, activated=false){
    if (radian==0){radian=Math.PI*2;}
    var color = 'white';
    if (loc_x != null && loc_y != null){color = colors[loc_y];}
    
    var xy = circleCenters[loc_y][loc_x];
    var x = xy[0]; var y = xy[1];
    
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
    
    context.beginPath();
    context.strokeStyle = 'white';
    context.arc(x, y, Math.floor(radius*0.9), Math.PI*2*(1/4), Math.PI*2*(1/4)+radian);
    context.lineWidth = radius*0.125;
    context.stroke();
    
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, Math.floor(radius*0.9), Math.PI*2*(1/4), Math.PI*2*(1/4)+radian);
    context.lineWidth = radius*0.075;
    context.stroke();
    
    context.beginPath();
    context.strokeStyle = 'black';
    context.arc(x, y, Math.floor(radius*0.9), Math.PI*2*(1/4)+radian, Math.PI*2*(1/4));
    context.lineWidth = radius*0.125;
    context.stroke();
    
    context.beginPath();
    context.fillStyle = 'black';

    console.log('activated: '+activated)
    if (activated){context.fillStyle = 'white';}
    context.arc(x, y, Math.floor(radius*0.8), 0, Math.PI*2);
    context.fill();  
}

// draw text in the center of circles
export function draw_angle(context, loc_x, loc_y, degree_of_angle, activated=false){
    var xy = circleCenters[loc_y][loc_x];
    var x = xy[0]; var y = xy[1]; 
    var text_angle = degree_of_angle.toString();
    context.font = 'bold' + ' ' + (distance/4).toString()+"px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
 
    if (activated){context.fillStyle = 'black';}
    context.fillText(text_angle, x, y);
}

// draw text in the center of rectangles
export function draw_target(context, loc_x, loc_y, target_name){
    var xy = rectCenters[loc_y][loc_x];
    var x = xy[0]; var y = xy[1]; 

    // draw rectangle
    context.fillStyle = colors[loc_y];
    context.fillRect(
        x-radius, 
        y-gap_distance*0.75,
        2*radius,
        gap_distance*1.5 );

    // draw text in the center of rectangles
    context.font = 'bold' + ' ' + (distance/10).toString()+"px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
    context.fillText(target_name, x, y);   
}

export function init_circles(context){
    var index_num = 0;
    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++){
            
            // Name of target object that been driven by the motor
            index_num = index_num + 1;
            
            var angle = Math.PI*i/2;
            
            custom_circle(context, i, j, angle);
            
            draw_angle(context, i, j, 180*(angle/Math.PI));
                
            var text_target_object = 'Target object' + ' ' + index_num.toString();
    
            draw_target(context, j, i, text_target_object);
            }
        }
}