import * as API from '../../api/Api';
import { 
    GET_INFO, 
    REDIRECT, 
    ERROR, 
    CHANGE_SEMESTER,
    GET_SEMESTERS, 
    GET_SEMESTER_ELEMENTS 
} from '../types/homeTypes';

//el que dispara la llamada y contacta al reducer para 
//hacer el cambio de estado
export const getUserInfo = () => async (dispatch) => {
    try {
        let result = await API.User.getUser();

        if(!result) throw new Error('La respuesta del servidor esta vacia');
        if(!result.success) {
            dispatch({
                type: REDIRECT,
                payload: true
            });
            return;
        }

        dispatch({
            type: GET_INFO,
            payload: result.data
        });
    } catch(error) {
        dispatch({
            type: ERROR,
            payload: error
        });
    }
}

export const getSemesters = () => async (dispatch) => {
    try {
        let result = await API.User.getUserSemesters();
        if(!result) throw new Error('La respuesta del servidor esta vacia');
        if(!result.success) throw result.errors;

        dispatch({
            type: GET_SEMESTERS,
            payload: {
                semesters: result.data
            }
        });
    } catch(error) {
        dispatch({
            type: ERROR,
            payload: error
        });
    }
}

export const getSemesterElements = () => async (dispatch, getState) => {
    const {semesterID} = getState().homeReducer.selectedSemester;

    try {
        let results = {};

        let subjectsResult = await API
                                    .Semester
                                    .getCompleteSemesterSubjects(semesterID);

        if(!subjectsResult) throw new Error('La respuesta del servidor esta vacia');
        results.subjects = subjectsResult;

        dispatch({
            type: GET_SEMESTER_ELEMENTS,
            payload: results
        });
    } catch(error) {
        dispatch({
            type: ERROR,
            payload: error
        });
    }
};

export const changeSemester = (semesterID) => async (dispatch, getState) => {
    const selectedSemester = getState().homeReducer.semesters.find(s => {
        return s.semesterID === semesterID
    });
    dispatch({
        type: CHANGE_SEMESTER,
        payload: selectedSemester
    })
    getSemesterElements()(dispatch, getState);
}