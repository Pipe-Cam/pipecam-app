import React, {useContext, useRef, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import ClientContext from '../../context/ClientContext'
import {newClient as saveNewClientToDB} from '../../db/write'
import FiftyStatesAbbrev from '../form_elements/FiftyStatesAbbrev'
const _ = require('lodash')

const NewClientForm = (props) => {
    const [newClientFormData, setNewClientFormData] = useState({})
    const { 
        clientsFromDb, 
        setClientsFromDb, 
        clientNav, 
        setClientNav,
        getClientsOnLoad
    } = useContext(ClientContext)
            
    const businessDivRef = useRef(null)
    const clientTypeRef = useRef(null)
    const clientStatusDefaultRef = useRef(null)
    const paymentTypeRef = useRef(null)
    const clientSourceRef = useRef(null)
    const clientTypeOtherRef = useRef(null)
    const clientSourceOtherRef = useRef(null)
    const businessNameRef = useRef(null)
    const businessPhoneRef = useRef(null)
    const businessAddressStreetRef = useRef(null)
    const businessAddressUnitRef = useRef(null)
    const businessAddressCityRef = useRef(null)
    const businessAddressStateRef = useRef(null)
    const businessAddressZipRef = useRef(null)
    const contactNameRef = useRef(null)
    const contactPhoneRef = useRef(null)
    const emailPrimaryRef = useRef(null)
    const emailSecondaryRef = useRef(null)
    const clientAddressStreetRef= useRef(null)
    const clientAddressUnitRef = useRef(null)
    const clientAddressCityRef = useRef(null)
    const clientAddressStateRef = useRef(null)
    const clientAddressZipRef = useRef(null)
    const ClientNotesRef = useRef(null)

    const refList = [
        clientTypeRef,
        clientStatusDefaultRef,
        paymentTypeRef,
        clientSourceRef,
        clientTypeOtherRef,
        clientSourceOtherRef,
        businessNameRef,
        businessPhoneRef,
        businessAddressStreetRef,
        businessAddressUnitRef,
        businessAddressCityRef,
        businessAddressStateRef,
        businessAddressZipRef,
        contactNameRef,
        contactPhoneRef,
        emailPrimaryRef,
        emailSecondaryRef,
        clientAddressStreetRef,
        clientAddressUnitRef,
        clientAddressCityRef,
        clientAddressStateRef,
        clientAddressZipRef,
        ClientNotesRef
    ]

    const history = useHistory()

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

        if(id === 'contact_name' || id === 'business_name' || id === 'contact_email_primary' || id === 'contact_email_secondary'){
            tmpNewClientFormData[id] = val
        } else {
            tmpNewClientFormData[id] = _.lowerCase(val)
        }

        setNewClientFormData(tmpNewClientFormData)
        console.log(newClientFormData)
    }

    const handleDefaultValue = () => {
        let tmpNewClientFormData = newClientFormData

        refList.forEach(item => {
            let id = item.current.id
            let val = item.current.value

            if(id === 'contact_name' || id === 'business_name'){
                newClientFormData[id] = val
            } else {
                newClientFormData[id] = _.lowerCase(val)
            }
        })

        setNewClientFormData(tmpNewClientFormData)
    }

    const handleSaveNewClientToDB = async (e) => {
        e.preventDefault()
        console.log(newClientFormData)
        saveNewClientToDB(newClientFormData)
        getClientsOnLoad()
        history.push('/clients')
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
                        <select ref={clientTypeRef} id="client_type" className="form-control" defaultValue="Client Type" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
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
                        <select ref={paymentTypeRef} id="preferred_payment_type" className="form-control" defaultValue="Pmt Method" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                                <option disabled>Pmt Method</option>
                                <option>Card</option>
                                <option>Check</option>
                                <option>Cash</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <select ref={clientSourceRef} id="client_source" className="form-control" defaultValue="Lead Source" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
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
                            <input ref={businessNameRef} type="text" className="form-control" id="business_name" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="business_phone">Business Phone</label>
                            <input ref={businessPhoneRef} type="text" className="form-control" id="business_phone" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>

                <div className="border p-4 mb-4">
                    <div className="form-group">
                        <label htmlFor="business_address_street">Business Address</label>
                        <input ref={businessAddressStreetRef} type="text" className="form-control" id="business_address_street" placeholder="1234 Main St, San Francisco, CA 94132" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="business_address_unit">Unit (if applicable)</label>
                        <input ref={businessAddressUnitRef} type="text" className="form-control" id="business_address_unit" placeholder="Apartment, studio, or floor" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="business_address_city">City</label>
                        <input ref={businessAddressCityRef} type="text" className="form-control" id="business_address_city" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="business_address_state">State</label>
                        <select ref={businessAddressStateRef} id="business_address_state" className="form-control" defaultValue='CA' onChange={handleNewClientFormData}>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="business_address_zip">Zip</label>
                        <input ref={businessAddressZipRef} type="text" className="form-control" id="business_address_zip"/>
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
                            <input ref={contactNameRef} type="text" className="form-control" id="contact_name" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="contact_phone">Contact Phone</label>
                            <input ref={contactPhoneRef} type="text" className="form-control" id="contact_phone" placeholder="Cell" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="contact_email_primary">Email #1</label>
                            <input ref={emailPrimaryRef} type="text" className="form-control" id="contact_email_primary" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="contact_email_secondary">Email #2</label>
                            <input ref={emailSecondaryRef} type="text" className="form-control" id="contact_email_secondary" placeholder="(Optional)" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
                <div className="border p-4 my-4">
                <div className="form-group">
                        <label htmlFor="client_address_street">Client Address</label>
                        <input ref={clientAddressStreetRef} type="text" className="form-control" id="client_address_street" placeholder="1234 Main St, San Francisco, CA 94132" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_address_unit">Unit (if applicable)</label>
                        <input ref={clientAddressUnitRef} type="text" className="form-control" id="client_address_unit" placeholder="Apartment, studio, or floor" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="client_address_city">City</label>
                        <input ref={clientAddressCityRef} type="text" className="form-control" id="client_address_city" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="client_address_state">State</label>
                        <select ref={clientAddressStateRef} id="client_address_state" className="form-control" defaultValue='CA' onChange={handleNewClientFormData}>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="client_address_zip">Zip</label>
                        <input ref={clientAddressZipRef} type="text" className="form-control" id="client_address_zip" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm p-4 mb-3 rounded" style={bgStyle}>
                <div className="border p-4">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="client_notes">Client Notes</label>
                            <textarea ref={ClientNotesRef} className="w-100" name="client_notes" id="client_notes" rows="5" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>
            </div>


            <button type="submit" className="btn btn-primary btn-lg float-right">Save</button>
        </form>
    )
}

export default NewClientForm


