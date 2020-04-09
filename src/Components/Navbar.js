import React, {Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import Layer from '../Pages/classLaag'
import {connect} from 'react-redux'
import {saveLayerList, saveCurrentLayer, saveDelete} from '../redux/actions/userAction';
import {settingRadioDefault} from '../Components/TypeMateriaal';
import {settingInputDefault} from '../Berekeningen/Breedte';
import {getLambda} from '../redux/actions/userAction';

var optieStructuur = false
var optieIsolatie = false
var optieAfwerking = false

var newIndex = ''

var layerList = [new Layer("Layer 1")];
var currentLayerId= ''
var layerIndex = 0


class Navbar extends Component{

  constructor(){
    super();
    this.state = {allLayers: layerList, deleteLayer: ''}
    this.selectLayer = this.selectLayer.bind(this)
  }

  componentDidUpdate(){this.props.materialdata()}
  componentDidMount(){this.saveFunction()}

  render(){

    //redux -> save first list
    this.props.saveLayerList(layerList)

    console.log("The new layerlist is",layerList);
    


    //function for displaying layers
    var namesList = layerList.map((layer) => {
      // return <li className="nav-item"><Link to="/laag" className="nav-link" onClick={() => layer.selectLayer()}>{layer.naam}</Link></li>;
      return <li className="nav-item"><Link to="/laag" className="nav-link" onClick={() => this.selectLayer(layer)} onDoubleClick={()=> this.changeName(layer)}>{layer.naam}</Link><span className="tooltiptext">Double click to change name</span></li>;
      })


    return (

      <nav className="navbar navbar-expand-lg navbar-dark">
        
        <Link className="navhome" to="/" >Home</Link>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span>
            <i className= "fas fa-bars" style= {{ color: '#000' }}></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <div>{namesList}</div>

            <li onClick={()=>this.addLayer()} className="nav-item">
              <Link className="nav-link" to="/laag">+</Link>
              <span className="tooltiptext">Add layer</span>
            </li>

          </ul>
        </div>
    
      </nav>
    )
  }


  selectLayer(layerObject) {
    console.log(
      `Current layername: ${layerObject.naam},`,
      `Current layertype: ${layerObject.type},`,
      `Current layermaterial: ${layerObject.materiaal},`,
      `Current layers lambda value': ${layerObject.lambda},`,
      `Current layers thickness: ${layerObject.dikte},`,
      `Current layers u-value: ${layerObject.UWaarde}`
  )

  // save clicked layer as current layer
    this.props.saveCurrentLayer(layerObject.naam)
    
    currentLayerId = layerObject.naam
    function searchElement(list){
      return list.naam === currentLayerId
    }
    var layerIndex = layerList.indexOf(layerList.find(searchElement))

    //automatisch huidige type aanduiden  
    if(layerList[layerIndex].type !== undefined){
      if(layerList[layerIndex].type==="structuur"){
        optieStructuur = true
        optieIsolatie = false
        optieAfwerking = false
      }

      if(layerList[layerIndex].type==="isolatie"){
        optieStructuur = false
        optieIsolatie = true
        optieAfwerking = false
      }

      if(layerList[layerIndex].type==="afwerking"){
        optieStructuur = false
        optieIsolatie = false
        optieAfwerking = true
      }
    }

    else{
      optieStructuur = false
      optieIsolatie = false
      optieAfwerking = false
    }

    settingRadioDefault(optieStructuur,optieIsolatie,optieAfwerking)


    //automatisch huidige breedte aanduiden
    if(layerList[layerIndex].dikte!==undefined){
      settingInputDefault(layerList[layerIndex].dikte)
    }else{
      settingInputDefault('')
    }
  }


//change layer name
  changeName(layerObject){
    var oldName = layerObject.naam
    var newName= prompt("New name of your layer", oldName)

    if(newName!==null){
      function nameExists(list){
        return list.naam === newName
      }

      function searchElement(list){
        return list.naam === oldName
      }


      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
        if (layerList.indexOf(layerList.find(nameExists))===-1) {
          layerIndex = layerList.indexOf(layerList.find(searchElement))
          layerList[layerIndex].naam = newName
        
          this.props.saveLayerList(layerList)
          console.log('updated layerList is:',layerList)
          this.props.saveCurrentLayer(newName)
        } else {
          alert('Please use a unique layer name')
        }
      }
    }
  }







  addLayer(){
    function exampleNameExist(list) {
      return list.naam === "Layer" + number
    }

    function nameExists(list){
      return list.naam === givenName
    }

    //add layer
    var number = layerList.length + 1

  
    if (layerList.indexOf(layerList.find(exampleNameExist))===-1){
      var exampleName = "Layer" + number
    }else{
      number = layerList.length + 2
      var exampleName = "Layer" + number
    }

    var givenName= prompt("Name of your new layer", exampleName)
    if (givenName!==null) {
      if (layerList.indexOf(layerList.find(nameExists))===-1) {
        layerList.push(new Layer(givenName));
      } else {
        alert('Please use a unique layer name')
      }
      
    console.log("The new layerlist is",layerList);
    this.setState({allLayers:layerList}); 
    }
        //redux -> save new list +  set new layer as curent layer
        this.props.saveLayerList(layerList)
        this.props.saveCurrentLayer(givenName)
    
        //default: geen type aangeduid
        settingRadioDefault(false,false,false);
      }
    saveFunction(){
      let deleteLayer= ()=>{
        var layerList = this.props.layerListdata
        var currentLayerId = this.props.layerListdata
        function searchElement(list) {
          return list.naam === currentLayerId
        }
        if (layerList.indexOf(layerList.find(searchElement))!==-1){
          layerIndex = layerList.indexOf(layerList.find(searchElement))

          if (layerList.length!==1){
            layerList.splice(layerIndex,1);
          }

          if (layerIndex !==0){
            newIndex = layerIndex -1
          } else {
            newIndex = [newIndex]
          }

          this.props.saveCurrentLayer(layerIndex[newIndex].naam)

          currentLayerId = layerList[newIndex].naam
          function searchElement(list){
            return list.naam === currentLayerId
          }

          var layerIndex = layerList.indexOf(layerList.find(searchElement))

          //automatic current type
          if (layerList[layerIndex].type !== undefined){
            if(layerList[layerIndex].type==="structuur"){
              optieStructuur = true
              optieIsolatie = false
              optieAfwerking = false
            }

            if(layerList[layerIndex].type==="isolatie"){
              optieStructuur = false
              optieIsolatie = true
              optieAfwerking = false
            }

            if(layerList[layerIndex].type==="isolatie"){
              optieStructuur = false
              optieIsolatie = false
              optieAfwerking = true
            }
          }
          else{
              optieStructuur = false
              optieIsolatie = false
              optieAfwerking = false
            }
            settingRadioDefault(optieStructuur,optieIsolatie,optieAfwerking)

            if(layerList[layerIndex].dikte!==undefined){
              settingInputDefault(layerList[layerIndex].dikte)
            } else {
              settingInputDefault('')
            }

            this.props.saveLayerList(layerList)
            this.setState({deleteLayer:'done'})
          }
        }


        this.props.saveDelete(deleteLayer)
    }
    
}

//export default Navbar;

const mapReduxStateToProps = reduxState => ({

  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,
  lambdadata: reduxState.lambda.result,
  materialdata: reduxState.material.material,
  deletedata: reduxState.delete.delete

})

export default connect(mapReduxStateToProps, {saveLayerList,saveCurrentLayer, getLambda, saveDelete})(Navbar)


