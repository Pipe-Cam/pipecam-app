import React from 'react'
import NewClientForm from './NewClientForm'

function ClientNewPage() {
    return(
        <>
        <nav aria-label="breadcrumb" className="">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href="/clients">Clients</a></li>
                <li className="breadcrumb-item active" aria-current="page">New Client</li>
            </ol>
        </nav>

        <div className="container my-4">
                <h1>Add New Client</h1>
                <NewClientForm/>
        </div>
        </>
    )
}

export default ClientNewPage
