import React from 'react';

import { connect } from 'react-redux';
import * as homeActions from '../state/actions/homeActions';
import * as subjectActions from '../state/actions/subjectActions';
import {isEmpty} from '../util/validators';
import {
    Tabs,
    Tab,
    Box
} from '@material-ui/core';

import HomeLayout from '../components/layauts/HomeLayout';
import Loading from '../components/Loading';
import SubjectHeader from '../components/home/SubjectHeader';
import Unities from '../components/home/Unities';
import SubjectCalificationForm from '../components/home/SubjectCalificationForm';
import Schedule from '../components/Schedule';

import './styles/Subject.css';
import '../components/styles/ToolBar.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
            {children}
        </Box>
      )}
    </div>
  );
}


class Subject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            info: undefined,
            modules: null,
            value: 0
        };
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleSubjectUpdate = this.handleSubjectUpdate.bind(this);
        this.handleActivityUpdate = this.handleActivityUpdate.bind(this);
        this.handlePonderationAdded = this.handlePonderationAdded.bind(this);
    }

    async componentDidMount() {
        if(isEmpty(this.props.homeReducer.user)) {
            this.props.history.push('/home');
            return;
        }

        const {subjectID} = this.props.match.params;

        if(!this.evalRecivedId(subjectID)) return;
        if(!this.selectSubject(subjectID)) return;
        if(!this.checkSubjectExistence(subjectID)) {
            await this.preloadData(subjectID);
        }
    }

    evalRecivedId(subjectID) {
        if(!subjectID){
            this.setState({loading: false, error: 'No subject'});
            return false
        }
        return true
    }

    selectSubject(subjectID) {
        let info = this.props.homeReducer.subjects.find(sub => {
            return sub.subjectID === subjectID;
        });

        if(!info) {
            this.setState({loading: false, error: 'No subject'});
            return
        }
        this.setState({info: info});
        return info;
    }

    checkSubjectExistence(subjectID) {
        if(isEmpty(this.props.subjectReducer.modules)){
            return false
        }

        let subjectModules = this.props.subjectReducer.modules[subjectID];
        if(subjectModules) {
            this.setState({
                modules: subjectModules,
                loading: false
            });
            return true;
        }

        return false;
    }

    async preloadData(subjectID) {
        await this.props.getSubjectModules(subjectID);
        this.setState({
            loading: false,
            modules: this.props.subjectReducer.modules[subjectID]
        });
    }

    async handleSubjectUpdate(data) {
        let {scheduledSubjectID} = this.state.info;
        this.props.updateSubjectCalif(scheduledSubjectID, data.value);
    }

    async handleActivityUpdate(data) {
        let {scheduledSubjectID} = this.state.info;
        this.props.updateActivityCalif(
            scheduledSubjectID,
            data.activityID,
            data.value
        );
    }

    a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleViewChange(event, newVal) {
        this.setState({
            value: newVal
        })
    }

    async handlePonderationAdded(ponderation) {
        ponderation.calif = parseInt(ponderation.calif);
        ponderation.weight = parseInt(ponderation.weight);

        let result = await this.props.addPonderation(
            this.state.info.scheduledSubjectID,
            ponderation
        );
        await this.props.getSemesterElements();
        this.selectSubject(this.state.info.subjectID);
        return result;
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <h5>{this.state.error}</h5>;

        return (
            <HomeLayout>
                <div className="subjectView">
                    <SubjectHeader
                        subject={this.state.info}
                        onUpdate={this.handleSubjectUpdate}
                    />
                    <div className="">
                        <div className="switcher">
                            <Tabs value={this.state.value} onChange={this.handleViewChange} aria-label="simple tabs example">
                                <Tab label="Actividades" {...this.a11yProps(0)} />
                                <Tab label="Calificación" {...this.a11yProps(1)} />
                                <Tab label="Horario" {...this.a11yProps(2)} />
                            </Tabs>
                        </div>
                        <TabPanel value={this.state.value} index={0}>
                            <Unities
                                modules={this.state.modules}
                                onUpdate={this.handleActivityUpdate}
                            />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1}>
                            <SubjectCalificationForm
                                califications={this.state.info.califications}
                                onPonderationAdded={this.handlePonderationAdded}
                            />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Schedule
                                subject={this.state.info}
                                onClick={(s) => console.log(s)}
                            />
                        </TabPanel>
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
    ...subjectActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
