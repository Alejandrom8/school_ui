import * as API from '../../api/Api';
import { 
    GET_MODULES,
    ERROR
} from '../types/subjectTypes';

export const getSubjectModules = (subjectID) => (dispatch) => {
    API.Subject.getSubjectModules(subjectID)
        .then(result => {
            if(!result)
                throw new Error('La resupuesta del servidor para get_activities esta vacia');
            
            dispatch({
                type: GET_MODULES,
                payload: {
                    scheduledSubjectID: subjectID,
                    modules: result
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

export const updateSubjectCalif = (subjectID, calif) => (dispatch) => {
    API.ScheduledSubject.updateSubjectCalif(subjectID, calif)
        .then(result => {
            if(!result) throw new Error('The server has no responded');
            if(!result.success) throw new Error(result.errors);
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: error
            })
        })
};

export const addPonderation = (scheduledSubjectID, ponderation) => async (dispatch) => {
    try{
        const result = await API.ScheduledSubject.updatePonderations(
            scheduledSubjectID,
            ponderation
        );
        if(!result) throw new Error('The server has no responded');
        if(!result.success) throw new Error(result.errors);
        
        return result;
    }catch(error){
        dispatch({
            type: ERROR,
            payload: error
        });
    }
};