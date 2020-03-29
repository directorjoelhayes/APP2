import React, { Component } from 'react';
import './Homepagina.css';
import { Link } from 'react-router-dom';


class Homepagina extends Component {

    render(){

        return(

            <div class="grid">
                <div class="container">
                    <img class='afbeelding' src={require('../src/Afbeeldingen/muur.jpg')} alt="muur"></img>
                    <div class="overflow">
                        <Link to="/Laag">
                            <button class='button'>muur</button>
                        </Link>
                    </div>
                </div>
                <div class="container">
                    <img class='afbeelding' src={require('../src/Afbeeldingen/plat dak.jpg')} alt="plat dak"></img>
                    <div class="overflow">
                        <Link to="/laag">
                            <button class='button'>plat dak</button>
                        </Link>
                    </div>
                </div>
                <div class="container">
                    <img class='afbeelding' src={require('../src/Afbeeldingen/schuin dak.jpg')} alt="schuin dak"></img>
                    <div class="overflow">
                        <Link to="/laag">
                            <button class='button'>schuin dak</button>
                        </Link>
                    </div>
                </div>
                <div class="container">
                    <img class='afbeelding' src={require('../src/Afbeeldingen/vloer.jpg')} alt="vloer"></img>
                    <div class="overflow">
                        <Link to="/laag">
                            <button class='button'>vloer</button>
                        </Link>
                    </div>
                </div>
            </div>    

        )
            
    }

}

export default Homepagina;
