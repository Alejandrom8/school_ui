import React from 'react';
import Menu from "../home/Menu";

import { User } from '../../api/Api';

import 'materialize-css/dist/css/materialize.css';
import '../styles/homeLayout.css';

function HomeLayout(props){

    const handleSessionClosed = async () => {
        let sessionToken = localStorage.getItem('token');
		await User.closeSession(sessionToken);
		localStorage.removeItem('token');
		props.history.push('/');	
    };

    return (
        <div id="homeLayout">
            <div>
                <Menu onSessionClosed={handleSessionClosed} />
            </div>
            <div className="Page__container">
                {props.children}
            </div>
        </div>
    )
}

export default HomeLayout;