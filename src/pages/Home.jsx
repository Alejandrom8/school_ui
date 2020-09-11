//Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';

//State management components
import * as homeActions from '../state/actions/homeActions';
import {isEmpty} from '../util/validators';

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
        super(props);
        this.state = {loading: true};
    }

    async componentDidMount() {
        if(isEmpty(this.props.user)) await this.props.getUserInfo();

        if(!this.props.error) {
            if(this.props.redirect) {
                this.props.history.push('/login');
                return
            }

            if(isEmpty(this.props.semesters)) await this.props.getSemesters();

            if(!this.props.error) {
                if(isEmpty(this.props.subjects)) {
                    await this.props.getSemesterElements();
                }
            }
        }

        this.setState({loading: false});
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.props.error) return <Error error={this.props.error} />;

        return (
            <HomeLayout>
                <div className="main-content">
                    <div className="row">
                        <aside className="col s3">
                            <ProfileCard
                                user={this.props.user}
                                semester={this.props.selectedSemester}
                                subjects={this.props.subjects}
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
                                subjects={this.props.subjects}
                            />
                        </aside>
                    </div>
                </div>
            </HomeLayout>
        )
    }
}

const mapStateToProps = (reducers) => reducers.homeReducer;

export default connect(mapStateToProps, homeActions)(Home);
