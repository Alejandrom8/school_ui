import React, { Component } from 'react';
import {Link} from 'react-router-dom';

let takenColors = [];

function getRandom(limit){
	return Math.floor(Math.random() * limit);
}

function randomColor(){
	let colors = [
		{color: '#000000', font: '#fff'},
		{color: '#FF0400', font: '#444'},
		{color: '#FF7300', font: '#fff'},
		{color: '#FFEA00', font: '#444'},
		{color: '#5EFF00', font: '#444'},
		{color: '#00FFCC', font: '#444'},
		{color: '#0019FF', font: '#fff'},
		{color: '#BF00FF', font: '#444'},
		{color: '#FF00BF', font: '#444'},
	];
	let index, isTaken;

	do{
		index = getRandom(colors.length);
		isTaken = takenColors.some( i => i === index);
	}while(isTaken);

	takenColors.push(index);

	return colors[index];
}

function Subject(props){
	return(
		<Link to={`/subject/${props.id}`} className="subject">
			<span>{props.name}</span>
		</Link>
	);
}

class SubjectsBar extends Component {
	subjectsAsSubject(){
		let subjects = this.props.subjects;
		return subjects.map( sub => {
			let {color, font} = randomColor();
			return (
				<li key={sub.clave} className="subject-li" style={{borderBottom:`1px solid ${color}`, color:font}}>
					<Subject name={sub.nombre} id={sub.clave}/>
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