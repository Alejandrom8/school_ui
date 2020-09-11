import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/Modal.css';

function Modal(props) {
    return ReactDOM.createPortal(
        <div className="Modal__container" style={{display: props.isOpen ? 'block' : 'none'}}>
            <div className="Modal__space">
                <div className="Modal__window">
                    <div className="Modal__window-closeButtonContainer">
                        <button className="buttonClose" onClick={props.onClose}>X</button>
                    </div>
                    <div className="Modal__window-title">
                        <h4>{props.title}</h4>
                    </div>
                    <div className="Modal__window-container" style={props.style}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;