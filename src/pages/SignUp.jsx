import React, {Component} from 'react';

import SignUpForm from '../components/SignUpForm';
import SemesterContainer from '../components/containers/SemesterContainer';
import { Auth } from '../api/Api';
import Loading from '../components/Loading';

import './styles/SignUp.css';

import lefter from '../components/images/lefter.png';


class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            responseJSON: [],
            form: {},
            passwordMessage: '',
            passwordCoincide: false,
            subjectsLoading: false,
            registered: false,
            loading: false,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
    }

    handleChange(event) {
        const nextForm = this.state.form;
        nextForm[event.target.name] = event.target.value;
        this.setState({
            form: nextForm
        })
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        this.setState({loading: true, error: null});

        if(!this.state.passwordCoincide){
            alert('The passwords doesnt coincide');
            return;
        }

        const data = this.state.form;

        try {
            const result = await Auth.signUp(data);
            if(!result) throw new Error('We cant contact to the server');
            if(!result.success) throw new Error(result.errors);            
            this.setState({registered: true, loading: false});
        } catch(error) {
            this.setState({loading: false, error: error});
        }
    }

    handlePasswordChange(event) {
        let pass_1 = document.getElementById('first-password').value;
        let pass_2 = event.target.value;
        let message = "Las contraseñas no coinciden";

        let coincide = pass_1 === pass_2;

        if(coincide) {
            message = "Las contraseñas coinciden";
            event.target.name = 'password';
            this.handleChange(event);
        }

        this.setState({
            passwordMessage: message,
            passwordCoincide: coincide
        })
    }

    handleSuccess() {
        this.props.history.push('/home');
    }

    handleLoading(isLoading) {
        this.setState({loading: isLoading});
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return this.state.error;

        return (
            <div className="layout">
                <div id="schoolImage" className="floating-div-su row">
                    {
                        !this.state.registered ? <div>
                            <div id="formSide" className="col s7">
                                <div className="p6 m6">
                                    <h4 className="header m6">Welcome to School</h4>
                                </div>
                                <div className="section">
                                    <SignUpForm 
                                        handleFormSubmit={this.handleFormSubmit}
                                        handleChange={this.handleChange}
                                        handlePasswordChange={this.handlePasswordChange}
                                        passwordMessage={this.state.passwordMessage}
                                        responseJSON={this.state.responseJSON} 
                                    />
                                </div>
                            </div>
                            <div id="lefter" className="col s5">
                                <img src={lefter} alt="figures" width="200%"/>
                            </div>
                        </div> :
                        <div>
                            <h3>Configura tu entorno</h3>
                            <SemesterContainer 
                                onSuccess={this.handleSuccess}
                                onLoading={this.handleLoading}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SignUp;