import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper, CubeTextureLoader, LoadingManager, Material, TextureLoader } from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * gui
 */

const gui = new dat.GUI()


/**
 * helper
 */
const axesHelper = new AxesHelper(15)
/* scene.add(axesHelper)
 *//**
 * webgl
 */
 const webglCanva = document.querySelector('canvas.webgl')

/**
 * texture
 */

const textureLoader = new TextureLoader()
const cubeTextureLoader = new CubeTextureLoader()
const sunTexture = textureLoader.load('/textures/solar-system/sun.jpg')
const mercuryTexture = textureLoader.load('/textures/solar-system/mercury.jpg')
const venusTexture = textureLoader.load('/textures/solar-system/venus.jpg')
const earthTexture = textureLoader.load('/textures/solar-system/earth.jpg')

const star = cubeTextureLoader.load([
	'textures/solar-system/env/px.png',
	'textures/solar-system/env/nx.png',
	'textures/solar-system/env/py.png',
	'textures/solar-system/env/ny.png',
	'textures/solar-system/env/pz.png',
	'textures/solar-system/env/nz.png',
])
/** 
 * scene 
 */
const scene = new THREE.Scene()
scene.background = star

 /***
  * Material
  */
const lineMaterial = new THREE.MeshBasicMaterial()
lineMaterial.transparent = true
lineMaterial.opacity = 0.1
const sunMaterial = new THREE.MeshBasicMaterial()
sunMaterial.map = sunTexture
const mercuryMaterial = new THREE.MeshBasicMaterial()
mercuryMaterial.map = mercuryTexture
const venusMaterial = new THREE.MeshBasicMaterial()
venusMaterial.map = venusTexture
const earthMaterial = new THREE.MeshBasicMaterial()
earthMaterial.map = earthTexture
/**
/**
 * object 
 */

const sun = new THREE.Mesh(new THREE.SphereGeometry(10,30,30), sunMaterial)
scene.add(sun)


const mercury = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), mercuryMaterial)
scene.add(mercury)

const mercuryLine = new THREE.Mesh(new THREE.TorusGeometry(20, 0.1, 5, 70), lineMaterial)
mercuryLine.rotation.x = Math.PI /2
scene.add(mercuryLine)

const venus = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), venusMaterial)
scene.add(venus)

const venusLine = new THREE.Mesh(new THREE.TorusGeometry(30, 0.1, 5, 70), lineMaterial)
venusLine.rotation.x = Math.PI /2
scene.add(venusLine)


const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30), earthMaterial)
scene.add(earth)

const earthLine = new THREE.Mesh(new THREE.TorusGeometry(40, 0.1, 5, 100), lineMaterial)
earthLine.rotation.x = Math.PI /2
scene.add(earthLine)

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000)
camera.position.z = 100
camera.position.y = 50
scene.add(camera)
/**
 * renderer
 */
const orbitControls = new OrbitControls(camera,webglCanva)
orbitControls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: webglCanva
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**animarion
 * 
 */

const clock = new THREE.Clock()
function animate() {
	const elapsedTime = clock.getElapsedTime()
	
	mercury.position.x = Math.sin(elapsedTime) * 20
	mercury.position.z = Math.cos(elapsedTime) * 20

	venus.position.x = Math.sin(elapsedTime *0.5) * 30
	venus.position.z = Math.cos(elapsedTime *0.5) * 30

	earth.position.x = Math.sin(elapsedTime *0.3) * 40
	earth.position.z = Math.cos(elapsedTime * 0.3) * 40
	
	orbitControls.update();
	renderer.render(scene, camera);
	
	window.requestAnimationFrame(animate)

}

animate()