import '../App.css';
import React, { Component} from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {connect} from 'react-redux'


class Cube extends Component {
  constructor(props) {
    super(props);
    this.scene = '';
    this.addCube = this.addCube.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value : '',
      cubes : [],
      color : '#ff0000',
      colorTemp : '#ff0000',
      colorModal : 'closed'
    }

 
//kubussen oplijsten
  this.listItems = (cubes) => {
    return cubes.map((cube,index) =>
  <div className='box' key={index}>{cube.name}</div>
    );
  }
}



handleChange(event) {
  this.setState({value: event.target.value});
}


//De eigenschappen van de kubus bepalen, volgens three js, colorpicker, breedte

addCube(){
  
  var layerList = this.props.layerListdata
  var myCubes = []

  // //reset scene from cubes

  this.scene = new THREE.Scene()
  var canvasWidth = document.getElementById('canvas').clientWidth;
  var camera = new THREE.PerspectiveCamera( 75, canvasWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  var light = new THREE.HemisphereLight( 0xffffff, 0x080820, .5);
  this.scene.add( light);
  var ambientLight = new THREE.AmbientLight(0xffffff, .5);
  this.scene.add( ambientLight );
  var directionalLight = new THREE.DirectionalLight( 0xffffff, .3 );
  this.scene.add( directionalLight );

  directionalLight.position.set(0,0,200);

  renderer.setSize( canvasWidth, window.innerHeight );

  //orbit-controles

  var controls = new OrbitControls( camera, renderer.domElement );

  camera.position.set( -2, 2, 6 );
  controls.update();

  // this.mount.appendChild ( renderer.domElement ); -> weg want anders dubbel 3D-view...

  camera.position.z = 150;
  var animate =() => {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( this.scene, camera );
  };
  animate();

  
//make cube for every layer
  layerList.map((layer,index)=>{
  
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshPhongMaterial({color: layer.kleur}); //color: layer.kleur -> nog toe te voegen in array
  var cube = new THREE.Mesh ( geometry, material );
  let newWidth = layer.dikte;

  cube.scale.x = newWidth;
  cube.scale.y = 100;
  cube.scale.z = 100;
  let newPosition = 0;
  if(myCubes.length > 0){
    let lastBox = myCubes.length -1;
    newPosition = myCubes[lastBox].position.x + (myCubes[lastBox].scale.x/2) + (newWidth/2);
  }

  cube.position.x = newPosition;
  cube.position.z = -2.5;
  cube.name = 'mesh_'+layer.naam;


  myCubes.push(cube)
  // console.log(myCubes)

  myCubes.map((Cube_i)=>{
    this.scene.add( Cube_i );
  })
  console.log(this.scene.children)

  // this.setState({
  //   cubes: myCubes
  // });

  // console.log(this.state.cubes)
})

}


//omgeving bepalen volgens three.js -> scene, camera, licht

componentDidMount() {

    this.scene = new THREE.Scene()
    var canvasWidth = document.getElementById('canvas').clientWidth;
    var camera = new THREE.PerspectiveCamera( 75, canvasWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    var light = new THREE.HemisphereLight( 0xffffff, 0x080820, .5);
    this.scene.add( light);
    var ambientLight = new THREE.AmbientLight(0xffffff, .5);
    this.scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, .3 );
    this.scene.add( directionalLight );

    directionalLight.position.set(0,0,200);

    renderer.setSize( canvasWidth, window.innerHeight );

    //orbit-controles

    var controls = new OrbitControls( camera, renderer.domElement );

    camera.position.set( -2, 2, 6 );
    controls.update();

    this.mount.appendChild ( renderer.domElement );

    camera.position.z = 150;
    var animate =() => {
      requestAnimationFrame( animate );
      controls.update();
      renderer.render( this.scene, camera );
    };
    animate();
}

//Hoe wordt het getoond...
render() {
 
  return (
    <div className= "container">
      <div className= "control-bar">
        <div className= "controls">
          <button onClick={()=>this.addCube()}>Update 3D-view</button>
        </div>
      </div>
      <div className="canvas" id="canvas">
        <div ref={ref => (this.mount = ref)}/>
      </div>
    </div>
  )
  

}




}

const mapReduxStateToProps = reduxState => ({

  layerListdata: reduxState.layerList.layerList,

})

export default connect(mapReduxStateToProps)(Cube);


const rootElement = document.getElementById("root");
ReactDOM.render(<Cube />, rootElement)




