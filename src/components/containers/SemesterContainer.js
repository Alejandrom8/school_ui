import React from 'react';
import SemesterForm from '../SemesterForm';
import * as API from '../../api/Api';
import ScheduleForm from '../ScheduleForm';

import '../styles/SemesterForm.css';

class SemesterContainer extends React.Component {   

    constructor(props) {
        super(props);
        this.state = {
            form: {},
            loading: false,
            responseJSON: [],
            subjectsLoading: false,
            view: 1,
            error: '' 
        }
        this.manageSemesterID = this.manageSemesterID.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.finalSubjectsHandler = this.finalSubjectsHandler.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleScheduleClick = this.handleScheduleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const nextForm = this.state.form;
        nextForm[event.target.name] = event.target.value;
        this.setState({
            form: nextForm
        })
    }

    setSemester(semester) {
        let event = {target: {name: 'key', value: semester}};
        this.handleChange(event);
    }

    async manageSemesterID(e) {
        const semesterID = e.target.value;

        if(!semesterID) return;

        this.setState({responseJSON: [], subjectsLoading: true});
        let result = await API.Subject.getSubjectsForSemester(semesterID);
        if(!result || !result.success) 
            console.log(result.errors || 'Error al solicitar las asignaturas');
        this.setState({responseJSON: result.data, subjectsLoading: false});
        this.setSemester(semesterID);
    }

    //subject - updated subjects object
    finalSubjectsHandler(subjects) {
        let event = { target: { name: 'subjects', value: subjects}};
        this.handleChange(event);
        console.log(this.state.form);
    }

    changeView() {
        if(this.state.view === 1) {
            if(!("subjects" in this.state.form)) {
                return
            } else if(!this.state.form.subjects.length) {
                return
            }
        }
        this.setState({view: this.state.view === 1 ? 2 : 1}) 
    }

    handleScheduleClick(subject) {
        let subjects = this.state.form.subjects;
        subjects = subjects.map(s => {
            if(s.subjectID === subject.subjectID) {
                if(!('schedules' in s)) s.schedules = [];
                s.schedules.push(subject.schedule);
            }
            return s;
        });
        this.finalSubjectsHandler(subjects);
    }

    async handleSubmit() {
        this.props.onLoading(true);
        try{
            let result = await API.Semester.createSemester(this.state.form);
            if(!result) throw new Error('We cannot contact with the server');
            if(!result.success) throw new Error(result.errors);
            this.props.onSuccess();
        } catch(error) {
            console.log(error);
            this.props.onLoading(false);
        }
    }

    render() {
        return (
            <div className="SemesterContainer">
                {
                    this.state.view === 1 ? 
                    <SemesterForm 
                        manageSemesterId={this.manageSemesterID}
                        responseJSON={this.state.responseJSON}
                        finalSubjectsHandler={this.finalSubjectsHandler}
                        subjectsLoading={this.state.subjectsLoading}
                        readyHandler={this.changeView}
                    /> : 
                    <ScheduleForm
                        subjects={this.state.form.subjects}
                        readyHandler={this.changeView}
                        submitHandler={this.handleSubmit}
                        onClick={this.handleScheduleClick}
                    />
                } 
            </div>
        );
    }
}

export default SemesterContainer;