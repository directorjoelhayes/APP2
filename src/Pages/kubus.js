import './kubus.css';
import React, { Component } from 'react'
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {PhotoshopPicker} from 'react-color'

class kubus extends Component {
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

//deel voor color-picker -> open en dicht, basiskleur
  handleColorModalOpen = () => {
    if(this.state.colorModal == 'closed') {
      this.setState({colorModal: 'open', colorTemp : this.state.color});
    } else {
      this.setState({colorModal: 'closed'})
    }
  }

    handleChangeComplete = (color) => {
      this.setState({ color: color.hex });
    }

    handleAccept = () => {
      this.setState({colorModal: 'closed'});
    }

    handleCancel = () => {
      this.setState ({
        colorModal: 'closed',
        color : this.state.colorTemp
      });
    }

//De eigenschappen van de kubus bepalen, volgens three js, colorpicker, breedte
addCube(args){

  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshPhongMaterial({color: this.state.color});
  var cube = new THREE.Mesh ( geometry, material );
  let newWidth = parseFloat(this.state.value)
  this.setState({
    value : ''
  });

  cube.scale.x = newWidth;
  cube.scale.y = 100;
  cube.scale.z = 100;
  let newPosition = 0;
  if(this.state.cubes.length > 0){
    let lastBox = this.state.cubes.length -1;
    newPosition = this.state.cubes [lastBox].position.x + (this.state.cubes[lastBox].scale.x/2) + (newWidth/2);
  }

  cube.position.x = newPosition;
  cube.position.z = -2.5;
  cube.name = 'kubus_' + (this.state.cubes.length + 1);
  this.scene.add( cube );

  this.setState({
    cubes: this.state.cubes.concat( cube )
  });
}

//omgeving bepalen volgens three.js -> scene, camera, licht

componentDidMount() {

    this.scene = new THREE.Scene
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
          {this.listItems(this.state.cubes)}
          <div className={'color-picker-modal ' + this.state.colorModal }>
            <PhotoshopPicker
            color= {this.state.color}
            onChangeComplete = {this.handleChangeComplete}
            onAccept = {this.handleAccept}
            onCancel = {this.handleCancel} />
          </div>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <div className = "colorPicker"
          style = {{backgroundColor: this.state.color}}
          onClick = {this.handleColorModalOpen}/>
          <button onClick={this.addCube}>Add cube</button>
        </div>
      </div>
      <div className="canvas" id="canvas">
        <div ref={ref => (this.mount = ref)}/>
      </div>
    </div>
  )
}
}

export default kubus;
