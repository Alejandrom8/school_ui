import React from 'react';
import HomeLayout from '../Components/layauts/HomeLayout';
import { Semester } from '../api/Api';

class Subject extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            info: undefined
        };
        this.getSubjectInfo = this.getSubjectInfo.bind(this);
    }

    componentDidMount() {
        let {semesterID, subjectID} = this.props.match.params;
        console.log(semesterID, subjectID);
        if(!semesterID || !subjectID){
            this.setState({loading: false, error: 'No subject'});
            return
        }
        this.getSubjectInfo(semesterID, subjectID);
    }

    async getSubjectInfo(semester, subject){
        this.setState({loading: true, error: null});

        let result =  await Semester.getSubject(semester, subject);

        if(!result){
            this.setState({loading: false, error: 'No se pudo contactar con el servidor'});
            return
        }else if(!result.success){
            this.setState({loading: false, error: result.errors});
            return
        }

        this.setState({loading: false, info: result.data});
    }

    render(){
        if(this.state.loading) return 'Loading...';
        if(this.state.error) return <h1>{this.state.error}</h1>;

        return (
            <HomeLayout>
                <p>Subject: {this.state.info.nombre}</p>
            </HomeLayout>
        )
    }
}

export default Subject;