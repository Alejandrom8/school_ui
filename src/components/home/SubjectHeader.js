import React from 'react';

import EditableInput from './EditableInput';

export default function SubjectHeader({subject, onUpdate, color}) {
    return (
        <header id="title" className="row">
            <div className="col s12">
                <h4 className="withOutMargin">{subject.name}</h4>
                <div className="Details">
                    <div className="Detail__item">
                        <EditableInput
                            currentValue={subject.professorName}
                            label='profesor: '
                            name='professorName'
                            onUpdate={onUpdate}
                            inputProps={{style: {width: '150px'}}}
                        />
                    </div>
                    <div className="Detail__item">
                        <EditableInput
                            currentValue={subject.califications.subjectCalif}
                            label='calificación: '
                            name='subjectCalif'
                            onUpdate={onUpdate}
                            inputProps={{style: {width: '30px'}}}
                        />
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className="Materials">
                        <h5>Materiales</h5>
                        <ul className="row">
                            <li className="link col s4">
                                <a href={subject.planDeTrabajoURL}
                                    target="_blank"
                                    style={{backgroundColor: color}}
                                    rel="noopener noreferrer">Plan de trabajo</a>
                            </li>
                            <li className="link col s4">
                                <a href={subject.actividadesURL}
                                    target="_blank"
                                    style={{backgroundColor: color}}
                                    rel="noopener noreferrer">Actividades</a>
                            </li>
                            <li className="link col s4">
                                <a href={subject.apunteURL}
                                    target="_blank"
                                    style={{backgroundColor: color}}
                                    rel="noopener noreferrer">Apunte</a>
                            </li>
                        </ul>
                </div>
            </div>
        </header>
    )
}
