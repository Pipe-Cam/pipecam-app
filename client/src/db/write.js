import {host} from './host'
// console.log(host)

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

    let result = await response.text();
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
export const updateInspectionById = async (id, data) => {
    console.log('write-data', JSON.stringify(data))
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
export const deleteInspectionById = async (id, data) => {
    data.last_modified = new Date();
    // let _id = 1234 // get id from data obj

    let response = await fetch(`http://${host}/inspection/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    let result = await response.json();
    console.log(response.status)
    console.log('inspection deleted from db')
    console.log(result)
}



// {
//     "overview": {
//         "inspection_date": "2020-10-28T19:00:00.000Z",
//         "client": "business 1",
//         "office_notes": "",
//         "prelisting": "no",
//         "online": "no",
//         "cc_attached": "no",
//         "check_num": "999",
//         "usb_num": "999",
//         "property_address": "asdf"
//     },
//     "status": "scheduled_inspection",
//     "client_id": "5f90bf92636e470d9beac36f",
//     "created": "2020-10-28T20:16:46.675Z",
//     "last_modified": "2020-10-30T15:41:02.670Z"
// }