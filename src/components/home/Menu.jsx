import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';

import * as API from '../../api/Api';
import {isEmpty} from '../../util/validators';
import '../styles/Menu.css';
import Gravatar from './Gravatar';

import * as homeActions from '../../state/actions/homeActions';
import {getSemesterSubjects} from '../../state/actions/subjectActions';


function ContextMenu(props) {
	const history = useHistory();

	const handleSessionClose = async () => {
		await API.Auth.logout();
		history.push('/signin');
	};

	return (
		<div className="context-menu"> 
			<div className="context-menu-option">{props.name}</div>
			<div className="divider"></div>
			<div className="context-menu-option close-session" onClick={handleSessionClose}>Cerrar sesión</div>
		</div>
	)
}

function Banner({user, handleSessionClose}) {
	const [menuVisivility, setMenuVisibility] = useState(false);
	const toggleMenu = (e) => setMenuVisibility(!menuVisivility);

	return (
		<div className="menu__profile-container">
			<div className="photo" onClick={toggleMenu}>
				<Gravatar 
					className="circled"
					email={user.email}
					alt="profile-photo"
					/>
			</div>
			{
				menuVisivility && (
					<ContextMenu name={user.name} handleSessionClose={handleSessionClose}/>
				)
			}
		</div>
	)
}

function Option(props) {
	return (
		<span>
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

function Menu(props) {
	const history = useHistory();
	if(isEmpty(props.homeReducer.user)) {
		history.push('/home');
		return;
	}

	const handleSemesterChange = async e => {
		await props.changeSemester(e.target.value);
		await props.getSemesterSubjects(e.target.value);
	}

	const renderSemesterOptions = () => {
		return props.homeReducer.semesters.map( s => (
			<MenuItem key={s.semesterID} value={s.semesterID}>
				<em>Semester {s.key}</em>
			</MenuItem>
		))
	}

	return (
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
								value={props.homeReducer.selectedSemester.semesterID}
								onChange={handleSemesterChange}
								className="menu__semester-select">
								{renderSemesterOptions()}
							</Select>
						</FormControl>
					</div>
				</div>
				<div className="menu__profile">
					<Banner 
						user={props.homeReducer.user}
					/>
				</div>
			</div>
		</section>
	);
}

const mapStateToProps = ({homeReducer, subjectReducer}) => {
	return {
		homeReducer,
		subjectReducer
	}
}

const mapDispatchToProps = {
	...homeActions,
	getSemesterSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);