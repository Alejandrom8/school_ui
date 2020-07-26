import React, {Component} from 'react';
import config from '../config';
import HomeLayout from '../Components/layauts/HomeLayout';
import SubjectsBar from '../Components/home/SubjectsBar';
import Feed from '../Components/home/Feed';
import { User } from '../api/Api';

import 'materialize-css/dist/css/materialize.css';
import './styles/Home.css';

class Home extends Component{

    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            loading: true,
            user: {}
        }
        this.getUserData = this.getUserData.bind(this);
    }

    componentDidMount(){
        this.getUserData();
    }

    async getUserData(){
        let result = await User.getInfo(this.token);
        if(!result) {
            console.log('La respuesta del servidor esta vacia');
            return
        }else if(!result.success) {
            this.props.history.push('/login');
            return
        }
        this.setState({
            user: result.data,
            loading: false
        });
    }

    render(){
        if(this.state.loading) return <p>Cargando...</p>;

        return (
            <HomeLayout username={this.state.user.name}>
                <div className="row main-content">
                    <aside className="col s3">
                        <SubjectsBar 
                            semester={this.state.user.semester} 
                            subjects={this.state.user.subjects} 
                        />
                    </aside>
                    <section className="col s6">
                        <Feed token={this.token} />
                    </section>
                    <aside className="col s3">
                        adios
                    </aside>
                </div>
            </HomeLayout>
        )
    }
}

export default Home;