import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render(){
        return(
            <nav id="menu" role="navigation" className="blue darken-2">
                <div className="nav-wrapper container">
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                    </ul>
                    <ul id="nav-mobile" className="sidenav">
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                    </ul>
                    <p data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></p>
                </div>
            </nav>
        ); 
    }
}

export default Menu;