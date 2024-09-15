
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {Timer} from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import {Sky} from 'three/addons/objects/Sky.js'

const gui = new GUI()


const canvas =  document.querySelector("canvas.webgl");
const div_3d = document.querySelector(".object-3d");

//sizes
const sizes = {
    width: div_3d.clientWidth,
    height: div_3d.clientHeight,
}
const aspectRatio = div_3d.clientWidth/div_3d.clientHeight;


//scene
const scene = new THREE.Scene()


// Textures
const textureLoader = new THREE.TextureLoader()

//Floor texture
const floorAlphaTexture = textureLoader.load('./textures/floor/alpha.webp')
const floorColorTexture = textureLoader.load('./textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textureLoader.load('./textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./textures/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


// Wall
const wallColorTexture = textureLoader.load('./textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textureLoader.load('./textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./textures/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace


// Roof
const roofColorTexture = textureLoader.load('./textures/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./textures/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// Bush
const bushColorTexture = textureLoader.load('./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textureLoader.load('./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./textures/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping



// Grave
const graveColorTexture = textureLoader.load('./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./textures/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)


// Door
const doorColorTexture = textureLoader.load('./textures/door/color.webp')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.webp')
const doorHeightTexture = textureLoader.load('./textures/door/height.webp')
const doorNormalTexture = textureLoader.load('./textures/door/normal.webp')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// //sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1,32,32),
//     new THREE.MeshStandardMaterial() );
// scene.add(sphere)

//Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20, 100, 100), 
    new THREE.MeshStandardMaterial({
    alphaMap:floorAlphaTexture,
    transparent:true,
    map:floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias:-0.2,
}))

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

scene.add(floor)
floor.material.side =0

floor.rotation.x = -Math.PI *0.5    

//House group
const houseGroup = new THREE.Group()
scene.add(houseGroup)

//house Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture    
    }),
)
walls.position.y=(2.5/2)
houseGroup.add(walls)

//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI *0.25
houseGroup.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    }),
)
door.position.set(0,1.1,2.001)
houseGroup.add(door)

//Bushes

const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color:'#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial)
bush1.position.set(0.8,0.2,2.2)
bush1.scale.setScalar(0.5)
bush1.rotation.x = - 0.75


const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
bush2.position.set(1.4,0.1,2.1)
bush2.scale.setScalar(0.25)
bush2.rotation.x = - 0.75


const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
bush3.position.set(-0.8,0.1,2.2)
bush3.scale.setScalar(0.4)
bush3.rotation.x = - 0.75


const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
bush4.position.set(-1,0.05,2.6)
bush4.scale.setScalar(0.15)
bush4.rotation.x = - 0.75

houseGroup.add(bush1,bush2,bush3,bush4)

//Graves
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0 ; i<30 ;i++){

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() *4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius


    const grave = new THREE.Mesh(graveGeometry,graveMaterial)   
grave.position.x =x
grave.position.y = Math.random() *0.4
grave.position.z = z
grave.rotation.x = (Math.random() -0.5) * 0.4
grave.rotation.y = (Math.random() -0.5) * 0.4
grave.rotation.z = (Math.random() -0.5) * 0.4

    graves.add(grave)
}


/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)  

//Fog
scene.fog = new THREE.FogExp2('#04343f',0.1)



//camera
const camera = new THREE.PerspectiveCamera(75,aspectRatio)
scene.add(camera)
camera.position.z =10
camera.position.y =2

//ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);

// Adjust rotation speed if needed
controls.enableDamping = true;


// Restrict vertical rotation (so it only rotates horizontally)
controls.minPolarAngle = Math.PI /8;
controls.maxPolarAngle = Math.PI /2.2;

//Lightings
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3,2,-8)
scene.add(directionalLight)

const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.3, 2.5)
houseGroup.add(doorLight)

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)   


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    antialias:true,
})

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type= THREE.PCFSoftShadowMap

directionalLight.castShadow = true

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children)
    {
        grave.castShadow = true
        grave.receiveShadow = true
    }
    



// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20    


ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

//Resizing 

window.addEventListener('resize' ,function(){

    camera.aspect = div_3d.clientWidth/div_3d.clientHeight
    renderer.setSize(div_3d.clientWidth,div_3d.clientHeight)
    camera.updateProjectionMatrix()
    
})


// Clock
const timer = new Timer();


//Render Loop
const tick = () => {
 timer.update()
 const elapsedTime = timer.getElapsed()
 const ghost1Angle = elapsedTime * 0.5
 ghost1.position.x =Math.cos(ghost1Angle) * 4
 ghost1.position.z =Math.sin(ghost1Angle) * 4
 ghost1.position.y =Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

 const ghost2Angle = -elapsedTime * 0.38 
 ghost2.position.x =Math.cos(ghost2Angle) * 5
 ghost2.position.z =Math.sin(ghost2Angle) * 5
 ghost2.position.y =Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

 const ghost3Angle = -elapsedTime * 0.23 
 ghost3.position.x =Math.cos(ghost3Angle) * 6
 ghost3.position.z =Math.sin(ghost3Angle) * 6
 ghost3.position.y =Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.453)

controls.update()
  // parentGroup.rotation.y += delta * 1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();