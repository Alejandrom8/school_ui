import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';

import '../styles/Menu.css';
import Gravatar from './Gravatar';

import * as homeActions from '../../state/actions/homeActions';



function Banner({email}){
	return (
		<div className="menu__profile-container">
			<div className="photo">
				<Gravatar 
					className="circled"
					email={email}
					alt="profile-photo"
					/>
			</div>
		</div>
	)
}

function Option(props) {
	return (
		<span key={props.key}>
			<Link className="Menu__option" to={props.path}>
				{props.text}
			</Link>
		</span>
	)
}

function OptionsList(props) {
	return (
		<div className="menu__options-container">
			{ 
				props.options.map((opt, i) => (
					<Option key={i} path={opt.path} text={opt.text}/>
				))
			}
		</div>
	)
}

class Menu extends Component {

	constructor(props) {
		super(props);
		this.handleSemesterChange = this.handleSemesterChange.bind(this);
	}

	handleSemesterChange(e) {
		this.props.changeSemester(e.target.value);
	}

	renderSemesterOptions() {
		return this.props.semesters.map( s => (
			<MenuItem key={s.semesterID} value={s.semesterID}>
				<em>Semester {s.key}</em>
			</MenuItem>
		))
	}

	render() {
		return(
			<section id="menu">
				<div className="menu__container">
					<div className="logo">
						<h4>School</h4>
					</div>
					<div className="menu__options">
						<OptionsList options={[
							{path: '/home', text:'Home'},
							{path: '/', text:'Calendar'},
							{path: '/', text:'Resume'},
							{path: '/', text:'In action'}
						]}/>
					</div>
					<div className="menu__searcher">
						<div className="menu__searcher-container">
							<input className="searcher" type="text" placeholder="buscar"/>
						</div>
					</div>
					<div className="menu__semester">
						<div className="menu__semester-container">
							<FormControl className="form-control">
								<Select
									id="semester-select"
									name="key"
									value={this.props.selectedSemester.semesterID}
									onChange={this.handleSemesterChange}
									className="menu__semester-select">
									{this.renderSemesterOptions()}
								</Select>
							</FormControl>
						</div>
					</div>
					<div className="menu__profile">
						<Banner 
							email={this.props.user.email} 
						/>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (reducers) => {
	return reducers.homeReducer;
}

export default connect(mapStateToProps, homeActions)(Menu);