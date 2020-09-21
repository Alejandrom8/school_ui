import config from './api.config';

export let token = null;
let tokenExpirationInterval = undefined;

/**
 * 
 * @param {object} param0
 * @param {string} param0.endpoint - where will be called the API.
 * @param {string} param0.method - the http method.
 * @param {boolean} [param0.requireAuth=true] - need to be logged in?
 * @param {object} param0.data - the data to be included in the request. 
 */
export async function callApi({endpoint, method='GET', requireAuth = true, data = null}) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if(requireAuth) {
        if(!token) return {
            success: false,
            errors: 'User is not authenticated'
        };
        headers.append('Authorization', `Bearer: ${token}`);
    }

    const credentials = {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    if(data && method !== 'GET') credentials.body = JSON.stringify(data);

    try {
        const request = await fetch(config.url + endpoint, credentials);
        if(!request.ok) throw request;
        return await request.json();
    } catch(error) {
        return {
            success: false,
            errors: error.statusText,
            redirect: error.redirected
        }
    }
}

function startExpiration() {
    tokenExpirationInterval = setTimeout(async () => {
        console.log("Updating tokens");
        let results = await Auth.refreshToken();
        console.log(results);
    }, 1000 * 60 * 15); //the expire time should come from the API
}

//Auth
export class Auth {

    static setTokens(result) {
        if(result.success) {
            token = result.data.token;
            localStorage.setItem('refresh_token', result.data.refresh_token);
            startExpiration();
        }
    }

    static async signUp(data) {
        let result = await callApi({
            endpoint: '/signup', 
            method: 'POST',
            requireAuth: false,
            data: data
        });

        Auth.setTokens(result);
        return result;
    }

    static async signIn(email, password) {
        let result = await callApi({
            endpoint: '/signin',
            method: 'POST',
            requireAuth: false,
            data: { email, password }
        });

        Auth.setTokens(result);
        return result;
    }

    static async refreshToken() {
        let rt;
        
        if(!(rt = localStorage.getItem('refresh_token'))){
            return {
                succes: false
            };
        }

        let data = {refresh_token: rt};
        let result = await callApi({
            endpoint: '/refresh_token',
            method: 'PATCH',
            data: data,
            requireAuth: false
        });
        token = result.data.token;
        startExpiration();
        return result;
    }

    static async logout() {
        clearTimeout(tokenExpirationInterval);
        token = null;
        localStorage.removeItem('refresh_token');
    }
}

//User
export class User {
    static async getUser() {
        return await callApi({endpoint: `/user`});
    }

    static async getHomeData() {
        let result = await callApi({endpoint: '/user/home'});
        if(!result.success) {
            result.redirect = true
        }
        return result;
    }

    static async updateSelectedSemester(semesterID) {
        return await callApi({
            endpoint: '/user/selectedSemester',
            method: 'PATCH',
            data: {semesterID}
        })
    }
}

//Semester
export class Semester {
    static async createSemester(semester) {
        return await callApi({
            endpoint: `/semester`, 
            method: 'POST', 
            data: semester
        });
    }

    static async getSemesterSubjects(semesterID) {
        return await callApi({
            endpoint: `/semester/${semesterID}/subjects`
        });
    }

    static async getCompleteSemesterSubjects(semesterID) {
        let url = `/semester/${semesterID}/subjects/complete`;
        return await callApi({endpoint: url});
    }
}

//subject
export class Subject {
    static async getSubjectsForSemester(semesterID) {
        let url = `/subject/semesterID/${semesterID}`;
        return await callApi({endpoint: url});
    }

    static async getSubjectModules(subjectID) {
        let url = `/subject/${subjectID}/modules`;
        return await callApi({endpoint: url});
    }
}

//ScheduledSubject
export class ScheduledSubject {
    static async update(scheduledSubjectID, {elementName, elementValue}) {
        return await callApi({
            endpoint: `/scheduledSubject/${scheduledSubjectID}`, 
            method: 'PATCH', 
            data: {elementName, elementValue}
        });
    }

    static async updateActivityCalif(scheduledSubjectID, activityID, calif) {
        let url = `/scheduledSubject/${scheduledSubjectID}/activityCalif`;
        return await callApi({
            endpoint: url, 
            method: 'PUT',
            data: {
                activityID: activityID,
                calif: calif
            }
        });
    }

    static async updatePonderations(scheduledSubjectID, ponderation) {
        return await callApi({
            endpoint: `/scheduledSubject/${scheduledSubjectID}/ponderation`, 
            method: 'PUT',
            data: {ponderation: ponderation}
        });
    }
}

//Configuration
export class Configuration {
    static async updateActivityState(scheduledSubjectID, activityID, state) {
        return await callApi({
            endpoint: `/configuration/scheduledSubject/${scheduledSubjectID}/activityState`,
            method: 'PUT',
            data: {activityID, state: state}
        });
    }

    static async getSubjectConfig(scheduledSubjectID) {
        return await callApi({
            endpoint: `/configuration/scheduledSubject/${scheduledSubjectID}`
        });
    }

    static async setSelectedSemester(semesterID) {
        return await callApi({
            endpoint: `/configuration/selectedSemester`,
            method: 'PATCH',
            data: {semesterID}
        });
    }
}