import config from './config';

async function performRequest(dir, data = null){
    try{
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
        let url = `${config.url}/config/semester/${semesterID}`;
        return await performRequest(url);
    }
}

//User
export class User {
    static async logIn(email, password) {
        let url = `${config.url}/sign/in`;
        let data = {email: email, password: password};
        return await performRequest(url, data);
    }

    static async signUp(data){
        let url = `${config.url}/sign/up`;
        return await performRequest(url, data);
    }
}

export default performRequest;