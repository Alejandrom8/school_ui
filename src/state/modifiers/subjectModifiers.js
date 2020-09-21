/**
 * 
 * @param {object[]} subjects 
 * @param {object} action
 * @param {object} action.subject 
 */
export function insertSubject(subjects, action) {
    let newArray = subjects.slice();
    newArray.splice(subjects.length, 0, action.subject);
    return newArray;
}

/**
 * 
 * @param {object[]} subjects 
 * @param {object} action
 * @param {string} action.scheduledSubjectID - the id of the subject
 * @param {string} action.addType - the name of the element to be inserted
 * @param {*} action.data - the data to be inserted in the subject 
 */
export function addToSubject(subjects, action) {
    return subjects.map(subject => {
        if(subject.scheduledSubjectID === action.scheduledSubjectID) {
            return {
                ...subject,
                [action.addType]: action.data
            }
        }
        return subject;
    });
}

/**
 * 
 * @param {object[]} subjects 
 * @param {object} action
 * @param {string} action.scheduledSubjectID - the id of the subject
 * @param {object[]} action.ponderation - the ponderation to be added
 */
export function addPonderation(subjects, action) {
    return subjects.map(subject => {
        if(subject.scheduledSubjectID === action.scheduledSubjectID) {
            let ponderations = subject.data.califications.ponderations;
            ponderations.push(action.ponderation);
            subject.data.califications.ponderations = ponderations;
            return subject;
        }
        return subject;
    });
}

function putInSubject(subject, elementName, elementValue) {
    switch(elementName) {
        case 'professorName':
            subject.data.professorName = elementValue;
            break;
        case 'subjectCalif':
            subject.data.califications.subjectCalif = elementValue;
            break;
        default:
            return subject;
    }
    return subject;
}

/**
 * 
 * @param {*} subjects 
 * @param {*} action 
 * @param {*} action.elementName
 * @param {*} action.elementValue
 */
export function updateSubjectData(subjects, action) {
    return subjects.map(subject => {
        if(subject.scheduledSubjectID === action.scheduledSubjectID) {
            return putInSubject(subject, action.elementName, action.elementValue);
        }
        return subject;
    });
}

/**
 * 
 * @param {object[]} subjects 
 * @param {object} action 
 * @param {string} action.scheduledSubjectID
 * @param {string} action.activityID
 * @param {boolean} action.state
 */
export function updateActivityState(subjects, action) {
    return subjects.map(subject => {
        if(subject.scheduledSubjectID === action.scheduledSubjectID) {
            let index = subject.config.activitiesProgress.findIndex(a => a.activityID === action.activityID);
            if (index >= 0) {
                subject.config.activitiesProgress[index].state = action.state;
            } else {
                let newProgress = {activityID: action.activityID, state: action.state};
                subject.config.activitiesProgress.push(newProgress);
            }
            return subject;
        }
        return subject;
    });
}