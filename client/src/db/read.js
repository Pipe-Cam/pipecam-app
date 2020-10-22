import {host} from './host'
console.log(host)

export const getClients = async () => {
    let response = await fetch(`http://${host}/recent-clients`)
    let result = await response.json();
    // console.log(result)

    return result
}