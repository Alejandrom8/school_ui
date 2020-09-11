import React from 'react';

import '../styles/ToolBar.css';


function Tool(props) {
    return (
        <div key={props.id} className="Tool">
            <div className="Tool__content">
                <span className="Tool-title">Tarea</span>
                <p>I am a very simple card. I am good at containing small.</p>
            </div>
        </div>
    )
}

export default function TodoBar(props) {
    return (
        <div className="ToolBar">
            <div className="ToolBar__title">
                <h5>Tareas por hacer</h5>
            </div>
            <div className="ToolBar__list">
                <ul className="row">
                    { props.todo.map(item => (
                        <div key={item} className="col s4">
                            <Tool id={item} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
