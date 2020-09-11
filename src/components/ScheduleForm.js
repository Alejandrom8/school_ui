import React from 'react';

import Schedule from './Schedule';

import './styles/ScheduleForm.css';

class ScheduleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSubject: this.props.subjects[0]
        }
    }

    changeSubject(subject) {
        this.setState({
            selectedSubject: subject
        });
    }

    renderSubjects() {
        return this.props.subjects.map( s => (
            <div
                className="SubjectOption"
                onClick={() => this.changeSubject(s)}
                style={{backgroundColor: s.color}}
                >
                {s.name}
            </div>
        ));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s3">
                        {this.renderSubjects()}
                    </div>
                    <div className="col s9">
                        <Schedule
                            subject={this.state.selectedSubject}
                            onClick={this.props.onClick}
                        />
                    </div>
                </div>
                <div className="buttonContainer">
                    <button onClick={this.props.readyHandler} className="btn blue accent-3">Previo</button>
                    <button onClick={this.props.submitHandler} className="btn blue accent-3">Finalizar</button>
                </div>
            </div>
        )
    }
}

export default ScheduleForm;
