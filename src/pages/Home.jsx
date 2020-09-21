//Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';

//State management components
import * as homeActions from '../state/actions/homeActions';
import {getSemesterSubjects} from '../state/actions/subjectActions';
import {isEmpty} from '../util/validators';
import {token, Auth} from '../api/Api';

//Home components
import HomeLayout from '../components/layauts/HomeLayout';
import ProfileCard from '../components/home/ProfileCard';
import TodoBar from '../components/home/TodoBar';
import Feed from '../components/home/Feed';
import SubjectsBar from '../components/home/SubjectsBar';

//helper components
import Loading from '../components/Loading';
import Error from '../components/Error';

//Styles
import './styles/Home.css';


class Home extends Component {

    constructor(props) {
        super();
        this.state = {loading: true};
    }

    async componentDidMount() {
        if(!token) {
            let result = await Auth.refreshToken();
            if(!result.success) {
                this.props.history.push('/signin');
                return;
            }
        }

        if(isEmpty(this.props.homeReducer.user)) {
            await this.props.getHomeData();
            await this.props.getSemesterSubjects(this.props.homeReducer.configuration.selectedSemester);
        }

        if(this.props.redirect) {
            this.props.history.push('/signin');
            return
        } else {
            this.setState({loading: false});   
        }
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.props.homeReducer.error) return <Error error={this.props.homeReducer.error} />;

        const info = this.props.homeReducer;

        return (
            <HomeLayout>
                <div className="main-content">
                    <div className="row">
                        <aside className="col s3">
                            <ProfileCard
                                user={info.user}
                                semester={info.selectedSemester}
                                subjects={this.props.subjectReducer.subjects}
                            />
                        </aside>
                        <section className="col s6 ScrollerSection">
                            <TodoBar
                                todo={[0,1,2]}
                            />
                            <Feed />
                        </section>
                        <aside className="col s3">
                            <SubjectsBar
                                subjects={this.props.subjectReducer.subjects}
                            />
                        </aside>
                    </div>
                </div>
            </HomeLayout>
        )
    }
}

const mapStateToProps = ({homeReducer, subjectReducer}) => {
    return {
        homeReducer, 
        subjectReducer
    }
}
const mapDispatchToProps = {
    ...homeActions,
    getSemesterSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
