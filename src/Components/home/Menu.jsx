import React, {Component} from 'react';

import '../styles/Menu.css';
import { Link } from 'react-router-dom';

class Menu extends Component {
	signOut(){
		alert('You are sign out');
	}

	render(){
		return(
			<nav id="menu" role="navigation" className="blue darken-2">
				<div>
					<span>menu</span>
				</div>
				<div className="rightSection">
					<ul>
						<li key="home">
							<Link to="/home">home</Link>
						</li>
					</ul>
					<button onClick={this.signOut} className="btn signout">salir</button>
				</div>
			</nav>
		);
	}
}

export default Menu;