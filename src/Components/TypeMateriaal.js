import React, {Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {choseMType, identifyUser} from '../redux/actions/userAction';
import {Dropdown} from 'react-bootstrap'
//import DropdownItem from 'react-bootstrap/DropdownItem';
import {getLambda} from '../redux/actions/userAction'

import {saveLayerList} from '../redux/actions/userAction';

export function settingRadioDefault(checkStructuur, checkIsolatie, checkAfwerking){
  document.getElementById("structuur").checked = checkStructuur
  document.getElementById("isolatie").checked = checkIsolatie
  document.getElementById("afwerking").checked = checkAfwerking
}


var dataLink='';

//default layerindex op eerste laag zetten
var layerIndex = 0


class TypeMateriaal extends Component{

  constructor(props){
    super(props);
    this.state = {
      selected:'',
      mList: [{materiaal: ''}],
      currentSelection: 'please select a material type first',
      currentLambda: '',
    }
  }





  dispatchSelectedMaterial = (element) => {
    this.setState({currentSelection: element.materiaal, currentLambda: `The thermal value \u03BB of this material is: ${element.lambda} W/mK`})
    console.log(element.materiaal)

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

    //2.set material and lambda of current layer
      layerList[layerIndex].materiaal = element.materiaal
      layerList[layerIndex].lambda = element.lambda

    //3.save in layerlist
      this.props.saveLayerList(layerList)
      console.log('updated layerList is:',layerList)
  }


  componentDidMount() {
    this.saveFunction()
  }


    render(){
        let myOptions = this.state.mList.map((element, i) => {
            return <Dropdown.Item onSelect={() => this.dispatchSelectedMaterial(element)} key={i}>{element.materiaal}</Dropdown.Item>
          })

        // this.props.getLambda(this.state.currentLambda)

        return(    

        <div>
        <h2>{this.props.title}</h2>



        <p>Select a category</p>
        <form>
          <div className="radio">
            <input id="structuur" type="radio" name="optradio" onClick={() => this.selection1()}></input>
            <label> Structuur </label> 
          </div>
          <div className="radio">
            <input id="isolatie" type="radio" name="optradio"onClick={() => this.selection2()}></input>
            <label> Isolatie </label>
          </div>
          <div className="radio">
            <input id="afwerking" type="radio" name="optradio"onClick={() => this.selection3()}></input> 
            <label> Afwerkingslaag </label>
          </div>
        </form>




        <p>Select a material</p>
        <Dropdown className="dropdown">
          <Dropdown.Toggle id="dropdown-basic">
            {this.state.currentSelection}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {myOptions}
          </Dropdown.Menu>
        </Dropdown>
        <p>{this.state.currentLambda}</p>

      </div>
        )
    }

    selection1(){
      //get typedata
        dataLink = "https://api.myjson.com/bins/13ry0y";
        this.setState({selected: dataLink});
        this.props.choseMType(dataLink)
        this.getData(dataLink)



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

      //2.set type of current layer
        layerList[layerIndex].type = 'structuur'

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)
          
        
      console.log('Fetching data...')
      }



    selection2(){
      //get typedata
        dataLink = "https://api.myjson.com/bins/ow3wi"
        this.setState({selected: dataLink});
        this.props.choseMType(dataLink)
        this.getData(dataLink)

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

      //2.set type of current layer
        layerList[layerIndex].type = 'isolatie'

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)


      console.log('Fetching data...')
     
    }

    selection3(){
      //get typedata
        dataLink = "https://api.myjson.com/bins/jj7gi"
        this.setState({selected: dataLink});
        this.props.choseMType(dataLink)
        this.getData(dataLink)

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

      //2.set type of current layer
        layerList[layerIndex].type = 'afwerking'

      //3.save in layerlist
        this.props.saveLayerList(layerList)
        console.log('updated layerList is:',layerList)

      
      console.log('Fetching data...')
    }




    getData = async (url) => {
      this.setState({currentSelection: 'Getting data from server... please wait'})

      const response = await fetch(url) ;
      const data= await response.json();

      const totalList = [];
      data.forEach((element) => {
        totalList.push(element) 
      })

      if (this.state.options !== totalList) {
        this.setState({mList: totalList, currentSelection: 'please select a material from the list', currentLambda: ''});
      }
      console.log('Data fetched!')
    }  



    saveFunction(){
      let setStateFromOutside = ()=> {

        //set current layerindex
        var layerList = this.props.layerListdata
        var currentLayerId = this.props.layerdata
        function searchElement(list){
          return list.naam === currentLayerId
        }
        if (layerList.indexOf(layerList.find(searchElement))!==-1) {
          layerIndex = layerList.indexOf(layerList.find(searchElement))
        }

        //change dropdown value based on current layermaterial
        if(layerList[layerIndex].materiaal!==undefined){
          this.setState({currentSelection: layerList[layerIndex].materiaal,currentLambda:`The thermal value \u03BB of this material is: ${layerList[layerIndex].lambda} W/mK`})
        }
        else{
          this.setState({currentSelection: 'please select a material type first'})
        }
  
        
      }
        this.props.getLambda(setStateFromOutside)

        
    }

}   

// this.props.user = ...
const mapReduxStateToProps = reduxState => ({
    // userdata: reduxState.user.message,
    //typedata: reduxState.type.chosen,
    lambdadata: reduxState.lambda.result,

    layerListdata: reduxState.layerList.layerList,
    layerdata: reduxState.layer.layer,

})

export default connect(mapReduxStateToProps, {identifyUser, choseMType, getLambda,saveLayerList})(TypeMateriaal)



