import React, {Component} from 'react'
import '../App.css'
import TypeMateriaal from '../Components/TypeMateriaal'
import Breedte from '../Berekeningen/Breedte'
import {connect} from 'react-redux'

var layerName = ''

class Laag extends Component{

    
    render(){

      // define layername
      if (this.props.layerdata !== undefined) {
        layerName = this.props.layerdata
      }
      else{
        layerName = 'Laag 1'
      }


        return(    
      <div>
          <div className="grid-TypeMateriaal">
            <TypeMateriaal title={layerName}></TypeMateriaal>
          </div>
          <Breedte className='grid-samenvatting'></Breedte>


          <div id="navbarLayers"></div>
          
      </div>
        )
    }

}    



const mapReduxStateToProps = reduxState => ({

  layerListdata: reduxState.layerList.layerList,
  layerdata: reduxState.layer.layer,

})

export default connect(mapReduxStateToProps)(Laag)
