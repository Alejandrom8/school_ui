exports.performRequest = async (dir, data = null) => {
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

        if(request.ok){
            return await request.json();
        }

        throw new Error("No se lograron enviar los datos");
    }catch(e){
        console.log(e);
    }
};