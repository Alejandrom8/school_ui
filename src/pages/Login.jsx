import React, { Component } from 'react';

import { Auth } from '../api/Api';

import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';

import './styles/Login.css';


class Login extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            loading: false,
            error: null,
            form: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.manageResponse = this.manageResponse.bind(this);
    }

    handleChange(event){
        const nextForm = this.state.form;
        nextForm[event.target.name] = event.target.value;
        this.setState({
            form: nextForm
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({loading: true});
        let {email, password} = this.state.form;
        let result = await Auth.signIn(email, password);
        this.manageResponse(result);
    }

    manageResponse(res){
        if(!res) {
            alert('There was a problem while sign in the app');
        } else if(!res.success) {
            console.log(res.errors);
            this.setState({
                error: res.messages || res.errors,
                loading: false
            });
        } else {
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/home');
        }
    }

    render(){
        if(this.state.loading) return <Loading />;

        return (
            <div className="layout">
                <div className="floating-div">
                    <div className="FormContainer">
                        <h4>Sign in</h4>
                        <br/>
                        <p>{this.state.error}</p>
                        <LoginForm 
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;