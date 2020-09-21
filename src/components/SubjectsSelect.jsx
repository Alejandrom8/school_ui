import React, {Component} from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import Subject from './Subject';

class SubjectOption{
    constructor(subjectID, name, clave) {
        this.subjectID = subjectID;
        this.name = name;
        this.clave = clave;
    }
}

class SubjectsSelect extends Component {

    constructor(props) {
        super();
        this.addSubject = this.addSubject.bind(this);
        this.deleteId = this.deleteId.bind(this);
        this.state = {
            selectedSubjects: [],
        }
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    handleSubjectChange(subject) {
        let nextSubjects = this.state.selectedSubjects;
        nextSubjects = nextSubjects.map(sub => {
            return sub.subjectID === subject.subjectID ? subject : sub;
        });
        this.setState({selectedSubjects: nextSubjects});
        this.props.changeSubjects(nextSubjects);
    }

    processSubjects() {
        return this.props.subjects.map(sub => (
            <MenuItem key={sub.subjectID} value={sub.subjectID}>
                {sub.name}
            </MenuItem>
        ));
    }

    deleteId(id) {
        let subjects = this.state.selectedSubjects;
        subjects = subjects.filter(sub => sub.subjectID !== id);
        this.setState({selectedSubjects: subjects});
        this.props.changeSubjects(subjects);
    }

    getSubject(subjectID) {
        return this.props.subjects.find(sub => {
            return sub.subjectID === subjectID;
        });
    }

    subjectIsSelected(id) {
        return this.state.selectedSubjects.some( 
            s => s.subjectID === id
        );
    }

    addSubject(event) {
        if(this.subjectIsSelected(event.target.value)) return;
        let subjectID = event.target.value;
        let {name, key} = this.getSubject(subjectID);

        let currentSubs = this.state.selectedSubjects;
        currentSubs.push(new SubjectOption(subjectID, name, key.key));
        this.setState({selectedSubjects: currentSubs});

        this.props.changeSubjects(currentSubs);
    }

    render() {
        if(this.props.loading) {
            return(
                <div className="col s12 valign-wrapper">
                    <span className="center-align"><b>Cargando...</b></span>
                </div>
            );
        }

        if (this.props.subjects.length === 0) return "";

        return (
            <div className="margin" id="subjectsForm">
                <FormControl fullWidth variant="outlined" className="form-control">
                    <InputLabel htmlFor="subjects">Subjects</InputLabel>
                    <Select
                        label="Subjects"
                        id="subjects"
                        name="subjects"
                        value=""
                        onChange={this.addSubject}
                        >
                        <MenuItem value="">
                            <em>Select...</em>
                        </MenuItem>
                        {this.processSubjects()}
                    </Select>
                </FormControl>
                <table>     
                    <tbody>
                        {this.state.selectedSubjects.map( sub => (
                            <Subject
                                key={sub.subjectID}
                                subjectID={sub.subjectID}
                                name={sub.name}
                                clave={sub.clave}
                                delete={this.deleteId}
                                onChange={this.handleSubjectChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SubjectsSelect;