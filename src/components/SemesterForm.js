import React, { useState } from 'react'

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import SubjectsSelect from './SubjectsSelect';


function SemesterForm(props) {

    const [semesterID, setSemesterID] = useState('');
    
    const handleChange = (e) => {
        setSemesterID(e.target.value);
        props.manageSemesterId(e);
    };

    return (
        <React.Fragment>
        <form>
            <FormControl fullWidth variant="filled" className="form-control">
                <InputLabel id="semester">Semester</InputLabel>
                <Select
                    labelId="sememester"
                    id="semester-select"
                    name="key"
                    value={semesterID}
                    onClick={handleChange}
                    >
                    <MenuItem value=''>
                        <em>Select...</em>
                    </MenuItem>
                    {[1,2,3,4,5,6].map(n => (
                        <MenuItem key={n} value={n}>
                            <em>{`Semester ${n}`}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <SubjectsSelect 
                subjects={props.responseJSON}
                changeSubjects={props.finalSubjectsHandler}
                loading={props.subjectsLoading}
            />
        </form>
        <div className="buttonContainer">
            <button onClick={props.readyHandler} className="btn blue accent-3">Siguiente</button>
        </div>
        </React.Fragment>
    )
}

export default SemesterForm