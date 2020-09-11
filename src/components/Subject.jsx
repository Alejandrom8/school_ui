import React from 'react';
import ColorSelector from './ColorSelector';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import randomColor from './home/randomColor';


function Subject(props) {
    const [profesor, setProfesor] = useState('');
    const [color, setColor] = useState(randomColor(['#194D33', '#FCB900', '#FCB900', '#00D084', '#8ED1FC', '#0693E3', '#EB144C', '#F78DA7', '#9900EF']));
    const deleteID = () => props.delete(props.subjectID);

    const handleProfesor = e => {
        setProfesor(e.target.value);
        props.onChange({
            subjectID: props.subjectID,
            name: props.name,
            clave: props.clave,
            color: color,
            profesorName: e.target.value
        });
    }

    const handleColor = color => {
        setColor(color);
        props.onChange({
            subjectID: props.subjectID,
            name: props.name,
            clave: props.clave,
            color: color,
            profesorName: profesor
        });
    }

    return (
        <tr key={props.subjectID}>
            <td>
                <ColorSelector onChange={handleColor} color={color}/>
            </td>
            <td>{props.clave}</td>
            <td>{props.name}</td>
            <td>
                <TextField
                    id="outlined-basic"
                    label="Profesor"
                    onChange={handleProfesor}
                    value={profesor}
                    inputProps={{
                        className: "browser-default"
                    }}
                />
            </td>
            <td>
                <div 
                    onClick={deleteID}
                    className="btn red"
                    style={{width: '20px', height: '20px', padding:0,alignItems:"center", display:'flex',justifyContent:'center'}}>
                    <small>-</small>
                </div>
            </td>
        </tr>
    );
}

export default Subject;