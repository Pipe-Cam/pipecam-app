import React, {useRef, useState, useEffect, useContext} from 'react'
import AlternatingList from '../components/ui_components/AlternatingList'
import {newClient as saveNewClientToDB} from '../db/write.js'
import {getClients as getClientsFromDB, searchForClient as searchForClientInDB} from '../db/read.js'
import ClientContext from '../context/ClientContext'

const _ = require('lodash')

function Clients() {
    const [clientNav, setClientNav] = useState('client_home')
    // const [clientNav, setClientNav] = useState('client_new')
    const [clientsFromDb, setClientsFromDb] = useState(null)
    const [clientViewData, setClientViewData] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [newClientFormData, setNewClientFormData] = useState({
        created: "",
        last_modified: "",
        client_type: "",
        client_type_other: "",
        client_status: "",
        client_source: "",
        client_source_other: "",
        preferred_payment_type: "",
        business_name: "",
        business_phone: "",
        business_address_street: "",
        business_address_unit: "",
        business_address_city: "",
        business_address_state: "",
        business_address_zip: "",
        contact_name: "",
        contact_phone: "",
        contact_email_primary: "",
        contact_email_secondary: "",
        client_address_street: "",
        client_address_unit: "",
        client_address_city: "",
        client_address_state: "",
        client_address_zip: "",
        notes: []
    })

    const [forceUpdate, setForceUpdate] = useState(true)

    const handleEditClient = (e) => {
        console.log("edited client")

        let dataAttributes = {
            value: e.target.getAttribute("data-value"),
            id: e.target.getAttribute("data-id"),
            action: e.target.getAttribute("data-action")
        }

        let clientData = _.find(clientsFromDb, function(o){ return o._id === dataAttributes.id; })
        setClientViewData(clientData)
        setClientNav('client_view')
    }

    const handleDeleteClient = (e) => {
        console.log("deleted client")
        console.log(e.target)
    }

    const getClientsOnLoad = async () => {
        let clientList = await getClientsFromDB()
        // let sortedList = _.sortBy(JSON.parse(clientList), ['last_modified']).reverse()
        // console.log(sortedList)
        // setClientsFromDb(sortedList)
        setClientsFromDb(JSON.parse(clientList))
    }

    useEffect(()=>{
        getClientsOnLoad()
    }, [])
  
    // useEffect(()=>{
    //     setForceUpdate(!forceUpdate)
    // }, [, clientsFromDb])

    
    if(clientNav === 'client_home'){
        return (
            <>
            <ClientContext.Provider value={{newClientFormData, setNewClientFormData, clientsFromDb, setClientsFromDb, clientNav, setClientNav, searchForClientInDB, handleEditClient}}>
                <nav aria-label="breadcrumb" className="">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Clients</li>
                </ol>
                </nav>
                <div className="container my-4">
                    <div>
                        <SearchClients {...{searchResult, setSearchResult}}/>
                    </div>
                    <div className="row pt-4">
                        <div className="col-12 col-md-6 col-lg-6 my-2">
                            <button className="btn btn-info border-dark btn-lg btn-block" onClick={()=>{setClientNav('client_new')}}>New Client</button>
                        </div>
                        {/* <div className="col-12 col-md-6 col-lg-6 my-2">
                            <a href="clients" className="btn btn-white border-dark btn-lg btn-block font-weight-bold">Manage Clients</a>
                        </div> */}
                    </div>
                    <div className="pt-4">
                        <h3>
                            Recent Clients
                        </h3>
                        <div className="py-2">
                            <AlternatingList {...{dataObject: ((!clientsFromDb)? ([]) : (clientsFromDb.map(item => { return {value: (item.business_name || item.contact_name), _id: item._id}}))), edit: handleEditClient, _delete: handleDeleteClient, buttons: {show: true, edit: true, _delete: false}}}/>
                        </div>
                    </div>
                </div>
            </ClientContext.Provider>

            </>
        )
    } else if(clientNav === 'client_new') {
        return (
            <ClientContext.Provider value={{newClientFormData, setNewClientFormData, clientsFromDb, setClientsFromDb, clientNav, setClientNav, getClientsOnLoad}}>
                <AddNewClient />
            </ClientContext.Provider>

        )
    } else if(clientNav === 'client_view'){
        return(
            <>
                <nav aria-label="breadcrumb" className="">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active"><a href="/clients">Clients</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{(clientViewData) ? ((clientViewData.business_name) ? (clientViewData.business_name) : (clientViewData.contact_name)) : 'Client Details'}</li>
                </ol>
                </nav>
                <ViewClientInfo {...{clientViewData}}/>
            </>
        )
    }
}

export default Clients

const SearchClients = (props) =>{
    const {searchResult, setSearchResult} = props
    const clientSearchInputRef = useRef(null)
    const {searchForClientInDB, handleEditClient} = useContext(ClientContext)

    const handleClientSearch = async (e) => {
        e.preventDefault();
        let searchValue = clientSearchInputRef.current.value
        console.log(searchValue)
        if(searchValue){
            console.log('valid search')
            let clientSearchResult = await searchForClientInDB(encodeURI(searchValue))
            setSearchResult(clientSearchResult)
        } 
    }

    return(
        <>
        <form onSubmit={handleClientSearch}>
            <div className="row">
                    <div className="col">
                        <input ref={clientSearchInputRef} type="text" className="form-control" placeholder="Client Search"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>
            </div>
        </form>

        {(searchResult !== null) ? <SearchResults {...{searchResult, setSearchResult}}/> : <></>}
        {/* <SearchResults {...{searchResult, setSearchResult}}/> */}

        </>
    )
}

const AddNewClient = (props) => {
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
                <NewClientForm/>
        </div>
        </>
    )
}


const NewClientForm = (props) => {
    const { newClientFormData, 
            setNewClientFormData, 
            clientsFromDb, 
            setClientsFromDb, 
            clientNav, 
            setClientNav,
            getClientsOnLoad} = useContext(ClientContext)

    const clientTypeOtherRef = useRef(null)
    const clientSourceOtherRef = useRef(null)
    const businessDivRef = useRef(null)
    const clientStatusDefaultRef = useRef(null)

    const handleShowHideOtherInput = (e) => {
        let id = e.target.id
        let refName = (e.target.id === 'client_type') ? (clientTypeOtherRef) : (clientSourceOtherRef);
        let val = e.target.value
        console.log(id, val)

        if(val === 'Other'){
            refName.current.classList.remove('d-none')
        } else {
            refName.current.classList.remove('d-none')
            refName.current.classList.add('d-none')
        }

        if(id === 'client_type'){
            if(val === 'Resident'){
                businessDivRef.current.classList.remove('d-none')
                businessDivRef.current.classList.add('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
            } else if(val === 'Other') {
                businessDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
            } else {
                businessDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.add('d-none')
            }
        }
    }

    const handleNewClientFormData = (e) => {
        let id = e.target.id
        let val = e.target.value
        let tmpNewClientFormData = newClientFormData;
        tmpNewClientFormData[id] = val
        setNewClientFormData(tmpNewClientFormData)
        console.log(newClientFormData)
    }

    const handleDefaultValue = () => {
        let id = clientStatusDefaultRef.current.id
        let val = clientStatusDefaultRef.current.value
        let tmpNewClientFormData = newClientFormData;
        tmpNewClientFormData[id] = val
        setNewClientFormData(tmpNewClientFormData)
        console.log(newClientFormData)
    }

    const handleSaveNewClientToDB = async (e) => {
        e.preventDefault()
        await saveNewClientToDB(newClientFormData)
        getClientsOnLoad()
        setClientNav('client_home')
    }

    useEffect(()=>{
        handleDefaultValue()
    },[])

    let bgStyle = {backgroundColor: '#FAFAFA'}
    return(
        <form onSubmit={handleSaveNewClientToDB}>
            <div className="shadow-sm px-4 pt-4 mb-3 rounded" style={bgStyle}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <select id="client_type" className="form-control" defaultValue="Client Type" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                            <option disabled>Client Type</option>
                            <option>Realtor</option>
                            <option>Resident</option>
                            <option>Business - Other</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <select ref={clientStatusDefaultRef} id="client_status" className="form-control" defaultValue="Active" onInput={handleNewClientFormData} >
                                <option disabled>Client Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Preferred</option>
                                <option>Blacklisted</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <select id="preferred_payment_type" className="form-control" defaultValue="Pmt Method" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                                <option disabled>Pmt Method</option>
                                <option>Card</option>
                                <option>Check</option>
                                <option>Cash</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <select id="client_source" className="form-control" defaultValue="Lead Source" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                                <option disabled>Lead Source</option>
                                <option>Referral</option>
                                <option>Online</option>
                                <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input ref={clientTypeOtherRef} className="form-control d-none" type="text" id="client_type_other" name="client_type_other" placeholder="Client Type - Other" onChange={handleNewClientFormData}/>
                    </div>
                    <div className=" form-group col-md-6 float-right">
                        <input ref={clientSourceOtherRef} className="form-control d-none" type="text" id="client_source_other" name="client_source_other" placeholder="Client Source - Other"  onChange={handleNewClientFormData}/>
                    </div>
                </div>
            </div>

            <div ref={businessDivRef} className="shadow-sm p-4 mb-3 rounded" style={bgStyle}>
                <div className="form-row mb-3">
                    <h3>Business</h3>
                </div>

                <div className="border px-4 pt-3 mb-4">
                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label htmlFor="business_name">Business Name</label>
                            <input type="text" className="form-control" id="business_name" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="business_phone">Business Phone</label>
                            <input type="text" className="form-control" id="business_phone" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>

                <div className="border p-4 mb-4">
                    <div className="form-group">
                        <label htmlFor="business_address_street">Business Address</label>
                        <input type="text" className="form-control" id="business_address_street" placeholder="1234 Main St, San Francisco, CA 94132" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="business_address_unit">Unit (if applicable)</label>
                        <input type="text" className="form-control" id="business_address_unit" placeholder="Apartment, studio, or floor" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="business_address_city">City</label>
                        <input type="text" className="form-control" id="business_address_city" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="business_address_state">State</label>
                        <select id="business_address_state" className="form-control" defaultValue='CA' onChange={handleNewClientFormData}>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="business_address_zip">Zip</label>
                        <input type="text" className="form-control" id="business_address_zip"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm p-4 mb-4 rounded" style={bgStyle}>
                <div className="form-row mb-3">
                    <h3>Contact</h3>
                </div>
                <div className="border p-4">
                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label htmlFor="contact_name">Contact Name</label>
                            <input type="text" className="form-control" id="contact_name" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="contact_phone">Contact Phone</label>
                            <input type="text" className="form-control" id="contact_phone" placeholder="Cell" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="contact_email_primary">Email #1</label>
                            <input type="text" className="form-control" id="contact_email_primary" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="contact_email_secondary">Email #2</label>
                            <input type="text" className="form-control" id="contact_email_secondary" placeholder="(Optional)" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
                <div className="border p-4 my-4">
                <div className="form-group">
                        <label htmlFor="client_address_street">Client Address</label>
                        <input type="text" className="form-control" id="client_address_street" placeholder="1234 Main St, San Francisco, CA 94132" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_address_unit">Unit (if applicable)</label>
                        <input type="text" className="form-control" id="client_address_unit" placeholder="Apartment, studio, or floor" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="client_address_city">City</label>
                        <input type="text" className="form-control" id="client_address_city" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="client_address_state">State</label>
                        <select id="client_address_state" className="form-control" defaultValue='CA' onChange={handleNewClientFormData}>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="client_address_zip">Zip</label>
                        <input type="text" className="form-control" id="client_address_zip" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm p-4 mb-3 rounded" style={bgStyle}>
                <div className="border p-4">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="client_notes">Client Notes</label>
                            <textarea className="w-100" name="client_notes" id="client_notes" rows="5" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
            </div>


            <button type="submit" className="btn btn-primary btn-lg float-right">Save</button>
        </form>
    )
}

const FiftyStatesAbbrev = () => {
    return(
        <>
            <option>AL</option>
            <option>AK</option>
            <option>AZ</option>
            <option>AR</option>
            <option>CA</option>
            <option>CO</option>
            <option>CT</option>
            <option>DC</option>
            <option>DE</option>
            <option>FL</option>
            <option>GA</option>
            <option>HI</option>
            <option>ID</option>
            <option>IL</option>
            <option>IN</option>
            <option>IA</option>
            <option>KS</option>
            <option>KY</option>
            <option>LA</option>
            <option>ME</option>
            <option>MD</option>
            <option>MA</option>
            <option>MI</option>
            <option>MN</option>
            <option>MS</option>
            <option>MO</option>
            <option>MT</option>
            <option>NE</option>
            <option>NV</option>
            <option>NH</option>
            <option>NJ</option>
            <option>NM</option>
            <option>NY</option>
            <option>NC</option>
            <option>ND</option>
            <option>OH</option>
            <option>OK</option>
            <option>OR</option>
            <option>PA</option>
            <option>RI</option>
            <option>SC</option>
            <option>SD</option>
            <option>TN</option>
            <option>TX</option>
            <option>UT</option>
            <option>VT</option>
            <option>VA</option>
            <option>WA</option>
            <option>WV</option>
            <option>WI</option>
            <option>WY</option>
        </>
    )
}

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



const ViewClientInfo = (props) => {
    const {clientViewData} = props
    const clientViewDataKeys = Object.keys(clientViewData)
    console.log(clientViewDataKeys)

    const exclusionList = ['notes', 'created', 'last_modified', '_id', '__v']

    return (
        <>
            {clientViewDataKeys.map(item => {
                if(!exclusionList.includes(item) && clientViewData[item].toString() !== ''){
                    return(
                        <div className="row" key={item + clientViewData._id}>
                            <div className="col-3" key={item + clientViewData._id + 1}>
                                {capitalizeEachWord(item.split('_').join(' '))}:
                            </div>
                            <div className="col-9" key={item + clientViewData._id + 2}>
                                {capitalizeEachWord(clientViewData[item].toString())}
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}

const SearchResults = (props) => {
    const {handleEditClient} = useContext(ClientContext)
    let searchResult = JSON.parse(props.searchResult)
    console.log(searchResult)

    return(
        <div className="ml-1 row">
            <div className="col-11">
                <div className="row my-3 py-3 border border-dark text-dark rounded" style={{backgroundColor: '#F0F0F0'}}>
                    <div className="col-12 text-dark">
                        <strong>Results:</strong>
                    </div>
                    <div className="col-12">
                        <ol className="text-dark font-weight-bold">
                            {searchResult.map(item=>{
                                if(item.client_type === 'Resident'){
                                    return(
                                        <li key={item._id}><a href="#" className="text-primary" data-value={item.contact_name} data-id={item._id} data-action="edit" onClick={handleEditClient}>{item.contact_name}</a></li>
                                    )
                                } else {
                                    return(
                                        <li key={item._id}><a href="#" className="text-primary" data-value={item.business_name} data-id={item._id} data-action="edit" onClick={handleEditClient}>{item.business_name}</a></li>
                                    )
                                }
                            })}
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    )
}

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}