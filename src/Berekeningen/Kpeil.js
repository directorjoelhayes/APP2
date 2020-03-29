import React, { Component } from 'react';
import {connect} from 'react-redux'

class Kpeil extends Component{
    constructor(){
        super();
        this.state = {Kpeil:''};
      }

      render(){

        console.log('the lambda-value is', this.props.lambdadata)

          return(
              <div className="greydiv">
                  <p>Voer de breedte [cm] van het materiaal in.</p>
                    <input id="Breedte" type="text"></input>
                    <button onClick={() => this.Uwaarde()}>Calculate</button>
                    <p>Output: {this.state.Uwaarde}</p>
              </div>
          )
      }
      Kpeil(){
        var a = 40 ; 
        var b = this.props.lambdadata;
        var KpeilBerekening = b / a * 100;
        var answer = "De benodigde breedte is " + KpeilBerekening + " cm"
        console.log(answer); 
        this.setState({Kpeil: answer}) 
    }
}





// this.props.user = ...
const mapReduxStateToProps = reduxState => ({
    lambdadata: reduxState.lambda.result
  })



export default connect(mapReduxStateToProps)(Kpeil);