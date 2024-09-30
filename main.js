// Instantiate a loader
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


let gyro_permission = false;

document.getElementById('btn').addEventListener('click', () => {
    if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
                        .then((state) => {
                        if (state === 'granted') {
                            // パーミッションを取れた際の処理
                            document.getElementById('res').textContent = 'モーションセンサーの許可を取得しました';
                            window.location.reload();
                        } else {
                            // パーミッションを取れなかった際の処理
                            document.getElementById('res').textContent = 'モーションセンサーの許可を取得できませんでした';
                            console.error('モーションセンサーの許可を取得できませんでした');
                        }
                        })
                        .catch((err) => console.error(err));
    } else {
        // window.DeviceMotionEvent.requestPermissionが無いブラウザでの処理
        console.error('DeviceMotionEvent APIが使えません');
        document.getElementById('res').textContent = 'DeviceMotionEvent APIが使えません';
    }
});

const confirm_btn = document.getElementById('btn');
function handleOrientation(event) {
    camera.rotation.x = event.alpha.toFixed(2);
    camera.rotation.y = event.beta.toFixed(2);
    camera.rotation.z = event.gamma.toFixed(2);

    if (event.alpha !== null && event.beta !== null && event.gamma !== null && !gyro_permission) {
        gyro_permission = true;
        confirm_btn.style.display = 'none';
        threejs();
    }
}

function requestDeviceOrientation() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                } else {
                    alert("デバイスのモーションセンサーへのアクセスが拒否されました。");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    requestDeviceOrientation();
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new THREE.AmbientLight(0xffffff, 1.0);

function threejs() {
    scene.add(light);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // カメラの初期位置
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 70;

    // Load a glTF resource
    const loader = new GLTFLoader();
    loader.load(
        // 読み込むglbファイルのパス
        '/public/fes.glb',
        // called when the resource is loaded
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

        },
        // called when loading has errors
        function ( error ) {

            console.log( error );

        }
    );


    function animate() {
        requestAnimationFrame(animate); // アニメーションを更新
        camera.position.y = 0.05;
        // camera.rotation.y = 1;
        renderer.render(scene, camera);
    }

    animate();
}