import {
    GET_HOME,
    GET_INFO,
    REDIRECT,
    ERROR, 
    CHANGE_SEMESTER
} from '../types/homeTypes';

import {
    getSemester
} from '../modifiers/homeModifiers';

const INITIAL_STATE = {
    user: null,
    configuration: {},
    selectedSemester: null,
    semesters: [],
    redirect: false,
    error: null
};

const homeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_HOME:
            return {
                ...state,
                ...action.payload,
                selectedSemester: getSemester(
                    action.payload.semesters,
                    action.payload.configuration.selectedSemester
                )
            }
        case GET_INFO:
            return {
                ...state, 
                user: action.payload
            };
        case CHANGE_SEMESTER:
            return {
                ...state,
                selectedSemester: getSemester(
                    state.semesters, 
                    action.payload.selectedSemester
                )
            };
        case REDIRECT:
            return {
                ...state,
                redirect: action.payload
            };
        case ERROR:
            return {
                ...state, 
                error: action.payload
            };
        default: return state;
    }
}

export default homeReducer;