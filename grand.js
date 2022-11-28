
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,2000);
let x=0,y=0 ,x2 =0;
let widthscreen=window.innerWidth , heightscreen= window.innerHeight;
camera.position.set( 0, 0, 5);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.querySelector("#Ar_content").addEventListener("touchmove",f);
function f(ev){
    var touch = ev.touches[0];
    x=touch.clientX;
    y=touch.clientY;
    if(ev.touches.length){
    var touch2 =ev.touches[1];
    x2=touch.clientX;}
}
document.querySelector("#Ar_content").appendChild( renderer.domElement );
var ArToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
});
ArToolkitSource.init(function(){
setTimeout(function(){
ArToolkitSource.onResizeElement();
ArToolkitSource.copyElementSizeTo(renderer.domElement);
},2000)
});

var ArToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'camera_para.dat',
    detectionMode: 'color_and_matrix',
});
ArToolkitContext.init(function(){
camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix())
});

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext,camera,{
    type:'pattern',
    patternUrl: 'pattern-d.patt',
    changeMatrixMode:'cameraTransformMatrix'
});

window.addEventListener('resize',function(){
    var width =window.innerWidth;
    var height =window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.updateProjectionMatrix;
});

scene.visible = false;
const light =new THREE.HemisphereLight(0xffffff ,0xbbbbff,5);
    scene.add(light);
var root ;
const gltfLoader = new THREE.GLTFLoader();
const url = 'Assets/grend.gltf';
gltfLoader.load(url, (gltf) => {
 root= gltf.scene;
  scene.add(root);
});
/*
const geometry = new THREE.CubeGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial( { 
    transparent:true ,
    opacity: 0.5,
    side: THREE.DoubleSide
} );
const cube = new THREE.Mesh( geometry, material );
cube.position.y = geometry.parameters.height /2;
scene.add( cube );*/

function animate() {
    requestAnimationFrame( animate );
   if(root){ 
    root.rotation.z=0;
    root.rotation.y=root.rotation.y+0.01;
    root.rotation.x=-90;
    console.log(root.position.x, root.position.y);
    root.position.z=y/heightscreen;
    root.position.x=x/widthscreen;
    root.position.y=x2/widthscreen;
    }
    renderer.render( scene, camera );
    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visible= camera.visible;
};

animate();