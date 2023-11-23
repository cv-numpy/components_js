var length = 700;
var num_of_motors = 4
var distance = Math.floor(length/num_of_motors)
var gap_distance = distance / 10;
var radius = Math.floor( (distance/2)*0.75 )

var colors = [
    'rgba(100, 100, 200)',
    'rgba(100, 200, 100)', 
    'rgba( 50, 175, 175)', 
    'rgba(200, 100, 100)', 
];

var selected = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
]    

function find_selected(){
    var only_selected = []
    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++){
            if (selected[i][j]){
                var x = j; var y = i;
                only_selected.push([x, y]);
            }
        }
    }
    return only_selected
}

var angles = [
    [0, 90, 180, 270],
    [0, 90, 180, 270],
    [0, 90, 180, 270],
    [0, 90, 180, 270],
]    

var targets = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
]

var circleCenters = [];
var rectCenters = [];
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


init_circles(context_1)






canvas_1.addEventListener("click", (event) => {
    var boundingBox = event.target.getBoundingClientRect();
    var x = event.clientX - boundingBox.left;
    var y = event.clientY - boundingBox.top;
    var loc_x = Math.floor(x / distance);
    var loc_y = Math.floor(y / distance);
    console.log(loc_x);
    console.log(loc_y);
    if (loc_x>=0 && loc_x<4 && loc_y>=0 && loc_y<4){
        selected[loc_y][loc_x] = !selected[loc_y][loc_x]
        // console.log('selected');
        // console.log(selected);

        var only_selected = find_selected();

        custom_circle(context_1, loc_x, loc_y, (angles[loc_y][loc_x]/180)*Math.PI, selected[loc_y][loc_x]);
        draw_angle(context_1, loc_x, loc_y, angles[loc_y][loc_x], selected[loc_y][loc_x]);
    
    }
});


var input_1 = document.getElementById("input_1_btn")
input_1.addEventListener("click", function(event){
    var user_input_1 = document.getElementById("input_1").value
    console.log(user_input_1);
    var only_selected = find_selected();
    only_selected.forEach(update_words);

    function update_words(item, index){
        var x = item[0]; var y = item[1];

        targets[y][x] = user_input_1;

        draw_target(context_1, x, y, user_input_1);
    }
});

var input_2 = document.getElementById("input_2_btn")
input_2.addEventListener("click", function(event){
    var user_input_2 = document.getElementById("input_2").value
    
    if (user_input_2>=0 && user_input_2<=360){
        
        var only_selected = find_selected();
        only_selected.forEach(update_words);
    
        function update_words(item, index){
        
            var x = item[0]; var y = item[1];

            angles[y][x] = user_input_2;

            custom_circle(context_1, x, y, (user_input_2/180)*Math.PI, selected[y][x]);
            
            draw_angle(context_1, x, y, user_input_2, selected[y][x]);
        }
    }
})
