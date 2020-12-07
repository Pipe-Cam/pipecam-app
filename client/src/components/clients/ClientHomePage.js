import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import ClientContext from '../../context/ClientContext'
import SearchClients from '../clients/SearchClients'
import AlternatingList from '../ui_components/AlternatingList'



function ClientHomePage() {
    const {clientsFromDb} = useContext(ClientContext)
    const history = useHistory()

    const handleRedirectToClientArchive = () => {
        history.push('/clients/archive/')
    }

    const handleEditClient = (id) => {
        history.push(`/clients/edit/${id}`)
    }

    const handleDeleteClient = (id) => {
        history.push(`/clients/delete/${id}`)
    }

    return (    
                <>
                <nav aria-label="breadcrumb" className="">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Clients</li>
                    </ol>
                </nav>
                <div className="container my-4">
                    <div>
                        <SearchClients />
                    </div>
                    <div className="row pt-4">
                        <div className="col-12 col-md-6 col-lg-6 my-2">
                            <button className="btn btn-info border-dark btn-lg btn-block" onClick={()=>{history.push('/clients/new')}}>New Client</button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <h3>
                            Recent Clients <button className="btn btn-success float-right" onClick={()=>{window.location.reload()}}>Refresh</button>
                        </h3>
                        <div className="py-2">
                            <AlternatingList {...{
                                dataObject: ((!clientsFromDb)? ([]) : (clientsFromDb.map(item => { 
                                        console.log(item)
                                        if(item.client_status !== 'archived'){
                                            return ({value: (item.business_name || item.contact_name), _id: item._id, invocationValue: item._id, pathname: `/clients/view`})
                                        }
                                    }))), 
                                edit: handleEditClient, 
                                _delete: handleDeleteClient,
                                invocation: ()=>{}, 
                                buttons: {show: true, edit: true, _delete: false}}}/>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-12 col-md-6 col-lg-6 my-2">
                            <button className="btn btn-warning" onClick={handleRedirectToClientArchive}>Archive</button>
                        </div>
                    </div>
                </div>
                </>
    )
}

export default ClientHomePage
