// imports
import React, {useState, useEffect} from 'react'
import {getClients as getClientsFromDB, /*searchForClient as searchForClientInDB, */getArchivedClients as getArchivedClientsFromDB} from '../db/read.js'

// contexts
import ClientContext from '../context/ClientContext'

// components
import ClientNav from '../nav/ClientNav'
// import SearchClients from '../components/clients/SearchClients'
// import ClientArchive from '../components/clients/ClientArchive'
// import AddNewClient from '../components/clients/AddNewClient'
// import ViewClientInfo from '../components/clients/ViewClientInfo'
// import AlternatingList from '../components/ui_components/AlternatingList'

// modules
// const _ = require('lodash')


function Clients() {
    // const [clientNav, setClientNav] = useState('client_home')
    // const [clientNav, setClientNav] = useState('client_new')
    const [clientsFromDb, setClientsFromDb] = useState(null)
    const [archivedClientsFromDb, setArchivedClientsFromDb] = useState(null)
    const [clientViewData, setClientViewData] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [newClientFormData, setNewClientFormData] = useState({})


    // const [forceUpdate, setForceUpdate] = useState(true)

    // const handleEditClient = (e) => {
    //     console.log("edited client")

    //     let dataAttributes = {
    //         value: e.target.getAttribute("data-value"),
    //         id: e.target.getAttribute("data-id"),
    //         action: e.target.getAttribute("data-action")
    //     }

    //     let clientData = _.find(clientsFromDb, function(o){ return o._id === dataAttributes.id; })
    //     setClientViewData(clientData)
    //     // setClientNav('client_view')
    // }

    // const handleDeleteClient = (e) => {
    //     console.log("deleted client")
    //     console.log(e.target)
    // }

    const getClientsOnLoad = async () => {
        let clientList = await getClientsFromDB()
        setClientsFromDb(JSON.parse(clientList))
    }
    const getClientArchiveOnLoad = async () => {
        let clientList = await getArchivedClientsFromDB()
        setArchivedClientsFromDb(JSON.parse(clientList))
    }
    
    useEffect(()=>{
        getClientsOnLoad()
        getClientArchiveOnLoad()
    }, [])
    
    return(
        <ClientContext.Provider value={{getClientsOnLoad, clientsFromDb, setClientsFromDb, archivedClientsFromDb, setArchivedClientsFromDb, clientViewData, setClientViewData, searchResult, setSearchResult, newClientFormData, setNewClientFormData}}>
            <ClientNav />
        </ClientContext.Provider>
    )
}

export default Clients

// TODO
/*
    Client Data Items
    - Client Type = [Realtor, Resident, Other]
    - Client Status = [Active, Inactive, Preferred, Blacklisted]
    - Client Origination = [online, referral, other]
    - Business Name
    - Business Address
    - Business Phone Number
    - Business Address
    - Mailing Address
    - Contact Name
    - Contact Cell Phone
    - Contact Email Address
    - Additional Email Addresses
    - Preferred Payment Method = [Credit, Check, Cash]
    - Client Notes (add dated notes)
    - Client Alert (shown at top of client account page)
    - Referrals (show all referrals this client has made)

    Summary
    - past inspections by date
    - payment history by date
    - total historical dollar amt of all transactions
    - avg num of inspections per month
    - avg dollar amount per month
*/


