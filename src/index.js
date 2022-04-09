import keyInput from "./KeyInput.js";
import connect from "./Connect.js";



// From threejs.org documentation
const ratio = window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x405040);
const dLight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(dLight);
scene.add(light);

const geometry = new THREE.BoxGeometry(50, 0.1, 50);
// It Specifies the Material
const material = new THREE.MeshPhongMaterial( { color: 0x98fb98 } );
const ground = new THREE.Mesh( geometry, material );

scene.add(ground);
camera.position.set(5, 15, 15);

// const boxGeometry = new THREE.BoxGeometry(2,2,2);
// const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const boxGround = new THREE.Mesh( geometry, material );
// const box = new THREE.Mesh( boxGeometry, boxMaterial );
// box.position.set(-2,0,9);
// scene.add(box);


function animate() {
    // cube.rotation.y += 0.05;
    // cube.rotation.x += 0.01;
	requestAnimationFrame( animate );
    if(keyInput.isPressed(38)) {
        // console.log("Working");
        camera.position.y += 0.05;
        camera.position.x += 0.05;
    }
    if(keyInput.isPressed(40)) {
        camera.position.y -= 0.05;
        camera.position.x -= 0.05;
    }
    if(keyInput.isPressed(39)) {
        camera.position.z -= 0.05;
    }
    if(keyInput.isPressed(37)) {
        camera.position.z += 0.05;
    }
    // To expand the ground area
    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();

connect.then((result) => {
    console.log(result);
    result.buildings.forEach((b, index) => {
        if(index <= result.supply) {
            const boxGeometry = new THREE.BoxGeometry(b.w,b.h,b.d);
            const boxMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            box.position.set(b.x,b.y,b.z);
            scene.add(box);
        }
    });
});


// renderer.render(scene, camera);
