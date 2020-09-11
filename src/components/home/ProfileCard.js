import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';

import Modal from './Modal';
import SemesterContainer from '../containers/SemesterContainer';
import Loading from '../Loading';

import '../styles/Profile.css';

export default function ProfileCard(props) {

    const [modalIsShowing, setModalIsShowing] = useState(false);
    const showModal = () => setModalIsShowing(!modalIsShowing);

    const [semesterFormIsLoading, setSemesterFormIsLoading] = useState(false);
    const [messages, setMessages] = useState('');
    const handleLoading = () => setSemesterFormIsLoading(!semesterFormIsLoading);
    const handleSuccess = () => {
        setMessages('Semester created with success');
        window.Materialize.toast('Semester created with success', 4000);
    };

    const calculateGeneralCalif = () => {
        let califSum = props.subjects.reduce((a, c) => a + parseInt(c.califications.subjectCalif), 0);
        let numberOfSubjects = props.subjects.length;
        let calif = califSum / numberOfSubjects;
        calif = Math.round((calif + Number.EPSILON) * 100) / 100;
        return calif;
    }

    return (
        <section className="side-section">
            <div className="Profile">
                <div className="Profile__title">
                    <h4>{props.user.career}</h4>
                    <ul className="Profile__resume">
                        <li>semestre: {props.semester.key}</li>
                        <li>calificación general: {calculateGeneralCalif()}</li>
                    </ul>
                </div>
                <div className="divider"></div>
                <div className="Profile__progress">
                    <h6>Progreso</h6>
                    <br/>
                    <LinearProgress
                        variant="determinate"
                        value={30}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                    <LinearProgress
                        variant="determinate"
                        value={80}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                    <LinearProgress
                        variant="determinate"
                        value={50}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                    <LinearProgress
                        variant="determinate"
                        value={10}
                        classes={{barColorPrimary: 'blue'}}
                    /><br />
                    <LinearProgress
                        variant="determinate"
                        value={90}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                    <LinearProgress
                        variant="determinate"
                        value={40}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                    <LinearProgress
                        variant="determinate"
                        value={70}
                        classes={{barColorPrimary: 'blue'}}
                    /><br/>
                </div>
                <div className="divider"></div>
                <div className="Profile__options">
                    <button className="btn btn-option blue" onClick={showModal}>Nuevo Semestre</button>
                    <button className="btn btn-option grey">Subir Item</button>
                </div>
            </div>
            <Modal
                isOpen={modalIsShowing}
                onClose={showModal}
                title="Nuevo Semestre"
                style={{width: '70vw'}}>
                <div>{messages}</div>
                { semesterFormIsLoading ?
                    <Loading /> :
                    <SemesterContainer
                        onLoading={handleLoading}
                        onSuccess={handleSuccess}
                    />
                }
            </Modal>
        </section>
    )
}
