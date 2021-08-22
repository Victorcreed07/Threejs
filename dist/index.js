import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Load
const texture = new THREE.TextureLoader()
const normal = texture.load('/textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5,64,64);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness=0.8
material.roughness=0.2
material.normalMap=normal

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const light1 = gui.addFolder('Light 1')
const light2 = gui.addFolder('Light 2')

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight2.position.set(-2.15,2.19,0)
pointLight2.intensity=10
scene.add(pointLight2)
light1.add(pointLight2.position,'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position,'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
light1.add(pointLight2,'intensity').min(0).max(10).step(0.01)

// const helper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(helper)

//Light 3
const pointLight3 = new THREE.PointLight(0xca05f5, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight3.position.set(1.2,-0.79,0.11)
pointLight3.intensity=10
scene.add(pointLight3)
light2.add(pointLight3.position,'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position,'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position,'z').min(-3).max(3).step(0.01)
light2.add(pointLight3,'intensity').min(0).max(10).step(0.01)

const colorr={
    color: 0xff0000
}
light2.addColor(colorr,'color').onChange(()=>{
    pointLight3.color.set(colorr.color)
})

// const helper1 = new THREE.PointLightHelper(pointLight3,1)
// scene.add(helper1)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
 document.addEventListener('mousemove',dosome)
 let mousex=0;
 let mousey=0;

let targetx=0;
let targety=0;


const windowx = window.innerWidth/2;
const windowy = window.innerHeight/2;

function dosome(event){
    mousex=(event.clientX-windowx)
    mousey=(event.clientY-windowy)
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetx = mousex*0.001
    targety = mousey*0.001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += .5 * (targetx-sphere.rotation.y)
    sphere.rotation.x += .5 * (targety-sphere.rotation.x)
    sphere.rotation.z += .5 * (targety-sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()