import React, {useState, useEffect} from 'react'
import ClientContext from '../../context/ClientContext'
import AlternatingList from '../ui_components/AlternatingList'

import {getArchivedClients as getArchivedClientsFromDB} from '../../db/read'


function ClientArchivePage() {
    const [archivedClientsFromDB, setArchivedClientsFromDB] = useState(null)

    useEffect(()=>{
        clientArchivePageOnLoad()
        
    },[])

    const clientArchivePageOnLoad = async () => {
        let archivedClientsJSON = await getArchivedClientsFromDB()
        let archivedClients = JSON.parse(archivedClientsJSON)

        let filteredArchivedClients = archivedClients.filter(item => {
            return item.client_status === 'archived'
        })
        
        setArchivedClientsFromDB(filteredArchivedClients)
    }

    return (
        <>
            <nav aria-label="breadcrumb" className="">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/clients">Clients</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Archive</li>
                </ol>
            </nav>
            <h3>
                Client Archive
            </h3>
            <div className="py-2">
                <AlternatingList {...{
                    dataObject: ((!archivedClientsFromDB)? ([]) : (archivedClientsFromDB.map(item => { 
                                return ({value: (item.business_name || item.contact_name), _id: item._id})
                        }))), 
                    edit: null, 
                    _delete: null, 
                    buttons: {show: false, edit: false, _delete: false}}}/>
            </div>
        </>
    )
}

export default ClientArchivePage
