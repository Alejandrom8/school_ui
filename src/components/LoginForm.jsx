import React from 'react';

import {FormControl, InputLabel, OutlinedInput} from '@material-ui/core';

import './styles/LoginForm.css';

function LoginForm(props){
    return(
        <form id="LoginForm" onSubmit={props.onSubmit}>
            <FormControl variant="outlined" fullwidth className="form-input">
                <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                <OutlinedInput 
                    id="email"
                    type="email"
                    name="email"
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.onChange}
                    label="Correo electrónico"
                    required
                        />
            </FormControl>
            <FormControl variant="outlined" fullwidth className="form-input">
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <OutlinedInput 
                    id="password"
                    type="password"
                    name="password" 
                    label="Contraseña" 
                    className="input"
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.onChange}
                    required
                    />
            </FormControl>
            <button type="submit" className="btn">Entrar</button>
        </form>
    );
}

export default LoginForm;