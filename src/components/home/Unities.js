import React from 'react';
import '../styles/Unities.css';

import { Checkbox } from '@material-ui/core';

function Activity(props) {
    return (
        <div className="ativity">
            <div className="activity-header row"> 
                <div className="col s8">
                    <b>Actividad {props.number}</b>
                </div>
                <div className="activity-options col s4">
                    <Checkbox
                        checked={false}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </div>
            <div className="activity-content">
                {props.text}
            </div>
        </div>
    )
}

function ActivitiesList(props) {
    const showActivities = () => {
        return props.activities.map((act, index) => (
            <li key={index} className="activityContainer">
                <Activity
                    activityTitle={act.activityTitle}
                    number={act.index+1} 
                    text={act.content} 
                    onUpdate={props.onUpdate}
                    activityID={act.activityID}
                />
            </li>
        ));
    }

    if(!props.activities.length) return '';

    return (
        <div className="activities_innerWindow">
            <ul className="activitiesList">
                {showActivities()}
            </ul>
        </div>
    )
}

class Unities extends React.Component {
    getOptions() {
        return this.props.modules.map( (unity, index) => {
            return (
                <li key={index} 
                    className="unityOption" >
                        <div className="title">
                            <h5>Unidad {unity.moduleTitle}</h5>
                        </div>
                        <div>
                            <ActivitiesList 
                                activities={unity.activities}
                                onUpdate={this.props.onUpdate}
                            />
                        </div>
                </li>
            );
        });
    }

    render() {
        if(!this.props.modules) return '';
        
        return (
            <div className="subject-panel unities row">
                <div className="subjectUnitiesOptions col s12">
                    <ul style={{padding:0}}>
                        {this.getOptions()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Unities;