import { combineReducers } from 'redux';

//reducers
import homeReducer from './homeReducer';
import subjectReducer from './subjectReducer';

export default combineReducers({
    homeReducer,
    subjectReducer
});