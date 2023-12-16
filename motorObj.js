import { fillCircle, text } from "./drawing.js";
import {getSize} from "./canvas_listener.js";

export class Motor {
    constructor(loc_x, loc_y, angle=90){
            this.typeName = 'mg90s';
            this.targetJoint = 'robot joint_1';
            this.name = 'motor1';
            this.angle = angle;
            this.selected = false;
            this.loc_x = loc_x;
            this.loc_y = loc_y;
    }

    set_radius(radius){
        this.radius = radius;
    }

    get_circleCenter(){
        // get latest window width
        var win_width = getSize();
        this.x = x;
    }

    been_clicked(context, circleCenters){
        this.selected = !this.selected;
        var x = circleCenters[this.loc_y][this.loc_x][0];
        var y = circleCenters[this.loc_y][this.loc_x][1];

        if (this.selected){
            var color_bg = 'white';
            var color_text = 'black';
        }else{
            var color_bg = 'black';
            var color_text = 'white';
        }
        fillCircle(context, x, y, this.radius*0.8, color_bg);
        text(context, this.angle, x, y, this.radius/(1.5), color_text);
    }
}