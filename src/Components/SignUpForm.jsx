import React from 'react';
import {FormControl, TextField} from '@material-ui/core';
import SubjectsSelect from './SubjectsSelect';
import { User, Semester } from '../api/Api';
import 'materialize-css/dist/css/materialize.css';


class SignUpForm extends React.Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.manageSemesterId = this.manageSemesterId.bind(this);
        this.finalSubjectsHandler = this.finalSubjectsHandler.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            responseJSON: [],
            form: {},
            passwordMessage: '',
            subjectsLoading: false
        };
    }

    handleChange(event){
        const nextForm = this.state.form;
        nextForm[event.target.name] = event.target.value;
        this.setState({
            form: nextForm
        })
    }

    async handleFormSubmit(e){
        e.preventDefault();
        const data = this.state.form;

        try{
            const result = await User.signUp(data);
            if(!result) throw new Error('No se pudo contactar con el servidor');
            if(!result.success) throw result;
            localStorage.setItem('token', result.data.token);
            this.props.redirect();
        }catch(error){
            console.log(error);
        }
    }

    async manageSemesterId(e){
        const semesterId = e.target.value;

        if(semesterId == 0) return;

        this.setState({subjectsLoading: true});
        let result = await Semester.getSemester(semesterId);
        if(!result || !result.success) console.log(result.errors || 'Error al solicitar el semestre');
        this.setState({responseJSON: result.data.subjects, subjectsLoading: false});
        let event = {target: {name: 'semester', value: semesterId}};
        this.handleChange(event);
    }

    //subject - updated subjects object
    finalSubjectsHandler(subjects){
        let event = { target: { name: 'subjects', value: subjects}};
        this.handleChange(event);
    }

    handlePasswordChange(event){
        let pass_1 = document.getElementById('first-password').value;
        let pass_2 = event.target.value;
        let message = "Las contraseñas no coinciden";

        if(pass_1 === pass_2){
            message = "Las contraseñas coinciden";
            event.target.name = 'password';
            this.handleChange(event);
        }

        this.setState({
            passwordMessage: message
        })
    }

    render(){
        return (
            <div className="row">
                <div className="col s6">
                    <form onSubmit={this.handleFormSubmit} autoComplete="on">
                        <FormControl fullWidth className="margin">
                            <TextField
                                type="text"
                                id="outlined-basic" 
                                name="name" 
                                label="Nombre completo" 
                                variant="outlined"
                                className="input p4"
                                inputProps={{maxLength: 80}}
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth className="margin">
                            <TextField
                                type="email"
                                id="outlined-basic" 
                                name="email" 
                                label="Email"
                                variant="outlined"
                                className="input p4"
                                inputProps={{maxLength: 80}}
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth className="margin">
                            <TextField
                                type="password"
                                id="first-password"
                                name="password" 
                                label="Contraseña"
                                variant="outlined"
                                className="input p4"
                                inputProps={{maxLength: 50}}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth className="margin">
                            <TextField
                                type="password"
                                id="outlined-basic" 
                                name="repasswd" 
                                label="Repite tu contraseña" 
                                variant="outlined"
                                className="input p4"
                                maxLength="100"
                                onChange={this.handlePasswordChange}
                                helperText={this.state.passwordMessage}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth className="margin">
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="semestre"
                                name="semester"
                                ref="semester"
                                onClick={this.manageSemesterId}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select your currency"
                                variant="outlined"
                                >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map( (option, i) => (
                                    <option key={option} value={option}>                                        
                                        {i === 0 ? 'Seleccióna...' : `Semestre ${i}`}
                                    </option>
                                ))}
                            </TextField>
                        </FormControl>
                        <div className="col s12">
                            <button type="submit" className="waves-effect waves-light btn">Registrar</button>
                        </div>
                    </form>
                </div>
                <div className="col s6">
                    <FormControl fullWidth className="margin">
                        <SubjectsSelect 
                            subjects={this.state.responseJSON}
                            changeSubjects={this.finalSubjectsHandler}
                            loading={this.state.subjectsLoading}
                        />
                    </FormControl>
                </div>
            </div>    
        )
    }
}

export default SignUpForm;