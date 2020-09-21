import React, { useState } from 'react';

import CancelImage from '../images/cancel.png';
import OkImage from '../images/ok.png';
import Loading from '../Loading';

import '../styles/EditableInput.css';

export default function EditableInput(props) {
    /**
     * props:
     * onUpdate
     */
    const [editable, setEditable] = useState(false);
    const handleEditable = (isEditable) => setEditable(isEditable);
    const [currentValue, setCurrentValue] = useState(props.currentValue);
    const handleChange = (e) => setCurrentValue(e.target.value);
    const [state, setState] = useState("");

    const edit = () => {
        handleEditable(true);
        setState('ok/cancel');
    };

    const cancel = () => {
        handleEditable(false);
        setState("");
    }; 

    const ok = async () => {
        setState('loading');
        
        let val = {...props.additionalInfo};
        val.name = props.name;
        val.value = currentValue;

        await props.onUpdate(val);
        setState('');
    };

    const okCancelButtons = () => {
        return (
            <div className="buttonGroup">
                <button className="okButton" onClick={ok}>
                    <img src={OkImage} alt='ok'/>
                </button>
                <button className="cancelButton" onClick={cancel}>
                    <img src={CancelImage} alt='cancel'/>
                </button>
            </div>
        )
    };

    const loadingOption = () => <Loading className="micro-loading" size="micro"/>;
    const errorOption = () => <span>Error</span>;

    const renderedOption = () => {
        switch(state) {
            case 'ok/cancel':
                return okCancelButtons();
            case 'loading': 
                return loadingOption();
            case 'error':
                return errorOption();
            default: return '';
        }
    };

    return (
        <div className="EditableInput">
            <div>
                <span>{props.label}</span>
            </div>
            <div onClick={edit}>
                <input
                    type="text"
                    className="browser-default" 
                    value={currentValue}
                    onChange={handleChange}
                    disabled={!editable}
                    {...props.inputProps}
                />
            </div>
            <div className="EditableInput__options">
                {renderedOption()}
            </div>
        </div>
    );
}