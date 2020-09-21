import * as API from '../../api/Api';
import { 
    ADD_PONDERATION,
    ERROR, 
    ADD_TO_SUBJECT,
    SUBJECT_UPDATED,
    GET_SEMESTER_SUBJECTS,
    ACTIVITY_STATE_UPDATE
} from '../types/subjectTypes';

export const getSemesterSubjects = semesterID => async dispatch => {
    await API
            .Semester
            .getCompleteSemesterSubjects(semesterID)
            .then(result => {
                dispatch({
                    type: GET_SEMESTER_SUBJECTS,
                    payload: result.data
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            });
}

export const getSubjectModules = (scheduledSubjectID, subjectID) => async (dispatch) => {
    await API
            .Subject
            .getSubjectModules(subjectID)
            .then(result => {
                dispatch({
                    type: ADD_TO_SUBJECT,
                    payload: {
                        scheduledSubjectID,
                        addType: 'modules',
                        data: result
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            });
};

export const getSubjectConfig = scheduledSubjectID => async dispatch => {
    await API
            .Configuration
            .getSubjectConfig(scheduledSubjectID)
            .then(result => {
                dispatch({
                    type: ADD_TO_SUBJECT,
                    payload: {
                        scheduledSubjectID,
                        addType: 'config',
                        data: result.data
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            })
}

export const addPonderation = (scheduledSubjectID, ponderation) => async (dispatch) => {
    await API
            .ScheduledSubject
            .updatePonderations(scheduledSubjectID, ponderation)
            .then(result => {
                if(!result.success) throw new Error(result.errors);
                dispatch({
                    type: ADD_PONDERATION,
                    payload: {
                        scheduledSubjectID,
                        ponderation: ponderation
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                });
            });
};

export const updateSubject = ({scheduledSubjectID, name, value}) => async (dispatch) => {
    await API
            .ScheduledSubject
            .update(scheduledSubjectID, {elementName: name, elementValue: value})
            .then(() => {
                dispatch({
                    type: SUBJECT_UPDATED,
                    payload: {
                        scheduledSubjectID,
                        elementName: name,
                        elementValue: value
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            });
};

export const updateActivityState = (scheduledSubjectID, activityID, state) => async (dispatch) => {
    await API
            .Configuration
            .updateActivityState(scheduledSubjectID, activityID, state)
            .then(result => {
                dispatch({
                    type: ACTIVITY_STATE_UPDATE,
                    payload: {
                        scheduledSubjectID,
                        activityID,
                        state
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                });
            });
};