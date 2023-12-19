//basic html methods
export function fillCircle(context, x, y, radius, color){
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
}

export function circle(context, x, y, radius, color, thickness, theta1, theta2){
    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, radius, theta1, theta2);
    context.lineWidth = thickness;
    context.stroke();
}

export function text(context, word, x, y, size, color='white'){
    // draw text in the center of rectangles
    // context.font = 'bold' + ' ' + (distance/10).toString()+"px Arial";
    context.font = 'bold' + ' ' + size.toString()+"px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(word, x, y);  
}


export function compass(context, x, y, radius_1, radius_2, theta, width_of_line, color='red'){

    var x1 = x + radius_1*Math.cos(theta);
    var y1 = y + radius_1*Math.sin(theta);
    var x2 = x + radius_2*Math.cos(theta);
    var y2 = y + radius_2*Math.sin(theta);

    context.lineWidth = width_of_line;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();    
}