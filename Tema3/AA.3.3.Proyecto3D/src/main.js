import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const canvas = document.querySelector('#canvas');

// crear escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// crear cámara: ángulo de perspectiva, relación de aspecto, plano cercano y lejano
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 12);

// crear renderizador
const renderizador = new THREE.WebGLRenderer({ canvas, antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFSoftShadowMap;

// luz ambiental
const luzAmb = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(luzAmb);

const luzSol = new THREE.DirectionalLight(0xffffff, 0.8);
luzSol.position.set(5, 10, 7);
luzSol.castShadow = true;
luzSol.shadow.mapSize.width = 2048;
luzSol.shadow.mapSize.height = 2048;
luzSol.shadow.bias = -0.001;
scene.add(luzSol);

// segunda parte
const controls = new OrbitControls(camera, renderizador.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const textureLoader = new THREE.TextureLoader();

const geometriaCubo = new THREE.BoxGeometry(1, 1, 1);
const materialCubo = new THREE.MeshStandardMaterial({ color: 0xffffff });
materialCubo.map = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
materialCubo.roughness = 0.7;
materialCubo.metalness = 0.0;

const cubo = new THREE.Mesh(geometriaCubo, materialCubo);
scene.add(cubo);
cubo.castShadow = true;

const pedestalArriba = 0.8;
const pedestalFondo = 1.0;
const pedestalAltura = 0.2;
const separacionPedestal = 0.8;
const pedestalSegmentos = 6;
const geometriaPedestal = new THREE.CylinderGeometry(pedestalArriba, pedestalFondo, pedestalAltura, pedestalSegmentos);
const materialPedestal = new THREE.MeshStandardMaterial({ color: 0x808080 });
const pedestal = new THREE.Mesh(geometriaPedestal, materialPedestal);
pedestal.position.y = 0;
pedestal.castShadow = true;
pedestal.receiveShadow = true;
scene.add(pedestal);

const esferaRadio = 0.3;
const esferaSegmentos = 32;
const geometriaEsfera = new THREE.SphereGeometry(esferaRadio, esferaSegmentos, esferaSegmentos);
const materialEsfera = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
esfera.position.y = 2.5;
esfera.castShadow = true;
esfera.receiveShadow = true;
scene.add(esfera);

cubo.position.y = 0.2 + separacionPedestal;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animar() {
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    esfera.rotation.x += 0.01;

    controls.update();
    renderizador.render(scene, camera);
}
renderizador.setAnimationLoop(animar);
