import React from 'react';

import {FormControl, InputLabel, OutlinedInput, FormHelperText} from '@material-ui/core';

import 'materialize-css/dist/css/materialize.css';


function SignUpForm(props){
    return (
        <form onSubmit={props.handleFormSubmit} autoComplete="on">
            <div className="row">
                <div className="col s6">
                <FormControl variant="outlined" fullwidth className="form-input">
                    <InputLabel htmlFor="name">First name</InputLabel>
                    <OutlinedInput
                        id="name"
                        type="text"
                        name="name" 
                        label="First name" 
                        inputProps={{maxLength: 100, className: 'browser-default'}}
                        onChange={props.handleChange}
                        required
                    />
                </FormControl>
                </div>
                <div className="col s6">
                <FormControl variant="outlined" fullwidth className="form-input">
                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                    <OutlinedInput
                        id="lastName"
                        type="text"
                        name="lastName" 
                        label="Last name" 
                        inputProps={{maxLength: 100, className: 'browser-default'}}
                        onChange={props.handleChange}
                        required
                    />
                </FormControl>
                </div>
            </div>
            <FormControl variant="outlined" fullwidth className="form-input">
                <InputLabel htmlFor="lastName">Email</InputLabel>
                <OutlinedInput
                    id="email"
                    type="email"
                    name="email" 
                    label="Email" 
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.handleChange}
                    required
                />
            </FormControl>
            <FormControl variant="outlined" fullwidth className={`form-input ${props.passclass}`}>
                <InputLabel htmlFor="first-password">Password</InputLabel>
                <OutlinedInput
                    id="first-password"
                    type="password"
                    name="password" 
                    label="Password" 
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    required
                />
            </FormControl>
            <FormControl variant="outlined" fullwidth className={`form-input ${props.passclass}`}>
                <InputLabel htmlFor="second-password">Confirm your password</InputLabel>
                <OutlinedInput
                    id="second-password"
                    type="password"
                    name="repasswd" 
                    label="Confirm your password" 
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.handlePasswordChange}
                    required
                />
                <FormHelperText>{props.passwordMessage}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" fullwidth className="form-input">
                <InputLabel htmlFor="career">What career are you studying?</InputLabel>
                <OutlinedInput
                    id="career"
                    type="text"
                    name="career" 
                    label="What career are you studying?" 
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.handleChange}
                    required
                />
            </FormControl>
            <FormControl variant="outlined" fullwidth className="form-input">
                <InputLabel htmlFor="university">What university are you studying at?</InputLabel>
                <OutlinedInput
                    id="university"
                    type="text"
                    name="university" 
                    label="What university are you studying at?" 
                    inputProps={{maxLength: 100, className: 'browser-default'}}
                    onChange={props.handleChange}
                    required
                />
            </FormControl>
            <div className="col s12">
                <button type="submit" className="waves-effect waves-light btn">Registrar</button>
            </div>
        </form>
    );
}

export default SignUpForm;