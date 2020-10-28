import {host} from './host'
console.log(host)

export const getClients = async () => {
    let response = await fetch(`http://${host}/recent-clients`)
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

