
import * as THREE from 'three';

// 1. Creación de la escena
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x101820);

// 2. Configuración de la cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / (window.innerHeight - 70),
    0.1,
    1000
);

camera.position.z = 5;

// 3. Configuración del renderizador
const canvasElement = document.querySelector('#mi-canvas');

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight - 70
);

// 4. Construcción de la malla
const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshBasicMaterial({
    color: 0x00aaff,
    wireframe: false
});

const cube = new THREE.Mesh(geometry, material);

// Agregar el cubo a la escena
scene.add(cube);

// 5. Bucle de animación
function animate() {

    requestAnimationFrame(animate);

    // Rotación del cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Dibujar la escena
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// 6. Ajustar el tamaño cuando cambia la ventana
window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / (window.innerHeight - 70);

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight - 70
    );

});
