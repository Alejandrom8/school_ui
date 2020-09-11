import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/SubjectsBar.css';


function Subject(props) {
	return(
		<div className="subject-container" style={{backgroundColor:props.color}}>
			<div className="subject">
				<span>{props.name}</span>
			</div>
		</div>
	);
}

class SubjectsBar extends Component {

	subjectsAsSubject() {
		let subjects = this.props.subjects;

		return subjects.map( sub => (
			<li key={sub.subjectID}>
				<Link to={`/subject/${sub.subjectID}`}>
					<Subject name={sub.name} color={sub.color}/>
				</Link>
			</li>
		));
	}

	render() {
		if(!this.props.subjects.length) return "";
		
		return(
			<section className="side-section">
				<div className="SubjectsBar">
					<h5>Materias</h5>
					<ul className="subject-list">
					{ this.subjectsAsSubject() }
					</ul>
				</div>
			</section>
		);
	}
}

export default SubjectsBar;