import React, { Component } from 'react';
import {Link} from 'react-router-dom';

let takenColors = [];

function getRandom(limit){
	return Math.floor(Math.random() * limit);
}

function randomColor(){
	let colors = ['red', 'orange', 'yellow', 'mango', 'maize', 'pistachio', 'zomp', 'cadet', 'queen', 'blue'];
	let index, isTaken;

	do{
		index = getRandom(colors.length);
		isTaken = takenColors.some(taken => taken === index);
	}while(isTaken);

	takenColors.push(index);

	return colors[index];
}

function Subject(props){
	return(
		<div className={`subject-container ${props.color}-card`}>
			<div className="subject">
				<span>{props.name}</span>
			</div>
		</div>
	);
}

class SubjectsBar extends Component {
	subjectsAsSubject(){
		let subjects = this.props.subjects;

		return subjects.map( sub => {
			let color = randomColor();
			return (
				<li key={sub.clave}>
					<Link to={`/semester/${this.props.semester}/subject/${sub.clave}`}>
						<Subject name={sub.nombre} color={color}/>
					</Link>
				</li>
			);
		});
	}

	render(){
		return(
			<section className="side-section">
				<header className="ss-h">
					<h5>Materias</h5>
				</header>
				<ul className="subject-list">
				{ this.subjectsAsSubject() }
				</ul>
			</section>
		);
	}
}

export default SubjectsBar;