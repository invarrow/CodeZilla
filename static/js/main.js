const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

//const physicsWorld =  new CANNON.World({
//    gravity: new CANNON.Vec3(0,-9.82,0)
//});
//const groundBody = new CANNON.Body({
//    type: CANNON.Body.STATIC,
//    shape : new CANNON.Plane(),
//});
//groundBody.quaternion.setFromEuler(-Math.PI/2,0,0);
//physicsWorld.addBody(groundBody);
//
//const radius  = 1;
//const sphereBody = new CANNON.Body({
//    mass: 5,
//    shape: new CANNON.Sphere(radius),
//});

const rad= 150;
async function fetchBlob() {
    let blobray =[];
    let response = await fetch("http://127.0.0.1:1234/data");
    let data = await response.json();
    for(let i=4;i<data.length;i++){
        let index = i-4;
        var lat = data[i][0],
            lon = data[i][1];
        var phi = (90-lat)*(Math.PI/180),
            theta = (lon+180)*(Math.PI/180),
            x = -((rad) * Math.sin(phi)*Math.cos(theta)),
            z = ((rad) * Math.sin(phi)*Math.sin(theta)),
            y = ((rad) * Math.cos(phi));
        blobray.push(new THREE.Mesh(new THREE.SphereGeometry(5, 5, 5), new THREE.MeshLambertMaterial({color:0xff0000})));
        blobray[index].position.set(x,y,z);
        scene.add(blobray[index]);
    }
}
fetchBlob();

//return new THREE.Vector3(x,y,z);
//sphereBody.position.set(0,7,0);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
function Wheel(){
    const wheel = new THREE.Mesh(
        new THREE.BoxGeometry(12,12,33),
        new THREE.MeshLambertMaterial({color:0x333333})
    );
    return wheel
}
function Car(){
    const car = new THREE.Group();
    const backWheel = Wheel();
    car.add(backWheel);

    const frontWheel = Wheel();
    car.add(frontWheel);
    frontWheel.position.x = 40;

    const carLBody = new THREE.Mesh(
        new THREE.BoxGeometry(55,16,25),
        new THREE.MeshLambertMaterial({color:0xc52323})
    );
    carLBody.position.y = 2;
    carLBody.position.x = 20;
    car.add(carLBody);

    const carUBody = new THREE.Mesh(
        new THREE.BoxGeometry(30,15,24),
        new THREE.MeshLambertMaterial({color:0xffffff})
    );
    carUBody.position.y = 12;
    carUBody.position.x = 15;
    car.add(carUBody);

    car.position.y = 155;
    car.position.x=-80;
    return car
}

const sGeo = new THREE.SphereGeometry(rad,rad,rad);
const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("http://127.0.0.1:1234/src/imgs/moonmap"),
    bumpMap : new THREE.TextureLoader().load("http://127.0.0.1:1234/src/imgs/dMap")
    ,bumpScale:1
});
const edges = new THREE.EdgesGeometry(sGeo);
const wireframe = new THREE.WireframeGeometry(sGeo);
const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({color:0xffffff}));


const sphere = new THREE.Mesh(sGeo,material);

const ambientLight = new THREE.AmbientLight(0x6acfff,0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(18,50,50);
scene.add(directionalLight);

const car = Car();
scene.add(car);
scene.add(sphere);
//scene.add(line);
camera.position.set(200,200,200);
camera.lookAt(0,0,0);


function animate(){
    requestAnimationFrame(animate);
    //rotate sphere with x+=1 and y+=
    //sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;
    line.rotation.y+=0.01;
    line.rotation.x+=0.01;
    controls.update();

    renderer.render(scene,camera);
//    physicsWorld.fixedStep();
//    window.requestAnimationFrame(animate);
}
animate();
