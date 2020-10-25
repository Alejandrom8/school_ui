import {
  GET_SUBJECT,
  ERROR,
  ADD_TO_SUBJECT,
  ADD_PONDERATION,
  SUBJECT_UPDATED,
  ACTIVITY_STATE_UPDATE,
  GET_SEMESTER_SUBJECTS
} from '../types/subjectTypes'

import {
  insertSubject,
  addToSubject,
  addPonderation,
  updateSubjectData,
  updateActivityState
} from '../modifiers/subjectModifiers'

/**
 * subjects[] = array of objects
 * (HOME) subjects[].scheduledSubjectID = string
 * (HOME) subjects[].data = object - the info of the subject
 * subjects[].config = object - the config of the subject
 * subjects[].modules = array of objects - the modules and activities for this subject.
 */
const INITIAL_STATE = {
  subjects: [],
  redirect: false,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEMESTER_SUBJECTS:
      return {
        ...state,
        subjects: action.payload
      }
    case GET_SUBJECT:
      return {
        ...state,
        subjects: insertSubject(state.subjects, action.payload)
      }
    case ADD_TO_SUBJECT:
      return {
        ...state,
        subjects: addToSubject(state.subjects, action.payload)
      }
    case ADD_PONDERATION:
      return {
        ...state,
        subjects: addPonderation(state.subjects, action.payload)
      }
    case SUBJECT_UPDATED:
      return {
        ...state,
        subjects: updateSubjectData(state.subjects, action.payload)
      }
    case ACTIVITY_STATE_UPDATE:
      return {
        ...state,
        subjects: updateActivityState(state.subjects, action.payload)
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default: return state
  }
}
