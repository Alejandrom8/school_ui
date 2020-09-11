import React, { useState } from 'react';

import {IconButton, FormControl, Input} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import EditableInput from './EditableInput';

import '../styles/SubjectCalificationForm.css';

function PonderationForm (props) {
    const [ponderation, setPonderation] = useState({});
    const [error, setError] = useState(null);
    const handleChange = (event) => {
        ponderation[event.target.name] = event.target.value;
        setPonderation(ponderation);
    }
    const addPonderation = async () => {
        let result = await props.onAdd(ponderation);
        if(!result.success) setError(result.errors);
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="row" style={{margin: 0}}>
                    <div className="col s1">
                        <IconButton color="primary" onClick={addPonderation}>
                            <AddCircle />
                        </IconButton>
                    </div>
                    <div className="col s6">
                        <FormControl fullwidth className="form-input">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Rubro"
                                onChange={handleChange}
                                inputProps={{maxLength: 100, className: 'browser-default'}}
                                required
                            />
                        </FormControl>
                    </div>
                    <div className="col s2">
                        <FormControl fullwidth className="form-input">
                            <Input
                                type="text"
                                name="weight"
                                placeholder="%"
                                onChange={handleChange}
                                inputProps={{className: 'browser-default'}}
                                required
                            />
                        </FormControl>
                    </div>
                    <div className="col s3">
                        <FormControl fullwidth className="form-input">
                            <Input
                                type="text"
                                name="calif"
                                onChange={handleChange}
                                placeholder="obtenido"
                                inputProps={{className: 'browser-default'}}
                            />
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="col s12">
                {error.message}
            </div>
        </div>
    );
}

class SubjectCalificationForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(value) {
        console.log(value);
    }

    renderPonderations() {
        return this.props.califications.ponderations?.map(pnd => (
            <tr>
                <td>
                    <EditableInput
                        currentValue={pnd.name}
                        name='name'
                        onUpdate={this.handleUpdate}
                        inputProps={{style: {width: '200px'}}}
                    />
                </td>
                <td>
                    <EditableInput
                        currentValue={pnd.weight}
                        name='weight'
                        onUpdate={this.handleUpdate}
                        inputProps={{style: {width: '30px'}}}
                    />
                </td>
                <td>
                    <EditableInput
                        currentValue={pnd.calif}
                        name='calif'
                        onUpdate={this.handleUpdate}
                        inputProps={{style: {width: '30px'}}}
                    />
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="subject-panel">
                <div className="title">
                    <h5>Calificación</h5>
                </div>
                <div className="calificationsTable">
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <td>Rubros</td>
                                    <td>%</td>
                                    <td>% obtenido</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderPonderations()}
                                <tr>
                                    <td colSpan={3}>
                                        <PonderationForm
                                            onAdd={this.props.onPonderationAdded}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>{
                                        this.props.califications.ponderations.reduce((actr, crt) => (
                                            actr + parseInt(crt.weight)
                                        ), 0)
                                    }</td>
                                    <td>{this.props.califications.subjectCalif}</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

export default SubjectCalificationForm;
