import React, {Component} from 'react';

import DefaultLayout from '../Components/layauts/DefaultLayout';
import SignUpForm from '../Components/SignUpForm';
import { User, Semester } from '../api/Api';

class SignUp extends Component{

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
            console.log(result);
            if(!result) throw new Error('No se pudo contactar con el servidor');
            if(!result.success) throw new Error(result.errors);
            localStorage.setItem('token', result.data.token);
            
            this.props.history.push('/home');
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
            <DefaultLayout title="Inicio">
                <div className="p6 m6">
                    <h4 className="header m6">Configura tu entorno</h4>
                </div>
                <div className="divider"></div>
                <div className="section">
                <SignUpForm 
                    handleFormSubmit={this.handleFormSubmit}
                    handleChange={this.handleChange}
                    manageSemesterId={this.manageSemesterId}
                    finalSubjectsHandler={this.finalSubjectsHandler}
                    handlePasswordChange={this.handlePasswordChange}
                    passwordMessage={this.state.passwordMessage}
                    responseJSON={this.state.responseJSON}
                    subjectsLoading={this.state.subjectsLoading}
                />
                </div>
            </DefaultLayout>
        );
    }
}

export default SignUp;