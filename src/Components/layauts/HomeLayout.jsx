import React from 'react';
import Menu from "../home/Menu";

class HomeLayout extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            username: ''
        }
    }

    componentDidMount() {
        let username = localStorage.getItem('username');
        this.setState({username: username});
    }

    render(){
        return (
            <React.Fragment>
                <Menu username={this.state.username} />
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default HomeLayout;