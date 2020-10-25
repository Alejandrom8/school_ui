import React from 'react';
import { LinearProgress } from '@material-ui/core';
import {connect} from 'react-redux';

import * as subjectActions from '../../state/actions/subjectActions';

import Modal from './Modal';
import SemesterContainer from '../containers/SemesterContainer';
import Loading from '../Loading';
import {ToolsList} from './tools/Tools';

import {isEmpty} from '../../util/validators';

import '../styles/Profile.css';

class ProfileCard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading: true,
            messages: null
        }
        this.handleSuccess = this.handleSuccess.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
    }

    async componentDidMount() {
        if(isEmpty(this.props.subjects)){
            try{
                await this.props.getSemesterSubjects(this.props.selectedSemester);
                // await Promise.all(this.props.subjects.map(s => (
                //     this.props.getSubjectModules(s.scheduledSubjectID)
                // )));
            }catch(error) {
                console.log(error);
            }
        }
    }

    calculateGeneralCalif() {
        let califSum = this.props.subjects.reduce((a, {data: c}) => a + parseInt(c.califications.subjectCalif), 0);
        let numberOfSubjects = this.props.subjects.length;
        let calif = califSum / numberOfSubjects;
        calif = Math.round((calif + Number.EPSILON) * 100) / 100;
        return calif;
    }

    handleSuccess() {
        this.setState({
            semesterFormIsLoading: false,
            messages: 'Semester created with success'
        });
        window.Materialize.toast('Semester created with success', 4000);
    }

    showModal(){
        this.setState({modalIsShowing: !this.state.modalIsShowing});
    }

    handleLoading() {
        this.setState({semesterFormIsLoading: !this.state.semesterFormIsLoading});
    }

    render() {
        return (
            <section className="side-section">
                <div className="Profile">
                    <div className="Profile__title">
                        <h4>{this.props.user.career}</h4>
                        <ul className="Profile__resume">
                            <li>semestre: {this.props.semester.key}</li>
                            <li>calificación general: {this.calculateGeneralCalif()}</li>
                        </ul>
                    </div>
                    <div className="Profile__options">
                        <button className="btn btn-option blue" onClick={this.showModal}>Nuevo Semestre</button>
                        {/* <button className="btn btn-option grey">Subir Item</button> */}
                    </div>
                    {/*<div>
                        <ToolsList />
                    </div>*/}
                </div>
                <Modal
                    isOpen={this.state.modalIsShowing}
                    onClose={this.showModal}
                    title="Nuevo Semestre"
                    style={{width: '70vw'}}>
                    <div>{this.state.messages}</div>
                    { this.state.semesterFormIsLoading ?
                        <Loading /> :
                        <SemesterContainer
                            onLoading={this.handleLoading}
                            onSuccess={this.handleSuccess}
                        />
                    }
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = reducers => reducers.subjectReducer;

export default connect(mapStateToProps, subjectActions)(ProfileCard);