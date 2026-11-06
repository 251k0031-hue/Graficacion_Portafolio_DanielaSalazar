import * as THREE from 'three';

// 1. Escena, Cámara y Renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Limpiar el HTML por defecto
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// 2. Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// -------------------------------------------------------------
// DESAFÍO 1: SEMÁFORO (a la izquierda)
// -------------------------------------------------------------
const semaforoGroup = new THREE.Group();

// Caja del semáforo
const cajaGeo = new THREE.BoxGeometry(1.2, 4, 1.2);
const cajaMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const caja = new THREE.Mesh(cajaGeo, cajaMat);
semaforoGroup.add(caja);

// Esferas del semáforo (con desplazamiento en Z para que sobresalgan)
const esferaGeo = new THREE.SphereGeometry(0.4, 32, 32);

const esferaRoja = new THREE.Mesh(
  esferaGeo, 
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
esferaRoja.position.y = 1.2;
esferaRoja.position.z = 0.6; // Mover hacia adelante

const esferaAmarilla = new THREE.Mesh(
  esferaGeo, 
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
esferaAmarilla.position.y = 0;
esferaAmarilla.position.z = 0.6; // Mover hacia adelante

const esferaVerde = new THREE.Mesh(
  esferaGeo, 
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
esferaVerde.position.y = -1.2;
esferaVerde.position.z = 0.6; // Mover hacia adelante

semaforoGroup.add(esferaRoja, esferaAmarilla, esferaVerde);
semaforoGroup.position.x = -2;
scene.add(semaforoGroup);

// -------------------------------------------------------------
// DESAFÍO 2: CORAZÓN / PALPITACIÓN (a la derecha)
// -------------------------------------------------------------
const corazonGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const corazonMat = new THREE.MeshStandardMaterial({ 
  color: 0xff0055, 
  wireframe: true // Malla de alambre activada
});
const corazon = new THREE.Mesh(corazonGeo, corazonMat);
corazon.position.x = 2;
scene.add(corazon);

// Posición de la Cámara
camera.position.z = 6;

// 3. Bucle de Animación
function animate() {
  requestAnimationFrame(animate);

  // Rotaciones
  semaforoGroup.rotation.y += 0.01;
  corazon.rotation.x += 0.01;
  corazon.rotation.y += 0.01;

  // Palpitación con Math.sin()
  let escala = 1 + Math.sin(Date.now() * 0.003) * 0.3;
  corazon.scale.set(escala, escala, escala);

  renderer.render(scene, camera);
}

// Adaptación al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
