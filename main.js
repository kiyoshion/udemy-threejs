import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let scene, camera, renderer, pointLight, controles

scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 500)

renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)

let textures = new THREE.TextureLoader().load("./images/earth-texture.jpg")

let ballGeometry = new THREE.SphereGeometry(100, 64, 32)
let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures })
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
scene.add(ballMesh)
let directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(-200, -200, -200)
scene.add(pointLight)

let pointLightHelper = new THREE.PointLightHelper(pointLight, 30)
scene.add(pointLightHelper)

controles = new OrbitControls(camera, renderer.domElement)

function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500),
  )

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

