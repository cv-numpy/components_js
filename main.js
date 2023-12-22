import * as THREE from 'three';

var angle_list = [0, 0, 0]; var angle_diff = 10;

// create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// set color
const material_green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material_red = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const material_blue = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

// cubes group
const group_1 = new THREE.Group();
const group_2 = new THREE.Group();
const group_3 = new THREE.Group();

// create geometres
const geometry_1 = new THREE.BoxGeometry( 5, 2, 2 ); // width, height, deepth,
const joint_geometry = new THREE.SphereGeometry(1.5, 32, 16);

// create sphere shaped mesh body
const joint_mesh_1 = new THREE.Mesh( joint_geometry, material_blue );
const joint_mesh_2 = new THREE.Mesh( joint_geometry, material_blue );
const joint_mesh_3 = new THREE.Mesh( joint_geometry, material_blue );
joint_mesh_1.position.x = 3.5+ 2*7;
joint_mesh_2.position.x = 3.5+ 1*7;
joint_mesh_3.position.x = 3.5+ 0*7;


// create cubic shaped mesh body
const cube_1 = new THREE.Mesh( geometry_1, material_green );
const cube_2 = new THREE.Mesh( geometry_1, material_red );
const cube_3 = new THREE.Mesh( geometry_1, material_green );
const joint_mesh = new THREE.Mesh( joint_geometry, material_green );
scene.add(joint_mesh);

cube_1.position.x = 3*7;
cube_2.position.x = 2*7;
cube_3.position.x = 1*7;

group_1.add(joint_mesh_1);
group_1.add(cube_1);

group_2.add(group_1);
group_2.add(joint_mesh_2);
group_2.add(cube_2);

group_3.add(group_2);
group_3.add(joint_mesh_3);
group_3.add(cube_3);

scene.add( group_3 );


function rotateAboutPoint(pivotPoint_with_directionVector, obj, theta, pointIsWorld=false){
    // obj.rotateOnAxis rotate the obj but never change obj.postion
    obj.rotateOnAxis(pivotPoint_with_directionVector[1], theta);

    obj.position.sub(pivotPoint_with_directionVector[0]); // remove the offset
    
    // obj.position.applyAxisAngle change obj.postion on it's x and y but never rotate the obj
    obj.position.applyAxisAngle(pivotPoint_with_directionVector[1], theta);
    
    obj.position.add(pivotPoint_with_directionVector[0]); // re-add the offset
    
}


// how to render
var play_or_stop_1 = false;
var play_or_stop_2 = false;
var play_or_stop_3 = false;
const btn_play_or_stop_1 = document.getElementById('btn_1');
const btn_play_or_stop_2 = document.getElementById('btn_2');
const btn_play_or_stop_3 = document.getElementById('btn_3');

btn_play_or_stop_1.addEventListener("click", ()=>{play_or_stop_1 = !play_or_stop_1;
    angle_list[2] = angle_list[2] + angle_diff;
    var pivot_set = [new THREE.Vector3(7/2+7*2, 0, 0), new THREE.Vector3(0,0,1)];
    rotateAboutPoint(pivot_set, group_1, angle_diff/180*Math.PI);
})
btn_play_or_stop_2.addEventListener("click", ()=>{play_or_stop_2 = !play_or_stop_2;
    angle_list[1] = angle_list[1] + angle_diff;
    var pivot_set = [new THREE.Vector3(7/2+7*1, 0, 0), new THREE.Vector3(0,0,1)];
    rotateAboutPoint(pivot_set, group_2, angle_diff/180*Math.PI);
})
btn_play_or_stop_3.addEventListener("click", ()=>{play_or_stop_3 = !play_or_stop_3;
    angle_list[0] = angle_list[0] + angle_diff;
    var pivot_set = [new THREE.Vector3(7/2+7*0, 0, 0), new THREE.Vector3(0,0,1)];
    rotateAboutPoint(pivot_set, group_3, angle_diff/180*Math.PI);
})

// this function will be called 60 times per secend.
function animate() {
    // if (play_or_stop_1){rotateAboutPoint(group_1, new THREE.Vector3(7/2+7*2, 0, 0), new THREE.Vector3(0,0,1), 0.001);}
    // if (play_or_stop_2){rotateAboutPoint(group_2, new THREE.Vector3(7/2+7*1, 0, 0), new THREE.Vector3(0,0,1), 0.001);}
    // if (play_or_stop_3){rotateAboutPoint(group_3, new THREE.Vector3(7/2+7*0, 0, 0), new THREE.Vector3(0,0,1), 0.001);}
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();