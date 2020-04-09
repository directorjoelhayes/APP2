import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// React Router Import
import { Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Homepagina from './Homepagina';
import Laag from './Pages/Laag';
import Samenvatting from './Components/Samenvatting'
import Cube from './Berekeningen/Cube'

import {Provider} from 'react-redux'
import store from './redux/store'



class App extends Component{

  render(){

    return (

    <Provider store={store}>
      <div>
        <Navbar/>
          <div className="grid-container">
            <div className="grid-links">
              <Switch>
              <Route path="./" component={Homepagina}/>  
              <Route path="/Laag" component={Laag}/>
              </Switch>
            </div>
            <div className="grid-rechts">
              <img src="detail.png" alt="grafische weergave"></img>
              <Cube></Cube>
            </div>
            <div className="grid-rechts"> 
              <Samenvatting></Samenvatting>
            </div>
           
          </div>
          </div>
        
      </Provider>
    )

  }

}

export default App