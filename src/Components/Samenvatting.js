import React, { Component } from 'react';
import {connect} from 'react-redux'
import {updateU} from '../redux/actions/userAction'

var textOutput = ''
var valueOutput = ''
var unitOutput =''



class Samenvatting extends Component {
  constructor(){
    super();
    this.state = {UvalueElement: ''}
  }


  componentDidMount() {
    this.saveFunction()
  }


  render(){

    //R-waardes halen uit Uwaardes van layerlist
   var layerList = this.props.layerListdata

    var rWaardes = layerList.map(function(layer){
      return 1/ layer.UWaarde;
      })

    //R van overgangscoëfficiënten
    rWaardes.push(0.13,0.04)

    //Verwijder NaN
    var rWaardesNumbers = rWaardes.filter(Boolean)

    // Uwaarde totaal
    var totalU = 1 / rWaardesNumbers.reduce((a, b) => a + b)

    if (totalU === 1/0.17) {
      textOutput = 'Define your layer properties to see the overall U-value'
      valueOutput = ''
      unitOutput ='' 
      
    } else {
      textOutput ='The total u-value is '
      valueOutput =  totalU.toFixed
      unitOutput = ' W/m\xB2K'
    } 





    return(
      <div>
        <div>{textOutput}{valueOutput}{unitOutput}</div>
      </div>

      
    )
  }


  //function to update global u-value as soon as new thickness of material is given
  saveFunction(){
    let setStateFromOutside = ()=> {
      this.setState({UvalueElement:valueOutput}); 
    }

    this.props.updateU(setStateFromOutside)
  }


  
}



const mapReduxStateToProps = reduxState => ({
  // userdata: reduxState.user.message,
  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,
  updaterdata: reduxState.update.update,
  

})

export default connect(mapReduxStateToProps,{updateU})(Samenvatting)
