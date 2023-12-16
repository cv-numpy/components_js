// step1:
// Layout Setting
var length = 960;

// get canvas width
export function getSize(gap_alpha = 0.1, radius_alpha = 0.75){
    var window_halfWidth = window.innerWidth/2;
    var window_halfWidth = Math.floor(window_halfWidth);
    var width = Math.min(length, window_halfWidth);
    // var distance = width / cols;
    // var gap_distance = distance * gap_alpha;
    // radius = Math.floor( (distance/2)*radius_alpha )
    return width;
}
const rows = 3;
const cols = 4;
// var distance = Math.floor( length/cols );
// var gap_distance = distance / 10;
// var radius = Math.floor( (distance/2)*0.75 )


// step2:
// create list of locations of the elements
export function latest_center_of_circles(){
    var circleCenters = [];
    var canvas_width = getSize();
    var distance = Math.floor( canvas_width/cols );
    var gap_distance = distance / 10;
    for (var i=0; i<rows; i++){
        var circleCenter_row = [];
        for (var j=0; j<cols; j++){
            var x = j*distance + Math.floor(distance*0.5);
            var y = i*distance + Math.floor(distance*0.5);
            y = y - gap_distance;
            circleCenter_row.push([x, y]);
        }
        circleCenters.push(circleCenter_row);
    }
    return circleCenters
}
// rectangle shaped text filed
export function latest_rectCornerPoints(){
    var rectCenters = [];
    var canvas_width = getSize();
    var distance = Math.floor( canvas_width/cols );
    var gap_distance = distance / 10;
    var radius = Math.floor( (distance/2)*0.75 )
    for (var i=0; i<rows; i++){
        
        var rectCenter_row = [];
        for (var j=0; j<cols; j++){
            var x = j*distance + Math.floor(distance*0.5);
            var y = i*distance + Math.floor(distance*0.5) - gap_distance;;
    
            var y_rectangleCenter = y + radius + gap_distance*(0.5 + 1.5/2);
            
            // four corner points
            var left_top = [x-radius, y_rectangleCenter-gap_distance*0.75];
            var right_bottom = [x+radius, y_rectangleCenter+gap_distance*0.75];    
            
            var leftTop_centerPoint_rightBottom = [];
            leftTop_centerPoint_rightBottom.push(left_top);
            leftTop_centerPoint_rightBottom.push([x, y_rectangleCenter]);
            leftTop_centerPoint_rightBottom.push(right_bottom);
            rectCenter_row.push(leftTop_centerPoint_rightBottom);
        }
        rectCenters.push(rectCenter_row);
    }
    return rectCenters
}




// step3:
// get html canvas
var canvas_1 = document.querySelector('canvas');
canvas_1.width = getSize();
canvas_1.height = getSize()*0.75;
var context_1 = canvas_1.getContext('2d');



// step4:
// *build motor object
var angle_firstPlace = null;
$.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/engine_side",
    dataType: "json",
    async: false,
    success: function(t){
        console.log('Message from serverSide:'+t['motor_firstAngle']);
        angle_firstPlace = t['motor_firstAngle'];
    },
    error: function(error){error}
})
import { build, init_circles, init_rect, update_circles } from "./motorObj_call_drawingFn.js";
if (angle_firstPlace == null){
    console.log('angle is 90 degree');
    var motors_array = build(rows, cols);
} else {
    console.log('angle is '+angle_firstPlace+' degree');
    var motors_array = build(rows, cols, angle_firstPlace);
}

// element selected by user's clicking
function find_selected(){
    var only_selected = [];
    motors_array.forEach((element)=>
        {
            only_selected.push(element.selected);
        }
    )
    console.log(only_selected);
    return only_selected    
}


// init
init_circles(context_1, motors_array);
init_rect(context_1, motors_array);

// step5:
// start listening
// activate the area
canvas_1.addEventListener("click", (event) => {
    var distance = getSize()/cols;
    var boundingBox = event.target.getBoundingClientRect();
    var x = event.clientX - boundingBox.left;
    var y = event.clientY - boundingBox.top;
    var loc_x = Math.floor(x / distance);
    var loc_y = Math.floor(y / distance);
    console.log('loc_x: '+ loc_x + '  ' + 'loc_y: ' + loc_y);
    if (loc_x>=0 && loc_x<4 && loc_y>=0 && loc_y<4){
        motors_array[loc_y*cols+loc_x].been_clicked(context_1, latest_center_of_circles());
    }
});


var total_num = 12;


var boolean_array = [false, false,  false, false, false, false, false, false, false, false, false, false];
var angle_button_name = 'btn_angle_';
var angle_input_name = "input_angle_";


function angle_apply_fn(index){
    boolean_array[index] = true;
    update_circles(context_1, motors_array, boolean_array);
    update_circles(context_1, motors_array, boolean_array);
    boolean_array = [false, false,  false, false, false, false, false, false, false, false, false, false];
}


var angle_buttons = [];
var angle_inputs = [];

for (var i=0+1; i<total_num+1; i++){
    angle_buttons.push(
        document.getElementById( angle_button_name + i ) );
        
        angle_inputs.push(
            document.getElementById( angle_input_name + i ) );
        }
        
        for (let i=0; i<total_num; i++){
            console.log('added listener.');
            angle_buttons[i].addEventListener("click", ()=>{
                var angle_input_value = angle_inputs[i].value;
                if (Math.abs(angle_input_value) <= 360){
                    motors_array[i].angle = Math.floor(angle_input_value);
                    
                    angle_apply_fn(i);

                    var selected_list = [false, false,  false, false, false, false, false, false, false, false, false, false];
                    selected_list[i] = true;

                    // use jQuery 
                    $.ajax({
                        url: '/process',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            'value': angle_input_value,
                            'selected': selected_list,
                        }),
                        success: function(t){
                            console.log('sucessfully get data from server.')
                        },
                        error: function(error){console.log(error);}
                    })
                }
            })
        }