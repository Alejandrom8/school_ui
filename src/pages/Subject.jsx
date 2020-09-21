import React from 'react';

import { connect } from 'react-redux';
import * as homeActions from '../state/actions/homeActions';
import * as subjectActions from '../state/actions/subjectActions';
import {isEmpty} from '../util/validators';
import {
    Tabs,
    Tab,
    Box,
    makeStyles
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}));

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function VerticalTabs(props) {
    const classes = useStyles();

    return (
        <div className="subjectTabs">
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={props.value}
                indicatorColor="primary"
                onChange={props.onChange}
                aria-label="options"
                className={classes.tabs}
            >
                <Tab label="Información" {...a11yProps(0)} />
                <Tab label="Actividades" {...a11yProps(1)} />
                <Tab label="Calificación" {...a11yProps(2)} />
                <Tab label="Horario" {...a11yProps(3)} />
            </Tabs>
            <div className="subjectTabs__options">
                {props.children}
            </div>
        </div>
    )
}

class Subject extends React.Component {

    constructor(props) {
        super();
        this.state = {
            data: {},
            config: {},
            modules: [],
            loading: true,
            error: null,
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

        const {scheduledSubjectID} = this.props.match.params;
        let index, subjectID;
        if(!this.evalRecivedId(scheduledSubjectID)) return;
        if(!([index, subjectID] = this.selectSubject(scheduledSubjectID))) return;
        if(!(
            "config" in this.props.subjectReducer.subjects[index] && 
            "modules" in this.props.subjectReducer.subjects[index]
        )){
            await this.preloadData(subjectID, scheduledSubjectID);
        }

        this.setState({
            ...this.props.subjectReducer.subjects[index],
            loading: false
        });
    }

    evalRecivedId(scheduledSubjectID) {
        if(!scheduledSubjectID){
            this.setState({loading: false, error: 'No subject'});
            return false
        }
        return true
    }

    selectSubject(scheduledSubjectID) {
        let index = this.props.subjectReducer.subjects.findIndex(sub => {
            return sub.scheduledSubjectID === scheduledSubjectID;
        });

        if(index < 0) {
            this.setState({loading: false, error: 'No subject'});
            return
        }
        let data = [
            index, 
            this.props.subjectReducer.subjects[index].data.subjectID
        ];
        return data;
    }

    async preloadData(subjectID, scheduledSubjectID) {
        await Promise.all([
            this.props.getSubjectModules(scheduledSubjectID, subjectID),
            this.props.getSubjectConfig(scheduledSubjectID)
        ]);
    }

    handleViewChange(event, newVal) {
        this.setState({
            value: newVal
        })
    }

    async handleSubjectUpdate(data) {
        let action = {
            ...data, 
            scheduledSubjectID: this.state.scheduledSubjectID
        };
        this.props.updateSubject(action);
    }

    async handleActivityUpdate(data) {
        this.props.updateActivityState(
            this.state.scheduledSubjectID,
            data.activityID,
            data.state
        );
    }

    async handlePonderationAdded(ponderation) {
        ponderation.calif = parseInt(ponderation.calif);
        ponderation.weight = parseInt(ponderation.weight);
        await this.props.addPonderation(
            this.state.scheduledSubjectID,
            ponderation
        );
    }

    render() {
        if(this.state.loading) return <Loading />;
        if(this.state.error) return <h5>{this.state.error}</h5>;

        return (
            <HomeLayout>
                <div className="subjectView">
                    <VerticalTabs onChange={this.handleViewChange} value={this.state.value}>         
                        <TabPanel value={this.state.value} index={0}>
                            <SubjectHeader
                                subject={this.state.data}
                                onUpdate={this.handleSubjectUpdate}
                                color={this.state.data.color}
                            />
                        </TabPanel>
                        {this.state.modules.length && (
                            <TabPanel value={this.state.value} index={1}>
                                <Unities
                                    modules={this.state.modules}
                                    progress={this.state.config.activitiesProgress}
                                    onChecked={this.handleActivityUpdate}
                                />
                            </TabPanel>
                        )}
                        <TabPanel value={this.state.value} index={2}>
                            <SubjectCalificationForm
                                califications={this.state.data.califications}
                                onPonderationAdded={this.handlePonderationAdded}
                            />
                        </TabPanel>
                        <TabPanel value={this.state.value} index={3}>
                            <Schedule
                                subject={this.state.data}
                                onClick={(s) => console.log(s)}
                            />
                        </TabPanel>
                    </VerticalTabs>
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
