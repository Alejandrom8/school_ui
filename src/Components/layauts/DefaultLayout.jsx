import React, { Component } from 'react';
import Menu from '../mainCmts/Menu';

import 'materialize-css/dist/css/materialize.css';

class DefaultLayout extends Component{
    render(){
        return (
            <React.Fragment>
                <Menu />
                <div className="container">
                    { this.props.children }
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultLayout;