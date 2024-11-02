// threejs
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect.js';



window.addEventListener("load", function() {

    const confirmCeckbox = document.getElementById("tos-confirm");
    let nextBtn = document.getElementById("cookieConfirm");
    confirmCeckbox.addEventListener("change", function () {
        nextBtn.disabled = !confirmCeckbox.checked;
    })
});


const progressParent = document.getElementById('showProgressBar');
const progress = document.getElementById('progress');

const pi = Math.PI;

const defaultSpeed = 0.25;
const defaultDeg = pi / 180 * defaultSpeed;

let scene, camera, light, renderer, effect; // threeの設定用変数
let pos, rote;
let step = 0;


let vehicle;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
light = new THREE.DirectionalLight(0xffffff, 1.0);
renderer = new THREE.WebGLRenderer();

scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

effect = new StereoEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

pos = camera.position;
rote = camera.rotation;

// カメラの初期位置(rad)
pos.x = 0;
pos.y = 0;
pos.z = 0;
rote.y = pi / -2;


// skyboxの設定
const loaderSkyBox = new THREE.CubeTextureLoader();
const texture = loaderSkyBox.load([
    '/skybox/CosmicCoolCloudLeft.png',
    '/skybox/CosmicCoolCloudRight.png',
    '/skybox/CosmicCoolCloudTop.png',
    '/skybox/CosmicCoolCloudBottom.png',
    '/skybox/CosmicCoolCloudFront.png',
    '/skybox/CosmicCoolCloudBack.png',
]);
scene.background = texture;


// 霧の追加
scene.fog = new THREE.Fog(0x000000, 50, 2000);

// Load a glTF resource
progressParent.style.display = "flex";

const loaderGLTF = new GLTFLoader();
loadField(loaderGLTF);

let roteY = 0;
let xzStep;
cStep = 0;
xzStep = 0;

function animate() {
    requestAnimationFrame(animate);
    if (pos.x >= 100 && step == 0) {
        step = 1;
    } else if (roteY >= pi / 4 && step == 1) {
        step = 2;
    } else if (pos.x >= 200 && step == 2) {
        step = 3;
    } else if (roteY <= -1 * pi && step == 3) {
        step = 4;
    } else if (pos.x <= 200 && step == 4) {
        step = 5;
    } else if (roteY >= 0 && step == 5) {
        step = 6;
    } else if (roteY >= pi * 25 / 180 && step == 6) {
        step = 7;
    } else if (pos.x >= 400 && step == 7) {
        step = 8;
    } else if (pos.x >= 600 && step == 8) {
        step = 9;
    } else if (roteY <= -1 * pi && step == 9) {
        step = 10;
    } else if (pos.x <= 600 && step == 10) {
        step = 11;
    } else if (roteY >= 0 && step == 11) {
        step = 12;
    } else if (roteY >= pi / 6 && step == 12) {
        step = 13;
    } else if (pos.x >= 800 && step == 13) {
        return;
    }


    if (step === 0) {
        rote.y = roteY - pi / 2;
    } else if (step === 1) { // 45degまで右旋回
        roteY = roteY + defaultDeg;
        rote.y = roteY - pi / 2;
    } else if (step === 2) {
        rote.y = roteY - pi / 2;
    } else if (step === 3) {
        roteY = roteY - defaultDeg;
        rote.y = roteY - pi / 2;

        if (pos.y < 10) {
            rote.x += defaultDeg;
            pos.y += defaultSpeed;
        }

    } else if (step === 4) {
        rote.y += defaultDeg * 2.8;
        if (pos.y > 0) {
            rote.x -= defaultDeg;
            pos.y -= defaultSpeed;
        }
    } else if (step === 5) {
        roteY = roteY + defaultDeg;
        rote.y = roteY + pi / 6;
    } else if (step === 6) {
        roteY = roteY + defaultDeg;
        rote.y -= defaultDeg * 3.5;
        if (rote.y >= pi * 2 / 3) {
            rote.y = pi * 2 / 3;
        }
    } else if (step == 7) {

    } else if (step == 8) {
        if (xzStep == 0) {
            pos.y += defaultSpeed
        } else if (xzStep == 1) {
            pos.y -= defaultSpeed
        }
        
        if (pos.y >= 15 && xzStep == 0) {
            xzStep = 1;
        } else if (pos.y < 0 && xzStep == 1) {
            xzStep = 2;
            pos.y = 0;
        }
    } else if (step == 9) {
        roteY = roteY - defaultDeg;
        rote.y = roteY - pi / 2;
    } else if (step == 10) {
        rote.y += defaultDeg * 5;
    } else if (step == 11) {
        roteY = roteY + defaultDeg;
        rote.y = roteY + pi / 6;
    } else if (step == 12) {
        roteY = roteY + defaultDeg;
        rote.y -= defaultDeg * 3.5;
        if (rote.y >= pi * 2 / 3) {
            rote.y = pi * 2 / 3;
        }
    } else if (step == 13) {

    }
    

    pos.x = pos.x + defaultSpeed * Math.cos(roteY);
    pos.z = pos.z - defaultSpeed * Math.sin(roteY);

    effect.render(scene, camera);
}
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}

function loadField(loaderGLTF) {
    loaderGLTF.load(
        '/star15.glb',
        function ( gltf ) {

            scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            progress.style.width = ( xhr.loaded / xhr.total * 100 ) + '%';
            if (xhr.loaded / xhr.total * 100 >= 100) {
                progressParent.style.display = "none";
                animate();
            }

        },
        // called when loading has errors
        function ( error ) {


        }
    );
}