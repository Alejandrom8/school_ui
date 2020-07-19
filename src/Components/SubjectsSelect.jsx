import React, {Component} from 'react';
import {TextField} from '@material-ui/core';
import Subject from './Subject';

class Asignatura{
    constructor(nombre, clave){
        this.nombre = nombre;
        this.clave = clave;
    }
}

class SubjectsSelect extends Component{

    constructor(props){
        super(props);
        this.processSubjects = this.processSubjects.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.deleteId = this.deleteId.bind(this);

        this.state = { selectedSubjects: [] }
    }

    processSubjects(){
        const subjects = this.props.subjects;
        const preProSub = [];

        subjects.forEach(sub => {
            preProSub.push(<option value={sub.clave.number}>{sub.nombre}</option>);
        });

        return preProSub;
    }

    deleteId(id){
        let subjects = this.state.selectedSubjects;
        subjects = subjects.filter(sub => sub.clave !== id);
        this.setState({selectedSubjects: subjects});
        this.props.changeSubjects(subjects);
    }

    getSubject(clave){
        return this.props.subjects.find(sub => {
            return sub.clave.number === clave;
        });
    }

    addSubject(event){
        let clave = event.target.value;
        let {nombre} = this.getSubject(clave);
        let currentSubs = this.state.selectedSubjects;
        currentSubs.push(new Asignatura(nombre, clave));
        this.setState({selectedSubjects: currentSubs});
        this.props.changeSubjects(currentSubs);
    }

    render(){
        if (this.props.subjects.length === 0) {
            return "";
        }

        if(this.props.loading){
            return(
                // <img src="/giphy.gif" alt="loading" />
                <div className="col s12 valign-wrapper">
                    <span className="center-align"><b>Cargando...</b></span>
                </div>
            );
        }

        return (
            <div className="row bordered">
                <div className="col s12">
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        fullWidth
                        label="Asignaturas"
                        name="subject"
                        onChange={this.addSubject}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Selecciona tus asignaturas"
                        variant="outlined"
                        >
                        {this.props.subjects.map( sub => (
                            <option key={sub.clave.number} value={sub.clave.number}>
                                {sub.nombre}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div ref="subjectsSelected" className="col s12 subSection">
                    {this.state.selectedSubjects.map( sub => (
                        <Subject nombre={sub.nombre} clave={sub.clave} delete={this.deleteId} />
                    ))}
                </div>
            </div>
        )
    }
}

export default SubjectsSelect;