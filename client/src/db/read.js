import {host} from './host'
// console.log(host)

// CLIENTS


export const getClientById = async (id) => {
    let response = await fetch(`http://${host}/client/${id}`)
    let result = await response.json();

    return result
}

export const getClients = async () => {
    let response = await fetch(`http://${host}/recent-clients`)
    let result = await response.json();
    // console.log(result)

    return result
}

export const getArchivedClients = async () => {
    let response = await fetch(`http://${host}/archived-clients`)
    let result = await response.json();
    // console.log(result)

    return result
}

export const searchForClient = async (clientName) => {
    console.log('searchForClient: ', clientName)
    var result;

    try {
        let response = await fetch(`http://${host}/search-for-client?client_search=${clientName}`)
        result = await response.json();
        console.log(response.status)
        console.log(result)
    } catch (err){
        console.log('ERROR', err)
    } finally {
        return result
    }
}



// INSPECTIONS
export const getInspectionById = async (id) => {
    let response = await fetch(`http://${host}/inspection/${id}`)
    let result = await response.json();

    return result
}

export const getScheduledInspections = async () => {
    let response = await fetch(`http://${host}/scheduled-inspections`)
    let result = await response.json();

    return result
}

export const getRecentInspections = async () => {
    let response = await fetch(`http://${host}/recent-inspections`)
    let result = await response.json();

    return result
}

/*
    INSPECTION STATUSES
    1. scheduled_inspection
    2. active_inspection
    3. completed_inspection
    4. completed_ica
    5. generated_report
*/