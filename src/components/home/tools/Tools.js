import React from 'react';
import ReactDOM from 'react-dom';

import Cite from 'citation-js';

import 'materialize-css/dist/css/materialize.css';
import 'material-icons/css/material-icons.css';
import '../../styles/ToolsList.css';

import ButtonIcon from '../../images/text.svg';

export class ToolsList extends React.Component{
    constructor(props){
        super();
        this.state = {
            references: []
        }

        this.addReference = this.addReference.bind(this);
        this.convertToAPA = this.convertToAPA.bind(this);
    }

    addReference(){
        let ref = this.refs.referencia.value;
        let references = this.state.references;
        references.push(ref);
        this.setState({references: references});
        this.refs.referencia.value = '';
    }

    async convertToAPA(){
        let request = await Cite.async(this.state.references[0]);
        let output = request.format('bibliography', {
            format: 'txt',
            template: 'apa',
            lang: 'es-Es'
        });
        console.log(output);
    }

    render(){
        return (
            <div className="ToolsList">
                <div className="closer">
                    <h5>Referencias ({this.state.references.length})</h5>
                </div>
                <ul className="ToolsList__list collection">
                    {this.state.references.map((ref, index) => (
                        <li key={index} className="collection-item">{ref}</li>
                    ))}
                </ul>
                <div className="ToolsList__input closer">
                    <input
                        type="text"
                        ref="referencia"
                        name="referencia" 
                        placeholder="referencia" 
                        className="input"
                    />
                    <button className="btn" onClick={this.addReference}>add</button>
                </div>
                {this.state.references.length ? (
                    <div className="closer">
                        <button 
                            style={{width: "100%"}}
                            className="waves-effect waves-light btn-large indigo" 
                            onClick={this.convertToAPA}>
                                convertir a APA
                        </button>
                    </div>
                ) : ''}
            </div>
        )
    }
}

class Tools extends React.Component{
    constructor(props){
        super();
        this.state = {windowIsOpen: false}
        this.toggleWindow = this.toggleWindow.bind(this);
    }

    toggleWindow(){
        this.setState({
            windowIsOpen: !this.state.windowIsOpen
        });
    }

    render(){
        return ReactDOM.createPortal(
            <div id="ToolsList__container">
                <ToolsList isOpen={this.state.windowIsOpen} />
                <button className="ToolsList__button" onClick={this.toggleWindow}>
                    <img className="ToolsList__icon" src={ButtonIcon} alt="menu-icon"/>
                </button>
            </div>,
            document.getElementById('tools')
        )
    }
}

export default Tools;