import {host} from './host'
console.log(host)

export const newClient = async (data) => {
    data.created = new Date();
    data.last_modified = new Date();

    if(data.client_notes !== ''){
        data.notes.push({
            date: new Date(),
            note: data.client_notes
        });
    }
    
    delete data.client_notes;

    let response = await fetch(`http://${host}/new-client`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log(result)
}