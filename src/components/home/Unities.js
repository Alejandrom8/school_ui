import React, {useState} from 'react';
import '../styles/Unities.css';

import { 
    Checkbox, 
    LinearProgress,
    Typography,
    Box 
} from '@material-ui/core';

function Activity(props) {

    const [isChecked, setIsChecked] = useState(props.state || false);
    const handleReady = () => {
        setIsChecked(!isChecked);
        props.onChecked({
            state: !isChecked,
            activityID: props.activityID,
            moduleID: props.moduleID
        });
    };

    return (
        <div className="ativity">
            <div className="activity-header row"> 
                <div className="col s8">
                    <b>Actividad {typeof props.activityTitle === 'string' ? props.activityTitle : props.number}</b>
                </div>
                <div className="activity-options col s4">
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        onClick={handleReady}
                        checked={isChecked}
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
        return props.activities.map((act, index) => {
            let progress = props.progress.find(p => {
                return p.activityID === act.activityID;
            }) || {state: false};
            return (
                <li key={act.activityID} className="activityContainer">
                    <Activity
                        moduleID={props.moduleID}
                        activityTitle={act.activityTitle}
                        number={act.index+1} 
                        text={act.content} 
                        activityID={act.activityID}
                        onChecked={props.onChecked}
                        state={progress.state}
                    />
                </li>
            )
        });
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

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}

class Unities extends React.Component {

    constructor(props) {
        super();
        this.state ={
            activitiesLength: 0,
            progressLength: 0,
            total: 0
        };
    }

    componentDidMount() {
        this.setState({
            activitiesLength: this.props.modules.reduce((a, c) => {
                return a + c.activities.length
            }, 0),
            progressLength: this.props.progress.reduce((a, c) => {
                return a + (c.state ? 1 : 0)    
            }, 0)
        }, () => {
            this.setState({
                total: (this.state.progressLength * 100) / this.state.activitiesLength
            });
        });
    }

    getOptions() {
        return this.props.modules.map( (unity, index) => {
            return (
                <li key={index} 
                    className="unityOption" >
                        <div className="title">
                            <h5>Unidad {typeof unity.moduleTitle == 'string' ? unity.moduleTitle : index}</h5>
                        </div>
                        <div>
                            <ActivitiesList 
                                moduleID={unity.moduleID}
                                activities={unity.activities}
                                onChecked={this.props.onChecked}
                                progress={this.props.progress}
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
                <div className="col s12">
                    PROGRESO
                    <LinearProgressWithLabel
                        value={this.state.total}
                        classes={{barColorPrimary: 'blue'}}
                    />
                    {/* Completado {this.state.progressLength} / {this.state.activitiesLength} */}
                </div>
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