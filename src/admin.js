// threejs
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect.js';

const progressParent = document.getElementById('showProgressBar');
const progress = document.getElementById('progress');

const pi = Math.PI;

// 速度の既定値
const defaultSpeed = 0.25;
// 1回で動かす角度の既定値
const defaultDeg = pi / 180 * defaultSpeed;

// threeの設定用変数
let scene, camera, light, renderer, effect; 

let pos, rote;
let step = 0;

// 機体（仮想）の角度
let roteY = 0;

// 上下の動きの切り替え
let upAndDownStep = 0;

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

// カメラの初期位置
pos.x = 0;
pos.y = 0;
pos.z = 0;

// カメラの初期角度(rad)
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
    } else if (roteY >= pi / 8 && step == 12) {
        step = 13;
    } else if (pos.x >= 800 && step == 13) {
        animationEnd();
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
    } else if (step == 8) {
        if (upAndDownStep == 0) {
            pos.y += defaultSpeed
        } else if (upAndDownStep == 1) {
            pos.y -= defaultSpeed
        }
        
        if (pos.y >= 15 && upAndDownStep == 0) {
            upAndDownStep = 1;
        } else if (pos.y < 0 && upAndDownStep == 1) {
            upAndDownStep = 2;
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
    }

    pos.x = pos.x + defaultSpeed * Math.cos(roteY);
    pos.z = pos.z - defaultSpeed * Math.sin(roteY);

    effect.render(scene, camera);  // StereoEffectでレンダリング
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}


// VR終了時
function animationEnd() {
    const cardOuter = document.getElementById("cardOuter");
    const canvas = document.querySelectorAll("canvas");
    canvas[0].style.display = "none";
    cardOuter.style.display = "flex";
}

function loadField(loaderGLTF) {
    loaderGLTF.load(
        // 読み込むglbファイルのパス　ルートはpublic
        '/star15.glb',

        // ロードされた時
        function ( gltf ) {
            scene.add( gltf.scene );

            gltf.animations;
            gltf.scene;
            gltf.scenes;
            gltf.cameras;
            gltf.asset;
        },

        // ロード中
        function ( xhr ) {
            // ローディングの進捗バーを表示
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            progress.style.width = ( xhr.loaded / xhr.total * 100 ) + '%';
            if (xhr.loaded / xhr.total * 100 >= 100) {
                progressParent.style.display = "none";
                animate();
            }
        },

        // エラー発生時
        function ( error ) {
            console.log( error );
        }
    );
}
