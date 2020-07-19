import React from 'react';
import HomeLayout from '../Components/layauts/HomeLayout';

class Subject extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            subjectID: null
        };
    }

    componentDidMount() {
        let {subjectID} = this.props.match.params;
        if(!subjectID){
            this.setState({loading: false, error: 'No subject'});
            return
        }
        this.setState({loading: false, subjectID: subjectID});
    }

    render(){
        if(this.state.loading) return 'Loading...';
        if(this.state.error) return <h1>{this.state.error}</h1>;

        return (
            <HomeLayout>
                <p>Subject: {this.props.match.params.subjectID}</p>
            </HomeLayout>
        )
    }
}

export default Subject;