import React from 'react'
import {  
        BrowserRouter as Router,
        Switch,
        Route
    } from 'react-router-dom'

import ClientHomePage from '../components/clients/ClientHomePage'
import ClientArchivePage from '../components/clients/ClientArchivePage'
import ClientNewPage from '../components/clients/ClientNewPage'
import ClientViewPage from '../components/clients/ClientViewPage'

function ClientNav(props) {
    // const [newClientFormData, setNewClientFormData] = useState({
    //     created: "",
    //     last_modified: "",
    //     client_type: "",
    //     client_type_other: "",
    //     client_status: "",
    //     client_source: "",
    //     client_source_other: "",
    //     preferred_payment_type: "",
    //     business_name: "",
    //     business_phone: "",
    //     business_address_street: "",
    //     business_address_unit: "",
    //     business_address_city: "",
    //     business_address_state: "",
    //     business_address_zip: "",
    //     contact_name: "",
    //     contact_phone: "",
    //     contact_email_primary: "",
    //     contact_email_secondary: "",
    //     client_address_street: "",
    //     client_address_unit: "",
    //     client_address_city: "",
    //     client_address_state: "",
    //     client_address_zip: "",
    //     notes: []
    // })

    return(
        <>
            <Router>
                <Switch>
                    <Route path='/clients' exact>
                        <ClientHomePage />
                    </Route>
                    <Route path='/clients/archive' exact>
                        <ClientArchivePage />
                    </Route>
                    <Route path='/clients/new' exact>
                        <ClientNewPage />
                    </Route>
                    <Route path='/clients/view/:id'>
                        <ClientViewPage />
                    </Route>
                </Switch>
            </Router>
        </>
    )

    // if(page === undefined){
    //     return (
    //         <>
    //         {/* <ClientContext.Provider value={{newClientFormData, setNewClientFormData, clientsFromDb, setClientsFromDb, searchForClientInDB, handleEditClient}}> */}
    //             <ClientHomePage />
    //         {/* </ClientContext.Provider> */}

    //         </>
    //     )
    // } else if(page === 'new') {
    //     return (
    //         // <ClientContext.Provider value={{newClientFormData, setNewClientFormData, clientsFromDb, setClientsFromDb, clientNav, setClientNav, getClientsOnLoad}}>
    //             <ClientNewPage />
    //         // </ClientContext.Provider>

    //     )
    // } else if(page === 'view'){
    //     return(
    //         <>
    //             <ClientViewPage />
    //         </>
    //     )
    // } else if(page === 'archive'){
    //     return(
    //         <>
    //             <ClientArchivePage />
    //         </>
    //     )
    // }
}

export default ClientNav
