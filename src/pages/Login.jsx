import React, { Component } from 'react';

import DefaultLayout from '../Components/layauts/DefaultLayout';
import { Redirect } from 'react-router-dom';

import LoginForm from '../Components/LoginForm';

import './styles/Login.css';

class Login extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
            loading: false,
            redirect: false
        };
        this.redirect = this.redirect.bind(this);
    }

    redirect(){
        this.setState({
            redirect: true
        })
    }

    render(){
        if(this.state.loading) return <p>Loading...</p>;
        if (this.state.redirect) return <Redirect to="home"/>;

        return (
            <DefaultLayout title="login">
                <div className="layout">
                    <div className="floating-div">
                        <div className="margin">
                            <h4> Log in</h4>
                            <br/>
                            <LoginForm redirect={this.redirect}/>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default Login;