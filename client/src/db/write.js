import {host} from './host'
console.log(host)

export const newClient = async (data) => {
    data.created = new Date();
    data.last_modified = new Date();
    data['notes'] = []

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

export const newInspection = async (data) => {
    data.created = new Date();
    data.last_modified = new Date();

    let response = await fetch(`http://${host}/new-inspection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    return result
}


//PUT /client/:id
export const updateClientById = async (data) => {
    data.last_modified = new Date();
    let id = 1234 // get id from data obj

    let response = await fetch(`http://${host}/client/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log('client updated in db')
    console.log(result)
}

//DELETE /client/:id
export const deleteClientById = async (data) => {
    data.last_modified = new Date();
    let id = 1234 // get id from data obj

    let response = await fetch(`http://${host}/client/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log('client deleted from db')
    console.log(result)
}

//PUT /inspection/:id
export const updateInspectionById = async (data) => {
    data.last_modified = new Date();
    let id = 1234 // get id from data obj

    let response = await fetch(`http://${host}/inspection/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log('inspection updated in db')
    console.log(result)
}

//DELETE /inspection/:id
export const deleteInspectionById = async (data) => {
    data.last_modified = new Date();
    let id = 1234 // get id from data obj

    let response = await fetch(`http://${host}/inspection/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log('inspection deleted from db')
    console.log(result)
}


