import React, {Component} from 'react';
import config from '../config';
import { Redirect } from 'react-router-dom';
import HomeLayout from '../Components/layauts/HomeLayout';
import SubjectsBar from '../Components/home/SubjectsBar';
import Feed from '../Components/home/Feed';

import 'materialize-css/dist/css/materialize.css';
import './styles/Home.css';

class Home extends Component{

    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            loading: false,
            redirect: false,
            user: {
                "name": "Alejandro Gómez García",
                "email": "alex@gmail.com",
                "semester": "3",
                "subjects": [
                    {
                        "nombre": "RECURSOS HUMANOS",
                        "clave": "1260"
                    },
                    {
                        "nombre": "CONCEPTOS JURIDICOS FUNDAMENTALES",
                        "clave": "1151"
                    },
                    {
                        "nombre": "ENTORNO DE LAS ORGANIZACIONES",
                        "clave": "1347"
                    },
                    {
                        "nombre": "INFORMATICA III (ANALISIS Y DISEÑO DE SISTEMAS ESTRUCTURADO)",
                        "clave": "1348"
                    },
                    {
                        "nombre": "MATEMÁTICAS III (CÁLCULO DIFERENCIAL E INTEGRAL)",
                        "clave": "1349"
                    },
                    {
                        "nombre": "PROGRAMACIÓN (ESTRUCTURA DE DATOS)",
                        "clave": "1361"
                    },
                    {
                        "nombre": "ARQUITECTURA DE COMPUTADORAS",
                        "clave": "1364"
                    }
                ]
            }
        }
    }

    /*componentDidMount(){
        this.getUserData(function (result){
            console.log(result);
            if(!result) {
                console.log('La respuesta del servidor esta vacia');
                return;
            }
            if(!result.success) {
                this.setState({
                    loading: false,
                    redirect: true
                });
                return;
            }
            this.setState({
                user: result.data,
                loading: false
            });
        }.bind(this));
    }*/

    getUserData(callback){
        const url = `${config.api}/user?token=${this.token}`;
        fetch(url)
            .then( data => {
                if(!data.ok) console.log('no se obtuvo respuesta del servidor');
                data.json()
                    .then(result => callback(result));
            })
            .catch( err => {
                console.log(err);
            });
    }

    render(){
        if(this.state.loading) return <p>Cargando...</p>;
        if(this.state.redirect) return <Redirect to="/login" />;

        return (
            <HomeLayout username={this.state.user.name}>
                <div className="row main-content">
                    <aside className="col s3">
                        <SubjectsBar subjects={this.state.user.subjects} />
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