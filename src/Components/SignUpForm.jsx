import React from 'react';

import {FormControl, TextField} from '@material-ui/core';
import SubjectsSelect from './SubjectsSelect';
import 'materialize-css/dist/css/materialize.css';


function SignUpForm(props){
    return (
        <div className="row">
            <div className="col s6">
                <form onSubmit={props.handleFormSubmit} autoComplete="on">
                    <FormControl fullWidth className="margin">
                        <TextField
                            type="text"
                            id="outlined-basic" 
                            name="name" 
                            label="Nombre completo" 
                            variant="outlined"
                            className="input p4"
                            inputProps={{maxLength: 80}}
                            onChange={props.handleChange}
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
                            onChange={props.handleChange}
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
                            onChange={props.handlePasswordChange}
                            helperText={props.passwordMessage}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth className="margin">
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="semestre"
                            name="semester"
                            onClick={props.manageSemesterId}
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
                        subjects={props.responseJSON}
                        changeSubjects={props.finalSubjectsHandler}
                        loading={props.subjectsLoading}
                    />
                </FormControl>
            </div>
        </div>    
    )
}

export default SignUpForm;