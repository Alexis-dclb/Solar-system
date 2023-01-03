import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AxesHelper, CubeTextureLoader, LoadingManager, Material, PointLight, TextureLoader } from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * gui
 */

const gui = new dat.GUI()


/**
 * helper
 */
const axesHelper = new AxesHelper(2)
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
const moonTexture = textureLoader.load('/textures/solar-system/moon.jpg')
const marsTexture = textureLoader.load('/textures/solar-system/mars.jpg')
const jupiterTexture = textureLoader.load('/textures/solar-system/jupiter.jpg')
const saturnTexture = textureLoader.load('/textures/solar-system/saturn.jpg')
const uranusTexture = textureLoader.load('/textures/solar-system/uranus.jpg')
const neptuneTexture = textureLoader.load('/textures/solar-system/neptune.jpg')
const saturnRingAlpha = textureLoader.load('/textures/solar-system/saturn_ring_alpha.png')

const star = cubeTextureLoader.load([
	'textures/solar-system/env/px.jpg',
	'textures/solar-system/env/nx.jpg',
	'textures/solar-system/env/py.jpg',
	'textures/solar-system/env/ny.jpg',
	'textures/solar-system/env/pz.jpg',
	'textures/solar-system/env/nz.jpg',
])
/** 
 * scene 
*/
const scene = new THREE.Scene()
scene.background = star
/* scene.add(axesHelper)
 */
 /***
  * Material
  */
const lineMaterial = new THREE.MeshBasicMaterial()
lineMaterial.transparent = true
lineMaterial.opacity = 0.1
const sunMaterial = new THREE.MeshBasicMaterial()
sunMaterial.map = sunTexture
const mercuryMaterial = new THREE.MeshStandardMaterial()
mercuryMaterial.map = mercuryTexture
const venusMaterial = new THREE.MeshStandardMaterial()
venusMaterial.map = venusTexture
const earthMaterial = new THREE.MeshStandardMaterial()
earthMaterial.map = earthTexture
const moonMaterial = new THREE.MeshStandardMaterial()
moonMaterial.map = moonTexture
const marsMaterial = new THREE.MeshStandardMaterial()
marsMaterial.map = marsTexture
const jupiterMaterial = new THREE.MeshStandardMaterial()
jupiterMaterial.map = jupiterTexture
const saturnMaterial = new THREE.MeshStandardMaterial()
saturnMaterial.map = saturnTexture
const saturnRingMaterial = new THREE.MeshStandardMaterial()
saturnRingMaterial.transparent = true
saturnRingMaterial.side = THREE.DoubleSide
saturnRingMaterial.alphaMap = saturnRingAlpha
const uranusMaterial = new THREE.MeshStandardMaterial()
uranusMaterial.map = uranusTexture
const neptuneMaterial = new THREE.MeshStandardMaterial()
neptuneMaterial.map = neptuneTexture
/**
 * light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

const pointLight = new THREE.PointLight( 0xffffff,2)
scene.add(pointLight, ambientLight)
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

earth.addEventListener('click', () => {
	console.log("zz");
})

const earthLine = new THREE.Mesh(new THREE.TorusGeometry(40, 0.1, 5, 100), lineMaterial)
earthLine.rotation.x = Math.PI /2
scene.add(earthLine)


const moon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 30, 30), moonMaterial)
scene.add(moon)

const mars = new THREE.Mesh(new THREE.SphereGeometry(0.9, 30, 30), marsMaterial)
scene.add(mars)

const marsLine = new THREE.Mesh(new THREE.TorusGeometry(50, 0.1, 5, 100), lineMaterial)
marsLine.rotation.x = Math.PI /2
scene.add(marsLine)

const jupiter = new THREE.Mesh(new THREE.SphereGeometry(4, 30, 30), jupiterMaterial)
scene.add(jupiter)

const jupiterLine = new THREE.Mesh(new THREE.TorusGeometry(60, 0.1, 5, 100), lineMaterial)
jupiterLine.rotation.x = Math.PI /2
scene.add(jupiterLine) 
	
const saturn = new THREE.Mesh(new THREE.SphereGeometry(3, 30, 30), saturnMaterial)
scene.add(saturn)

const saturnRingGeometry = new THREE.RingBufferGeometry(3, 5, 64);
var pos = saturnRingGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
	v3.fromBufferAttribute(pos, i);
	saturnRingGeometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
}
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial)
scene.add(saturnRing)

const saturnLine = new THREE.Mesh(new THREE.TorusGeometry(70, 0.1, 5, 100), lineMaterial)
saturnLine.rotation.x = Math.PI /2
scene.add(saturnLine)

const uranus = new THREE.Mesh(new THREE.SphereGeometry(2, 30, 30), uranusMaterial)
scene.add(uranus)

const uranusLine = new THREE.Mesh(new THREE.TorusGeometry(80, 0.1, 5, 100), lineMaterial)
uranusLine.rotation.x = Math.PI /2
scene.add(uranusLine) 

const neptune = new THREE.Mesh(new THREE.SphereGeometry(2, 30, 30), neptuneMaterial)
scene.add(neptune)

const neptuneLine = new THREE.Mesh(new THREE.TorusGeometry(90, 0.1, 5, 100), lineMaterial)
neptuneLine.rotation.x = Math.PI /2
scene.add(neptuneLine) 
/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000)
camera.position.z = 150
camera.position.y = 80
scene.add(camera)
/**
 * renderer
 */
const orbitControls = new OrbitControls(camera,webglCanva)
orbitControls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: webglCanva
})

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**animarion
 * 
 */

const terre_days = 365
const terre_tour = {
	seconde :1

}
gui.add(terre_tour,"seconde").min(0).max(5)



const clock = new THREE.Clock()
function animate() {
	
	const ratio_mercure = (terre_days/88) * terre_tour.seconde
	const ratio_venus = (terre_days/243) * terre_tour.seconde
	const ratio_terre = terre_tour.seconde
	const ratio_mars = (terre_days/687) * terre_tour.seconde
	const ratio_jupiter = (terre_days / (12*365)) * terre_tour.seconde
	const ratio_saturn = (terre_days / (29.5*365)) * terre_tour.seconde
	const ratio_uranus = (terre_days/(84*365)) * terre_tour.seconde
	const ratio_neptune = (terre_days/(165*365)) * terre_tour.seconde

	
	const elapsedTime = clock.getElapsedTime()
	
	mercury.position.x = Math.sin(elapsedTime * ratio_mercure) * 20
	mercury.position.z = Math.cos(elapsedTime * ratio_mercure) * 20

	venus.position.x = Math.sin(elapsedTime * ratio_venus) * 30
	venus.position.z = Math.cos(elapsedTime * ratio_venus) * 30

	earth.position.x = Math.sin(elapsedTime * ratio_terre) * 40
	earth.position.z = Math.cos(elapsedTime * ratio_terre) * 40
	
	moon.position.set(earth.position.x + Math.sin(elapsedTime *10) *2, earth.position.y, earth.position.z + Math.cos(elapsedTime *10 ) *2)
	
	mars.position.x = Math.sin(elapsedTime * ratio_mars) * 50
	mars.position.z = Math.cos(elapsedTime * ratio_mars) * 50

	jupiter.position.x = Math.sin(elapsedTime * ratio_jupiter) * 60
	jupiter.position.z = Math.cos(elapsedTime * ratio_jupiter) * 60

	saturn.position.x = Math.sin(elapsedTime * ratio_saturn) * 70
	saturn.position.z = Math.cos(elapsedTime * ratio_saturn) * 70
	
	saturnRing.position.set(saturn.position.x, saturn.position.y, saturn.position.z)
	saturnRing.rotation.x = Math.PI * 0.5
	saturnRing.rotation.y = Math.PI * 0.1

	uranus.position.x = Math.sin(elapsedTime * ratio_uranus) * 80
	uranus.position.z = Math.cos(elapsedTime * ratio_uranus) * 80
	
	neptune.position.x = Math.sin(elapsedTime * ratio_neptune) * 90
	neptune.position.z = Math.cos(elapsedTime * ratio_neptune) * 90
	
	orbitControls.update();
	renderer.render(scene, camera);
	
	window.requestAnimationFrame(animate)

}

animate()