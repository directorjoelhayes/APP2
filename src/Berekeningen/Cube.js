import React, { Component, Children } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PhotoshopPicker } from 'react-color'
import './Cube.css'
import {connect} from 'react-redux'

var myArray = ['str', 'iso', 'afw']
var testingMyCubes = [];
var scene = '';
var myCubes = [];

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
    this.listItems = (cubes) => {
      return cubes.map((cube,index) =>
        <div className="box" key={index}>{cube.name}</div>
      );
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleColorModalOpen = () => {
    if(this.state.colorModal === 'closed'){
      this.setState({colorModal: 'open', colorTemp : this.state.color});
      } else { 
        this.setState({colorModal: 'closed'});
      }
  }

  handleChangeComplete = (color) => {
    this.setState({color: color.hex});
  }

  handleAccept = () => {
    this.setState({colorModal: 'closed'});
  }

  handleCancel = () => {
    this.setState({
      colorModal: 'closed',
      color : this.state.colorTemp
    });
  }


  addCube(){
    
    var layerList = this.props.layerListdata
    var myCubes = []

    //reset scene from cubes
    this.scene = '';
    this.scene = new THREE.Scene();
    var canvasWidth = document.getElementById('canvas').clientWidth;
    var camera = new THREE.PerspectiveCamera( 75, canvasWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    var light = new THREE.HemisphereLight( 0xffffff, 0x080820, .5 );
    this.scene.add( light );
    var ambientLight = new THREE.AmbientLight( 0xffffff, .5 );
    this.scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, .3 );
    this.scene.add( directionalLight );

    directionalLight.position.set(0,0,200);

    renderer.setSize( canvasWidth, window.innerHeight );
    
    //orbit-controls

    var controls = new OrbitControls( camera, renderer.domElement );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( -2, 2, 6 );
    controls.update();

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );

    camera.position.z = 150;
    var animate = () => {
      requestAnimationFrame( animate );
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render( this.scene, camera );
    };
    animate();

    layerList.map((layer, index) =>{
 
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshPhongMaterial( { color: '#ff5000' } );
    var cube = new THREE.Mesh( geometry, material );
    let newWidth = layer.dikte
 
    cube.scale.x = newWidth;
    cube.scale.y = 100;
    cube.scale.z = 100;
    let newPosition = 0;
    if(this.state.cubes.length > 0){
      let lastBox = this.state.cubes.length -1;
      newPosition = this.state.cubes[lastBox].position.x + (this.state.cubes[lastBox].scale.x/2) + (newWidth/2);
    }

    cube.position.x = newPosition;
    cube.position.z = -2.5;
    cube.name = 'mesh_' + (this.state.cubes.length + 1);
    this.scene.add( cube );

    myCubes.push(cube)
    myCubes.map((Cube_i) =>{
      this.scene.add( Cube_i)
    })
    })
  }


  render() {
    return (
      <div className="container">
        <div className="control-bar">
          <div className="controls">
            {this.listItems(this.state.cubes)}
            <div className={'color-picker-modal ' + this.state.colorModal}>
              <PhotoshopPicker
              color={ this.state.color}
              onChangeComplete= {this.handleChangeComplete}
              onAccept={this.handleAccept}
              onCancel={this.handleCancel}/>
            </div>
            <div
              className="colorPicker"
              style={{backgroundColor: this.state.color}}
              onClick= {this.handleColorModalOpen}/>

            <button onClick={this.addCube}>Update 3D-view</button>
          </div>
        </div>
        <div className="canvas" id="canvas">
          <div ref={ref => (this.mount = ref)} />
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
ReactDOM.render(<Cube />, rootElement);
