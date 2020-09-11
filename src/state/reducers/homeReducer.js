import { 
    GET_INFO,
    REDIRECT,
    ERROR, 
    GET_SEMESTERS, 
    CHANGE_SEMESTER,
    GET_SEMESTER_ELEMENTS 
} from '../types/homeTypes';

const INITIAL_STATE = {
    user: {},
    semesters: [],
    subjects: [],
    selectedSemester: null,
    califications: [],
    redirect: false,
    error: null
};

const homeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INFO:
            return {
                ...state, 
                user: action.payload
            };
        case GET_SEMESTERS:
            return {
                ...state, 
                semesters: action.payload.semesters,
                selectedSemester: action.payload.semesters[0]
            };
        case GET_SEMESTER_ELEMENTS: 
            return {
                ...state, 
                ...action.payload /** subjects */
            };
        case CHANGE_SEMESTER:
            return {
                ...state,
                selectedSemester: action.payload
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