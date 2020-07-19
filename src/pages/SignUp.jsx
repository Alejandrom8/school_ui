import React, {Component} from 'react';
import DefaultLayout from '../Components/layauts/DefaultLayout';
import { Redirect } from 'react-router-dom';

import SignUpForm from '../Components/SignUpForm';

import 'materialize-css/dist/css/materialize.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.redirect = this.redirect.bind(this);

        //subjects - the subjects that will be registered
        this.state = {redirect: false};
    }

    redirect(){
        this.setState({
            redirect: true
        })
    }

    render(){
        if(this.state.redirect === true){
            return <Redirect to="/home" />;
        }

        return (
            <DefaultLayout title="Inicio">
                    <div className="p6 m6">
                        <h4 className="header m6">Configura tu entorno</h4>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <SignUpForm redirect={this.redirect}/>
                    </div>
            </DefaultLayout>
        );
    }
}

export default SignUp;