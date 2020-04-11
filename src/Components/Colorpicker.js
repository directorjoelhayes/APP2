import '../App.css';
import React, { Component } from 'react';
import {PhotoshopPicker} from 'react-color';
import {saveLayerList} from '../redux/actions/userAction';
import {connect} from 'react-redux'
import {getLambda} from '../redux/actions/userAction';


var layerIndex = 0


class Colorpicker extends Component {
  constructor(props) {
    super(props);
    this.scene = '';
    this.state = {
      cubes : [],
      color : '#FFFFFF',
      colorTemp : '#FFFFFF',
      colorModal : 'closed'
    }


}

componentDidMount(){
  this.saveFunction()
}

//color-picker -> open en dicht, basiskleur
  handleColorModalOpen = () => {
    if(this.state.colorModal === 'closed') {
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


      //set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
        return list.naam === currentLayerId
      }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
        layerIndex = layerList.indexOf(layerList.find(searchElement))
      }

      //set layer color
      console.log(this.state.color)
      layerList[layerIndex].kleur = this.state.color


      //save in layerlist
      this.props.saveLayerList(layerList)
      console.log('updated layerList is:',layerList)
    }





    handleCancel = () => {
      this.setState ({
        colorModal: 'closed',
        color : this.state.colorTemp
      });
    }






    saveFunction(){
      let setStateFromOutside = ()=> {
        this.asyncFunction() 
      }
          this.props.getLambda(setStateFromOutside)
    }

    asyncFunction = async () => {

      const waiting = await 'waiting'
    
      //set current layerindex
      var layerList = this.props.layerListdata
      var currentLayerId = this.props.layerdata
      function searchElement(list){
        return list.naam === currentLayerId
      }
      if (layerList.indexOf(layerList.find(searchElement))!==-1) {
        layerIndex = layerList.indexOf(layerList.find(searchElement))
      }
  
      //set colorpicker on right color
      this.setState({
        color : layerList[layerIndex].kleur,
        colorTemp : layerList[layerIndex].kleur}); 
    
    }








//Hoe wordt het getoond...
render() {
 
  return (
    <div className= "container">
      <div className= "control-bar">
        <div className= "controls">
        
        <div className={'color-picker-modal ' + this.state.colorModal }>
            
        {/* pop-up vester */}
            <PhotoshopPicker
                color= {this.state.color}
                onChangeComplete = {this.handleChangeComplete}
                onAccept = {this.handleAccept}
                onCancel = {this.handleCancel}/>

        </div>

        {/* bol met kleur */}
        <div className = "colorPicker"
          style = {{backgroundColor: this.state.color}}
          onClick = {this.handleColorModalOpen}/>
        
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

  lambdadata: reduxState.lambda.result,

  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer

})

export default connect(mapReduxStateToProps, {saveLayerList, getLambda})(Colorpicker);





