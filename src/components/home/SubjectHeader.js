import React from 'react';

import pdfLogo from '../images/pdf.svg';
import EditableInput from './EditableInput';

export default function SubjectHeader({subject, onUpdate}) {
    return (
        <header id="title" className="row">
            <div className="col s9">
                <h4 className="withOutMargin">{subject.name}</h4>
                <div className="Details">
                    <div className="Detail__item">
                        <EditableInput
                            currentValue={subject.profesorName}
                            label='Profesor: '
                            name='profesorName'
                            onUpdate={onUpdate}
                            inputProps={{style: {width: '150px'}}}
                        />
                    </div>
                    <div className="Detail__item">
                        <EditableInput
                            currentValue={subject.califications.subjectCalif}
                            label='Calificación: '
                            name='subjectCalif'
                            onUpdate={onUpdate}
                            inputProps={{style: {width: '30px'}}}
                        />
                    </div>
                </div>
            </div>
            <div className="col s3 materialsContainer">
                <div className="Materials">
                    <div>
                        <h5>Materiales</h5>
                        <ul>
                            <li className="link">
                                <img src={pdfLogo} alt="pdf logo" />
                                <a href={subject.planDeTrabajoURL}
                                    target="_blank"
                                    rel="noopener noreferrer"> Plan de trabajo</a>
                            </li>
                            <li className="link">
                                <img src={pdfLogo} alt="pdf logo"/>
                                <a href={subject.actividadesURL}
                                    target="_blank"
                                    rel="noopener noreferrer">Actividades</a>
                            </li>
                            <li className="link">
                                <img src={pdfLogo} alt="pdf logo"/>
                                <a href={subject.apunteURL}
                                    target="_blank"
                                    rel="noopener noreferrer">Apunte</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
