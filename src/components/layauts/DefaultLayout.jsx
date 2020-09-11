import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.css';

class DefaultLayout extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="container">
                    { this.props.children }
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultLayout;