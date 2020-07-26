import config from './config';

async function performRequest(dir, data = null){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')

    const credentials = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    if(data){
        credentials.method = "POST";
        credentials.body = JSON.stringify(data);
    }

    try{
        const request = await fetch(dir, credentials);
        if(!request.ok) throw new Error("No se logro contactar con el servidor");
        return await request.json();
    }catch(e){
        console.log(e);
    }
}

//Semester
export class Semester{
    static async getSemester(semesterID){
        let url = `${config.url}/semester/${semesterID}`;
        return await performRequest(url);
    }

    static async getSubject(semester, subject){
        let url = `${config.url}/semester?semesterID=${semester}&subjectID=${subject}`;
        return await performRequest(url);
    }
}

//User
export class User {
    static async logIn(email, password) {
        let url = `${config.url}/sign_in`;
        let data = {email: email, password: password};
        return await performRequest(url, data);
    }

    static async signUp(data){
        let url = `${config.url}/user/create`;
        return await performRequest(url, data);
    }

    static async getInfo(token){
        const url = `${config.url}/user?token=${token}`;
        return await performRequest(url);
    }
}

export default performRequest;