import * as API from '../../api/Api';
import {
    GET_HOME,
    GET_INFO, 
    REDIRECT, 
    ERROR, 
    CHANGE_SEMESTER
} from '../types/homeTypes';


export const getHomeData = () => async (dispatch) => {
    try {
        let result = await API.User.getHomeData();
        if(!result.success) throw result;
        dispatch({
            type: GET_HOME,
            payload: result.data
        });
    } catch(error) {
        if(error.redirect){
            dispatch({
                type: REDIRECT,
                payload: true
            })
            return;
        }
        dispatch({
            type: ERROR,
            payload: error.errors
        })
    }
};

//el que dispara la llamada y contacta al reducer para 
//hacer el cambio de estado
export const updateUser = () => async (dispatch) => {
    await API.User.getUser()
            .then(result => {
                dispatch({
                    type: GET_INFO,
                    payload: result.data
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            });
};

export const changeSemester = (semesterID) => async (dispatch) => {
    await API
            .Configuration
            .setSelectedSemester(semesterID)
            .then(result => {
                dispatch({
                    type: CHANGE_SEMESTER,
                    payload: {
                        selectedSemester: semesterID,
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            })
};