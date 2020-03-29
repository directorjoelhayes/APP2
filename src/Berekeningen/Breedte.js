import React, { Component } from 'react';

import '../App.css'
import {connect} from 'react-redux'
import {saveLayerList} from '../redux/actions/userAction';


export function settingInputDefault(width){
  document.getElementById("Breedte").value = width
}


var layerIndex = 0

class Uwaarde extends Component{
    constructor(){
        super();
        this.state = {
          Uwaarde:'',
          currentSelection:'',
        };
      }


      render(){


          return(

              <div className="breedteberekening">
                  <p>Suggest a width [cm]</p>
                  <div className="breedteinput">
                    <input id="Breedte" type="number" step = "1">
                    </input>
                    <button  onClick={() => this.Uwaarde()}>
                      Confirm
                    </button>
                  </div>
                  <p>Thermal performance: {this.state.Uwaarde}</p>
              </div>
          )
      }


      Uwaarde(){

      //steps for changing layer properties
      //1.set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
        return list.naam === currentLayerId
      }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
       layerIndex = layerList.indexOf(layerList.find(searchElement))
      }

      //2.calculate U-value
        var a = parseInt(document.getElementById("Breedte").value); 
        var b = layerList[layerIndex].lambda ;
        var UwaardeBerekening = b / a * 100;
        var answer = UwaardeBerekening + " W/m\xB2K"
        console.log(answer); 
        this.setState({Uwaarde: answer}) 

      //2.set material and lambda of current layer
        layerList[layerIndex].dikte = parseInt(document.getElementById("Breedte").value)
        layerList[layerIndex].UWaarde = UwaardeBerekening

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)


      //Update global U-value
        this.props.updaterdata()
    }


}





// this.props.user = ...
const mapReduxStateToProps = reduxState => ({
    // lambdadata: reduxState.lambda.result,
    // userdata: reduxState.user.message,

    updaterdata: reduxState.update.update,

    layerListdata: reduxState.layerList.layerList,
    layerdata: reduxState.layer.layer
  })




export default connect(mapReduxStateToProps,{saveLayerList})(Uwaarde);


