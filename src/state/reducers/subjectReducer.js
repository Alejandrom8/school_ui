import { GET_MODULES, ERROR } from '../types/subjectTypes';

const INITIAL_STATE = {
    modules: {}
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_MODULES:
            let { modules } = state;
            let { scheduledSubjectID } = action.payload;
            modules[scheduledSubjectID] = action.payload.modules;

            return {    
                ...state,
                modules
            }
        case ERROR:
            return {...state, error: action.payload}
        default: return state;
    }
}