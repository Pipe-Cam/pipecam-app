import React, {useRef, useState} from 'react'
import AlternatingList from '../components/ui_components/AlternatingList'
const clientNames = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "Vitae", "ipsa"    
]

function Clients() {
    const [clientNav, setClientNav] = useState('client_home')
    // const [clientNav, setClientNav] = useState('client_new')
    const handleEditClient = () => {
        console.log("edited client")
    }
    const handleDeleteClient = () => {
        console.log("deleted client")
    }

    if(clientNav === 'client_home'){
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
                            <AlternatingList {...{dataObject: clientNames, edit: handleEditClient, _delete: handleDeleteClient, buttons: {show: true, edit: true, _delete: false}}}/>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if(clientNav === 'client_new') {
        return (
            <AddNewClient />
        )
    }
}

export default Clients

const SearchClients = () =>{
    const clientSearchInputRef = useRef(null)

    const handleClientSearch = (e) => {
        e.preventDefault();
        let searchValue = clientSearchInputRef.current.value
        console.log(searchValue)
    }
    return(
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
    )
}

const AddNewClient = () => {
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
            <NewClientForm />
        </div>
        </>
    )
}


const NewClientForm = () => {
    const clientTypeOtherRef = useRef(null)
    const clientSourceOtherRef = useRef(null)
    const businessDivRef = useRef(null)
    // const clientAddressDivRef = useRef(null)

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

    let bgStyle = {backgroundColor: '#FAFAFA'}
    return(
        <form>
            <div className="shadow-sm px-4 pt-4 mb-3 rounded" style={bgStyle}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <select id="client_type" className="form-control" defaultValue="Client Type" onChange={handleShowHideOtherInput}>
                            <option disabled>Client Type</option>
                            <option>Realtor</option>
                            <option>Resident</option>
                            <option>Business - Other</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <select id="client_status" className="form-control" defaultValue="Client Status">
                                <option disabled>Client Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Preferred</option>
                                <option>Blacklisted</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <select id="client_source" className="form-control" defaultValue="Pmt Method" onChange={handleShowHideOtherInput}>
                                <option disabled>Pmt Method</option>
                                <option>Card</option>
                                <option>Check</option>
                                <option>Cash</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <select id="client_source" className="form-control" defaultValue="Lead Source" onChange={handleShowHideOtherInput}>
                                <option disabled>Lead Source</option>
                                <option>Referral</option>
                                <option>Online</option>
                                <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input ref={clientTypeOtherRef} className="form-control d-none" type="text" id="client_type_other" name="client_type_other" placeholder="Client Type - Other" />
                    </div>
                    <div className=" form-group col-md-6 float-right">
                        <input ref={clientSourceOtherRef} className="form-control d-none" type="text" id="client_source_other" name="client_source_other" placeholder="Client Source - Other" />
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
                            <label htmlFor="businessName">Business Name</label>
                            <input type="text" className="form-control" id="businessName" placeholder=""/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="businessName">Business Phone</label>
                            <input type="text" className="form-control" id="businessName" placeholder=""/>
                        </div>
                    </div>
                </div>

                <div className="border p-4 mb-4">
                    <div className="form-group">
                        <label htmlFor="inputAddress">Business Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, San Francisco, CA 94132"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Unit (if applicable)</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control" defaultValue='CA'>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
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
                            <label htmlFor="businessName">Contact Name</label>
                            <input type="text" className="form-control" id="businessName" placeholder=""/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="businessName">Contact Cell</label>
                            <input type="text" className="form-control" id="businessName" placeholder=""/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="businessName">Email #1</label>
                            <input type="text" className="form-control" id="businessName" placeholder=""/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="businessName">Email #2</label>
                            <input type="text" className="form-control" id="businessName" placeholder="(Optional)"/>
                        </div>
                    </div>
                </div>
                <div className="border p-4 my-4">
                    <div className="form-group">
                        <label htmlFor="inputAddress">Client Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St, San Francisco, CA 94132"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Unit (if applicable)</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control" defaultValue='CA'>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm p-4 mb-3 rounded" style={bgStyle}>
                <div className="border p-4">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="client_notes">Client Notes</label>
                            <textarea className="w-100" name="client_notes" id="client_notes" rows="5"></textarea>
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



