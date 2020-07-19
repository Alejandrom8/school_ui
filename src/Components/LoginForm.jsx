import React from 'react';

import { User } from '../api/Api';
import {FormControl, TextField} from '@material-ui/core';

import './styles/LoginForm.css';

class LoginForm extends React.Component{

    constructor(props){
        super(props)
        this.state = { form: {} }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        let {email, password} = this.state.form;
        let result = await User.logIn(email, password);
        this.manageResponse(result);
    }

    manageResponse(res){
        if(!res){
            alert('Hubo un problema al intentar realizar el logueo');
        }else if(!res.success){
            console.log(res.errors);
            this.refs.debug_area.innerHTML = `<p>${res.messages || res.errors}</p>`;
        }else{
            localStorage.setItem('token', res.data.token);
            this.redirect();
        }
    }

    redirect(){
        this.props.redirect();
    }

    render(){
        return(
            <React.Fragment>
                <div ref="debug_area"></div>
                <form onSubmit={this.handleSubmit}>
                    <FormControl className="margin">
                        <TextField
                            type="email"
                            name="email" 
                            label="Correo electrónico" 
                            variant="outlined"
                            className="browser-default outlined-basic input"
                            inputProps={{maxLength: 100}}
                            onChange={this.handleChange}
                            required
                        />
                    </FormControl>
                    <FormControl className="margin">
                        <TextField
                            type="password"
                            name="password" 
                            label="Contraseña" 
                            variant="outlined"
                            className="outlined-basic input"
                            inputProps={{maxLength: 100}}
                            onChange={this.handleChange}
                            required
                        />
                    </FormControl>
                    <br/>
                    <button type="submit" className="btn">Entrar</button>
                </form>
            </React.Fragment>
        );
    }
}

export default LoginForm;