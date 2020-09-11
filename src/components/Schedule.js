import React, { useState } from 'react';

import './styles/Schedule.css';

function getTextColor(hex) {
    let withouthHash = hex.replace(/#/g, '').split('');

    let red = parseInt(withouthHash[0] + withouthHash[1], 16);
    let green = parseInt(withouthHash[2] + withouthHash[3], 16);
    let blue = parseInt(withouthHash[4] + withouthHash[5], 16);

    if((red*0.299 + green*0.587 + blue*0.114) > 186) return '#000000';
    return '#ffffff';
}

function DaySection(props) {
    const [color, setColor] = useState(props.isChecked ? props.subject.color : '#ffffff');
    const [subjectName, setSubjectName] = useState(props.isChecked ? props.subject.name : '');

    const handleClick = () => {
        setColor(props.subject.color);
        setSubjectName(props.subject.name);
        props.onClick({subjectID: props.subject.subjectID, schedule: props.schedule});
    }

    return (
        <div
            className="daySection"
            style={{backgroundColor: color, color: getTextColor(color)}}
            onClick={handleClick}
            >
            <p>{props.schedule.hour}</p>
            <p>{subjectName}</p>
        </div>
    )
}

function Day(props) {
    const renderDaySections = () => {
        const interval = props.end - props.start;
        if (interval < 1) return 'Incorrect interval';
        const repetitions = interval * 2;

        let daySections = [];

        let init = props.start;

        for(let i = 0; i < repetitions; i++) {
            let isEven = i % 2 === 0;
            let hour = !isEven ? `${init}:00` : `${init}:30`;

            let schedule = {
                day: props.day,
                hour: hour
            }

            let isChecked = 'schedules' in props.subject ?
                props.subject.schedules.some(s => s.day === schedule.day && s.hour === schedule.hour) : false;

            daySections.push(
                <DaySection
                    isChecked={isChecked}
                    subject={props.subject}
                    schedule={schedule}
                    onClick={props.onClick}
                />
            )

            if(isEven) init++;
        }

        return daySections;
    }

    return (
        <td className="Day">
            <div className="Day__title">
                {props.day}
            </div>
            <div className="Day__body">
                {renderDaySections()}
            </div>
        </td>
    )
}

class Schedule extends React.Component {
    renderDays() {
        const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        return days.map(d => (
            <Day
                day={d}
                start={7}
                end={22}
                subject={this.props.subject}
                onClick={this.props.onClick}
            />
        ));
    }

    render() {
        return (
            <div className="ScheduleContainer">
                <table className="responsive-table">
                    <tbody>
                        <tr>
                        {this.renderDays()}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Schedule;
