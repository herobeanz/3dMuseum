import * as THREE from 'https://cdn.skypack.dev/three@0.136.0'
import {FPSController} from "../modules/FPSController.mjs"
import {WEBGL} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/WebGL';
import {ColladaLoader} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/ColladaLoader.js"
import { PLYLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/PLYLoader.js"
import { GUI } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/lil-gui.module.min.js"
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";


if (!WEBGL.isWebGLAvailable()) {
	const warning = WEBGL.getWebGLErrorMessage();
	document.body.appendChild(warning);
}

//obj
let obj1, obj2, dae;

// ---------- Loaders ----------
const texturesLoader1 = new THREE.TextureLoader();
const texturesLoader2 = new THREE.TextureLoader();
const colladaLoader = new ColladaLoader();
let point1, point2, point3, point4, point5, point6, point7, point8;
const container = document.getElementById("container");

// ---------- Renderer ---------- 
const renderer = new THREE.WebGLRenderer({antialiasing: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setClearColor(0xFFFFCC, 1.0);
renderer.clear();

container.appendChild(renderer.domElement);

// ---------- Camera ---------- 
let fov = 85;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-92, 8, 0);
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(0,0,0);

// ---------- Control ---------- 
const control = new FPSController(camera, renderer.domElement);
control.setLookHeight(8.0);
control.setMoveSpeed(20.0);

// ---------- Scene ---------- 
const scene = new THREE.Scene();
	
let directionaLight = new THREE.DirectionalLight(0xffff99, 1.0);
directionaLight.position.set(50, 200, 30);


directionaLight.castShadow = false;
directionaLight.shadow.mapSize.width = 2048;
directionaLight.shadow.mapSize.height = 2048;
const distance = 200;
directionaLight.shadow.camera.left = -distance;
directionaLight.shadow.camera.right = distance;
directionaLight.shadow.camera.top = distance;
directionaLight.shadow.camera.bottom = -distance;			
directionaLight.shadow.camera.near = 0.5;
directionaLight.shadow.camera.far = 500;
directionaLight.shadow.bias = 0.0005;
scene.add(directionaLight);
	

//san nha
const floorTexture = texturesLoader1.load("./textures/floor.jpg")
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 10, 5 );
const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(200, 100, 200, 100);
floorGeometry.rotateX(- Math.PI / 2);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
scene.add(floor);

//tham trai
const rugTexture =  texturesLoader2.load("./textures/tham-do.jpg")
rugTexture.wrapS = THREE.RepeatWrapping;
rugTexture.wrapT = THREE.RepeatWrapping;
rugTexture.repeat.set( 10, 5 );
const rugMaterial1 = new THREE.MeshPhongMaterial({ map: rugTexture });
const rugMaterial = new THREE.MeshPhongMaterial(0xFF0000);
const rugGeometry = new THREE.BoxGeometry(180, 1, 15, 20,20,20);
const planeGeometryRug = new THREE.PlaneGeometry(180,10);
const planeRug = new THREE.Mesh(planeGeometryRug, rugMaterial1 )
planeRug.rotateX(- Math.PI / 2);
planeRug.position.y = 1
const rug = new THREE.Mesh(rugGeometry, rugMaterial);
rug.receiveShadow = true;
scene.add(rug);
scene.add(planeRug);

// loader
// Lucy Statue
new PLYLoader().load( './models/Lucy100k.ply', function ( geometry ) {

    geometry.scale( 0.01, 0.01, 0.01 );
    geometry.computeVertexNormals();
    const material = new THREE.MeshLambertMaterial();
    const mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.y =  Math.PI / 2;
    mesh.position.y = 8;
    mesh.position.x = -50;
    mesh.position.z = 30;
    mesh.rotateY(-Math.PI/2);
    mesh.castShadow = true;
    mesh.name = "Tượng thiên thần cầm đuốc";
    mesh.receiveShadow = true;
    objects = [...objects, mesh];
    scene.add( mesh );

} );

let gltfLoader1 = new GLTFLoader();
let gltfLoader2 = new GLTFLoader();
let gltfLoader3 = new GLTFLoader();
 
//Cua ra vao
gltfLoader1.load('/models/door/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    gltf.scene.position.set(-59.7 ,6,-1);
    gltf.scene.scale.set(4, 2, 3);
    gltf.scene.rotateY(Math.PI/2);
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;                 
    },
//function(){
    //console.log(scene.children);                
//},
function(xhr){
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
    console.log( 'An error happened' );
}
)
 
//Discobolus Statue
gltfLoader2.load('/models/discobolus/scene.gltf', function(gltf2){
    obj1 = gltf2.scene;
    //const mesh1 = scene.children[ 3 ];
    obj1.name =gltf2.scene.getObjectByName("Tuong Discobolus");
    obj1.position.set(50 ,0.15,-30);
    obj1.scale.set(8, 8, 8);
    obj1.rotateY(Math.PI);
    obj1.castShadow = true;
    obj1.name = "Discobolus";
    obj1.receiveShadow = true;
    objects = [...objects, obj1]
    scene.add( obj1 );
},
function(xhr){
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
    console.log( 'An error happened' );
}
)

//Venus de milo Statue
gltfLoader3.load('/models/venus/scene.gltf', function(gltf3){
    obj2 = gltf3.scene;
    obj2.position.set(-50 ,0.98, -30);
    obj2.scale.set(7,7,7);
    obj2.castShadow = true;
    obj2.name = "Venus de Milo";
    obj2.receiveShadow = true;
    objects = [...objects, obj2];
    scene.add( obj2);      
},
function(xhr){
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
    console.log( 'An error happened' );
}
)

//Victoria Statue
const victoriaMaterial = new THREE.MeshLambertMaterial({color: 0xdddddd});
colladaLoader.load("./models/victoire.dae",
    function(collada) {
        dae = collada.scene.children[0];
        dae.material = victoriaMaterial;
        dae.rotateZ(Math.PI/2);
        dae.rotateX(Math.PI);
        dae.scale.set(0.8, 0.8, 0.8);
        dae.position.set(50, -0.4, 30);
        dae.castShadow = true;
        dae.name = "Tượng thần chiến thắng Samothrace";
        dae.receiveShadow = true;
        objects = [...objects, dae]
        scene.add(dae); 
    },
    // onProgress callback
    function (xhr) {
        console.log('Loading in progress...');
    },
    // onError callback
    function(err) {
        console.log('An error happened');
    }
);

// Den trong phong
const loadLamp1 = new GLTFLoader()
loadLamp1.load( './models/victorian_street_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point1 = new THREE.PointLight(0xFFFFFF);
    point1.position.set(4,15,-15);
    point1.intensity = 0;
    scene.add(point1)
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 15;
    lamp.position.x = 3.5;
    lamp.position.z = -15;
    lamp.rotateY(Math.PI/2);
	lamp.rotateX(Math.PI);
    scene.add(lamp)
    
} );

const loadLamp2 = new GLTFLoader()
loadLamp2.load( './models/victorian_street_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point2 = new THREE.PointLight(0xFFFFFF);
    point2.position.set(4,15,15);
    point2.intensity = 0;
    scene.add(point2)
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 15;
    lamp.position.x = 3.5;
    lamp.position.z = 15;
    lamp.rotateY(Math.PI/2);
	lamp.rotateX(Math.PI);
    scene.add(lamp)
    
} );


const loadLamp3 = new GLTFLoader()
loadLamp3.load( './models/victorian_street_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point3 = new THREE.PointLight(0xFFFFFF);
    point3.position.set(-4,15,15);
    point3.intensity = 0;
    scene.add(point3);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 15;
    lamp.position.x = -3.5;
    lamp.position.z = 15;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const loadLamp4 = new GLTFLoader()
loadLamp4.load( './models/victorian_street_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point4 = new THREE.PointLight(0xFFFFFF);
    point4.position.set(-4,15,-15);
    point4.intensity = 0;
    scene.add(point4);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 15;
    lamp.position.x = -3.5;
    lamp.position.z = -15;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const loadLamp5 = new GLTFLoader()
loadLamp5.load( './models/chinese_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point5 = new THREE.PointLight(0xFFFFFF);
    point5.position.set(-40,5,-6);
    point5.intensity = 0;
    scene.add(point5);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 1;
    lamp.position.x = -40;
    lamp.position.z = -6;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const loadLamp6 = new GLTFLoader()
loadLamp6.load( './models/chinese_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point6 = new THREE.PointLight(0xFFFFFF);
    point6.position.set(-40,5,6);
    point6.intensity = 0;
    scene.add(point6);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 1;
    lamp.position.x = -40;
    lamp.position.z = 6;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const loadLamp7 = new GLTFLoader()
loadLamp7.load( './models/chinese_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point7 = new THREE.PointLight(0xFFFFFF);
    point7.position.set(60,5,-6);
    point7.intensity = 0;
    scene.add(point7);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 1;
    lamp.position.x = 60;
    lamp.position.z = -6;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const loadLamp8 = new GLTFLoader()
loadLamp8.load( './models/chinese_lamp.glb', function ( gltf )
{
    let lamp = gltf.scene;
    point8 = new THREE.PointLight(0xFFFFFF);
    point8.position.set(60,5,6);
    point8.intensity = 0;
    scene.add(point8);
    lamp.scale.set( 1, 1, 1);
    lamp.position.y = 1;
    lamp.position.x = 60;
    lamp.position.z = 6;
    lamp.rotateY(Math.PI/2);
    scene.add(lamp)
    
} );

const geometry = new THREE.PlaneGeometry( 1000, 1000 );
const material = new THREE.MeshLambertMaterial( { color: 0x808080 } );
const mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 8, 0, -0.5 );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
//scene.add( mesh );

// ---------- Walls and middle boxs ----------

let walls = []

const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const wallsOffsets = [50, 100, 30]
const wallsGeometries = [
    new THREE.BoxBufferGeometry(200, 20, 1),  // North & South
    new THREE.BoxBufferGeometry(1, 20, 100), // East & West
    new THREE.BoxBufferGeometry(5, 20, 40), // Middle
]

wallsOffsets.forEach((boundary, i) => {
    const axis = i === 1 ? 'x' : 'z';
    const geometry = wallsGeometries[i];
    wallsGeometries.forEach((geom, j) => {
        const wall = new THREE.Mesh(geometry, wallMaterial);
        wall.name = "wall"
        wall.position[axis] = j === 0 ? boundary : -boundary;
        wall.position.y = 10;
        wall.castShadow = true;
        wall.receiveShadow = true;
        walls = [...walls, wall]
        scene.add(wall);
    })
})

// GUI
let gui = new GUI();

				let params = new function() {
					
					this.directionaLightActive = true,
                    this.intenDir = 0.3;
                    this.Intensity_front_room = 0;
                    this.Intensity_behind_room = 0;
                    this.intenPoint5 = 0;
                    this.intenPoint6 = 0;
                    this.intenPoint7 = 0;
                    this.intenPoint8 = 0;
					
				};

                gui.add( params, "directionaLightActive", true,false ) ;
				gui.add( params, "intenDir", 0,1 ).onChange( function (e ) {
                    directionaLight.intensity = e;
				} );

				gui.add( params, "Intensity_front_room",0,1 ).onChange( function (e) {

					point1.intensity = e;
                    point2.intensity = e;
                    point5.intensity = e;
                    point6.intensity = e;

				} );

				gui.add( params, "Intensity_behind_room", 0, 1 ).onChange( function (e) {

					point3.intensity = e;
                    point4.intensity = e;
                    point7.intensity = e;
                    point8.intensity = e;

				} );


				gui.open();

			


window.addEventListener( 'resize', onWindowResize );
// 4 buc o giua
const boxsGeometries = [new THREE.BoxBufferGeometry(20, 3, 5), new THREE.BoxBufferGeometry(8, 2, 8)]
const boxsOffset = 50;
boxsGeometries.forEach((geometry, i) => {
    const box1 = new THREE.Mesh(geometry, wallMaterial);
    box1.name = "wall"
    box1.position.set(!i ? -boxsOffset : boxsOffset, 0, 30)
    walls = [...walls, box1]
    scene.add(box1)
})

boxsGeometries.forEach((geometry, i) => {
    const box2 = new THREE.Mesh(geometry, wallMaterial);
    box2.name = "wall"
    box2.position.set(!i ? -boxsOffset : boxsOffset, 0, -30)
    walls = [...walls, box2]
    scene.add(box2)
})

// Mai bao tang

const skyGeometry = new THREE.SphereGeometry(78, 20, 10, 0, Math.PI*2, 0, Math.PI/2);
skyGeometry.scale(1.8, 0.5, 1);
skyGeometry.translate(0, 8, 0);
const edgesGeom = new THREE.WireframeGeometry(skyGeometry); // or WireframeGeometry
const wireframeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, linewidth: 2 });
const skySphere = new THREE.LineSegments(edgesGeom, wireframeMaterial);
scene.add(skySphere);

// ---------- Objects ----------

let objects = [];

// ---------- Paintings ----------

const pictures = [
    {
        name: "Bowl of Fruit, Violin and Bottle (1914) - Pablo Picasso",
        url: "./textures/paintings/Bowl of Fruit, Violin and Bottle (1914).jpg"
    },
    {
        name: "femme au chapeau jaune jacqueline - Pablo Picasso",
        url: "./textures/paintings/femme-au-chapeau-jaune-jacqueline-9.jpg"
    }
    
    
]
const pic1 = [
    {
        name1: "The Young Ladies of Avignon - Pablo Picasso",
        url1: "./textures/paintings/picasso_demoiselles.jpg"
    }
    ,
    {
        name1: "The Weeping Woman Tate - Pablo Picasso",
        url1: "./textures/paintings/Picasso_The_Weeping_Woman_Tate.jpg"
    }
       
]
const pic2 = [
    {
        name2: "The Old Guitarist - Pablo Picasso",
        url2: "./textures/paintings/The Old Guitarist.jpg"
    }
    ,
    {
        name2: "Three musicians - Pablo Picasso",
        url2: "./textures/paintings/three-musicians.jpg"
    }
       
]

const pic3 = [
    {
        name3: "Guemica (1937) - Pablo Picasso",
        url3: "./textures/paintings/1937-Guemica.jpg"
    }
    ,
    {
        name3: "The Blue Room - Pablo Picasso",
        url3: "./textures/paintings/TheBlueRoom.jpg"
    }
       
]

const pic4 = [
    {
        name4: "The Birth of Venus - Sandro Botticelli",
        url4: "./textures/paintings/Sự ra đời của vệ nữ.jpg"
    }
    ,
    {
        name4: "The School of Athens - Raffaello",
        url4: "./textures/paintings/Truong hoc o Athens.jfif"
    }
       
]

const pic5 = [
    {
        name5: "The Annunciation - Leonardo Da Vinci",
        url5: "./textures/paintings/The_Annunciation.jpg"
    }
    ,
    {
        name5: "Mars and Venus - Sandro Botticelli",
        url5: "./textures/paintings/Marѕ and Venuѕ – Sandro Bottiᴄelli.jfif"
    }
       
]

const pic6 = [
    {
        name6: "The Last Super - Leonardo Da Vinci",
        url6: "./textures/paintings/Bữa tiệc cuối cùng.jpg"
    }
    ,
    {
        name6: "The Last Judgment - Michelangelo",
        url6: "./textures/paintings/Michelangelo-Gia toc thanh.jpeg"
    }
       
]

const pic7 = [
    {
        name7: "The Virgin and Child with Saint Anne - Leonardo Da Vinci",
        url7: "./textures/paintings/Đức mẹ và chúa hài đồng.jpg"
    }
    ,
    {
        name7: "Sleeping Venus - Giorgione",
        url7: "./textures/paintings/Sleeping Venus.jfif"
    }
       
]

const pic8 = [
    {
        name8: "Primavera - Sandro Botticelli",
        url8: "./textures/paintings/Primavera.jfif"
    }
    ,
    {
        name8: "Virgin of the Rocks - Leonardo Da Vinci",
        url8: "./textures/paintings/Virgin of the Rocks.jfif"
    }
       
]


const pic9 = [
    {
        name9: "Mona Lisa - Leonardo Da Vinci",
        url9: "./textures/paintings/Mona Lisa.jfif"
    }
    ,
    {
        name9: "Wedding at Cana - Paolo Veronese",
        url9: "./textures/paintings/Tiec cuoi o Cana.jpg"
    }
       
]

const pic10 = [
    {
        name10: "Portraiit of Gertrude Stein - Pablo Picasso",
        url10: "./textures/paintings/Portraiit of Gertrude Stein.jfif"
    }
    ,
    {
        name10: "Woman Ironing - Pablo Picasso",
        url10: "./textures/paintings/Woman Ironing.jfif"
    }
       
]

const pic11 = [
    {
        name11: "The Martyrdom of St. Sebastian - Joachim Wtewael",
        url11: "/textures/paintings/The Martуrdom of St. Sebaѕtian – Joaᴄhim Wteᴡael.avif"
    }
    ,
    {
        name11: "Vitruvian Man - Leonardo Da Vinci",
        url11: "./textures/paintings/Nguoi_Vitruvius.jpg"
    }
       
]

const pic12 = [
    {
        name12: "Pesaro Madonna - Tiziano Vecelli",
        url12: "./textures/paintings/Pesaro Madonna.jpg"
    }
    ,
    {
        name12: "Diana and Actaeon - Tiziano Vecelli",
        url12: "./textures/paintings/Diana and Aᴄtaeon – Tiᴢiano Veᴄelli.jpg"
    }
       
]


pic9.forEach(({name9, url9}, i) => {
    const painting = createPainting(url9);
    painting.position.set(99, 10, !i ? 9 : -9); //x , y, z
    painting.rotateY(Math.PI/2);
    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name9
    objects = [...objects, painting];
    
})


pic8.forEach(({name8, url8}, i) => {
    const painting = createPainting(url8);
    painting.position.set(99, 7, !i ? 25 : -25); //x , y
    painting.rotateY(Math.PI/2);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name8
    objects = [...objects, painting];
})


pic7.forEach(({name7, url7}, i) => {
    const painting = createPainting(url7);
    painting.position.set(99, 10, !i ? 38 : -38); //x , y
    painting.rotateY(Math.PI/2);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name7
    objects = [...objects, painting];
})

//2 ben phong trong

pic12.forEach(({name12, url12}, i) => {
    const painting = createPainting(url12);
    painting.position.set(85, 10, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name12
    objects = [...objects, painting];
})

pic11.forEach(({name11, url11}, i) => {
    const painting = createPainting(url11);
    painting.position.set(63, 7, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name11
    objects = [...objects, painting];
})

pic5.forEach(({name5, url5}, i) => {
    const painting = createPainting(url5);
    painting.position.set(20, 7, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name5
    objects = [...objects, painting];
})


pic6.forEach(({name6, url6}, i) => {
    const painting = createPainting(url6);
    painting.position.set(43, 10, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name6
    objects = [...objects, painting];
})

//tuong mat sau
pic4.forEach(({name4, url4}, i) => {
    const painting = createPainting(url4);
    painting.position.set(3, 10, !i ? 35 : -35); //x , y
    //painting.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
    painting.rotateY(Math.PI/2 + Math.PI);
    painting.rotateX(0);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name4
    objects = [...objects, painting];
})
//tuong mat truoc
pic3.forEach(({name3, url3}, i) => {
    const painting = createPainting(url3);
    painting.position.set(-3, 10, !i ? 35 : -35); //x , y
    //painting.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
    painting.rotateY(Math.PI/2);
    painting.rotateX(0);
    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name3
    objects = [...objects, painting];
})
//
//phong dau tien 2 ben
pic10.forEach(({name10, url10}, i) => {
    const painting = createPainting(url10);
    painting.position.set(-27, 7, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name10
    objects = [...objects, painting];
})

pic2.forEach(({name2, url2}, i) => {
    const painting = createPainting(url2);
    painting.position.set(-67, 7, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name2
    objects = [...objects, painting];
})

pic1.forEach(({name1, url1}, i) => {
    const painting = createPainting(url1);
    painting.position.set(-87, 10, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name1
    objects = [...objects, painting];
})


pictures.forEach(({name, url}, i) => {
    const painting = createPainting(url);
    painting.position.set(-47, 10, !i ? 49 : -49); //x , y
    i && painting.rotateY(Math.PI);

    painting.castShadow = true;
    painting.receiveShadow = true;
    painting.name = name
    objects = [...objects, painting];
})

// ---------- Raycasters ----------
//Raycasting được sử dụng để chọn chuột (tìm ra đối tượng nào trong không gian 3d mà chuột đi qua) trong số những thứ khác.
const clickRaycaster = new THREE.Raycaster();
let intersects = [];
let mouseNDC = new THREE.Vector2();
let mouse = new THREE.Vector2();
let intersectedObject = null

// ---------- Popup ----------
const popUp = document.createElement("div");
popUp.id = "popUp";
popUp.style.position = "absolute";
let positionPopupProjected = new THREE.Vector3(); // khai bao popup
let positionPopup = new THREE.Vector3(); //vi tri pop
let popUpX = 0;
let popUpY = 0;
// ---------- Loop ----------

let clock = new THREE.Clock();
let clock1 = new THREE.Clock();
function render() {
    //requestAnimationFrame(render);

    //light
    directionaLight.visible = params.directionaLightActive;
    control.collisions(walls, scene)
    control.update(clock.getDelta());
	let state = calculatePopUpPosition(camera);
    updatePopUpPosition(state);
    const delta = clock1.getDelta();

				if ( obj1 !== undefined && dae !== undefined ) {

					obj1.rotation.y += delta * 0.5;
                    dae.rotation.z += delta * 0.5;

				}
    window.requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// ---------- Events ----------

window.addEventListener("resize", onWindowResize, false);

window.addEventListener("keyup", (e) => {
    if(e.key === "f") toggleFullScreen();
})

window.addEventListener("contextmenu", raycastClick);

// ---------- Functions ----------
// phong to
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

//ham tao tranh
function createPainting(fileName) {
	const paintingMat = new THREE.MeshPhongMaterial({color: 0xaaaaaa});

	const paintingGeom = new THREE.BoxGeometry(10, 10, 0.5);

	const materials = Array(7).fill(paintingMat)
	
	const painting = new THREE.Mesh(paintingGeom, materials);

	painting.castShadow = true;
	painting.receiveShadow = true;
	scene.add(painting);
    //load texture vao tranh

	new THREE.TextureLoader()
		.load(fileName,
			function(tex) {
			
				let aspectRatio = tex.image.width/tex.image.height;
	
				materials[5] = new THREE.MeshPhongMaterial({map: tex});

				painting.scale.set(aspectRatio, 1.0, 1.0);
				painting.material[5].needsUpdate = true;
		
				renderer.render(scene, camera);
			});

	return painting;
}
//click victoria
function raycastClick(event){
    event.preventDefault();
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	mouseNDC.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseNDC.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    clickRaycaster.setFromCamera( mouseNDC, camera );
    intersects = clickRaycaster.intersectObjects(objects);

    if(!intersects.length || intersects[0].object.id === intersectedObject?.id){
        if(!intersectedObject) return
        intersectedObject = null;
        togglePopup(false)
        return;
    }

    intersectedObject = intersects[0].object;
    positionPopup = intersects[0].point;   
    let state = calculatePopUpPosition(camera)
    togglePopup(state)
}
//tao popup
function togglePopup(state) {
    if(!state){
        if(document.getElementById("popUp")) document.body.removeChild(popUp)
        return
    }
    popUp.innerHTML = intersectedObject.name
    popUp.style.top = popUpY+"px"
    popUp.style.left = popUpX+"px"
    document.body.append(popUp)
}
//tinh vi tri dat pop
function calculatePopUpPosition(camera){
    positionPopupProjected.copy(positionPopup);
    positionPopupProjected.project(camera);
    if ((positionPopupProjected.x > -1 && positionPopupProjected.x < 1) &&
        (positionPopupProjected.y > -1 && positionPopupProjected.y < 1)) {

        popUpX = Math.floor((positionPopupProjected.x + 1) * 0.5 * window.innerWidth);
        popUpY = Math.floor(-(positionPopupProjected.y - 1) * 0.5 * window.innerHeight);
        return true;
    }else{
        return false;
    }
}
//cap nhat pop
function updatePopUpPosition(state){
    if(!document.getElementById("popUp")) return
    popUp.style.top = popUpY+"px"
    popUp.style.left = popUpX+"px"
    if(!state) popUp.style.display = "none"
    else popUp.style.display = "block"
}






