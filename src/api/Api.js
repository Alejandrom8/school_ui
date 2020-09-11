import config from './api.config';

export async function callApi(endpoint, method='GET', data = null) {
    let token = localStorage.getItem('token') || null;
    if(!token) return 'User is not authenticated';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const credentials = {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    if(data && method !== 'GET') {
        credentials.body = JSON.stringify(data);
    }

    try {
        const request = await fetch(config.url + endpoint, credentials);
        if(!request.ok) throw new Error("No se logro contactar con el servidor");
        return await request.json();
    } catch(error) {
        console.log(error);
    }
}

//Auth
export class Auth {
    static async signUp(data) {
        return await callApi('/signup', 'POST', data);
    }

    static async signIn(email, password) {
        return await callApi(
            '/signin',
            'POST',
            { email, password }
        )
    }
}

//User
export class User {
    static async getUser() {
        return await callApi(`/user`);
    }

    static async getUserSemesters() {
        return await callApi(`/semester/userID`);
    }
}

//Semester
export class Semester {
    static async createSemester(semester) {
        return await callApi(`/semester`, 'POST', semester);
    }

    static async getCompleteSemesterSubjects(semesterID) {
        let url = `/semester/${semesterID}/subjects/complete`;
        return await callApi(url);
    }

    static async getSemesterCalifications(semesterID) {
        let url = `/semester/${semesterID}/califications`;
        return await callApi(url);
    }
}

//subject
export class Subject {
    static async getSubjectsForSemester(semesterID) {
        let url = `/subject/semesterID/${semesterID}`;
        return await callApi(url);
    }

    static async getSubjectModules(subjectID) {
        let url = `/subject/${subjectID}/modules`;
        return await callApi(url);
    }
}

//ScheduledSubject
export class ScheduledSubject {
    static async updateSubjectCalif(scheduledSubjectID, calif) {
        let url = `/scheduledSubject/${scheduledSubjectID}/subjectCalif`;
        return await callApi(url, 'PUT', {calif});
    }

    static async updateActivityCalif(scheduledSubjectID, activityID, calif) {
        let url = `/scheduledSubject/${scheduledSubjectID}/activityCalif`;
        return await callApi(url, 'PUT', {
            activityID: activityID,
            calif: calif
        });
    }

    static async updatePonderations(scheduledSubjectID, ponderation) {
        let url = `/scheduledSubject/${scheduledSubjectID}/ponderation`;
        return await callApi(url, 'PUT', {
            ponderation: ponderation
        });
    }
}