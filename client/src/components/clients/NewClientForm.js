import React, {useContext, useRef, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import ClientContext from '../../context/ClientContext'
import {newClient as saveNewClientToDB} from '../../db/write'
import FiftyStatesAbbrev from '../form_elements/FiftyStatesAbbrev'
const _ = require('lodash')

const NewClientForm = (props) => {
    const [newClientFormData, setNewClientFormData] = useState({})
    const { 
        // clientsFromDb, 
        // setClientsFromDb, 
        // clientNav, 
        // setClientNav,
        getClientsOnLoad
    } = useContext(ClientContext)
            
    const organizationDivRef = useRef(null)
    const clientTypeRef = useRef(null)
    const clientStatusDefaultRef = useRef(null)
    const paymentTypeRef = useRef(null)
    const clientSourceRef = useRef(null)
    const clientTypeOtherRef = useRef(null)
    const clientSourceOtherRef = useRef(null)
    const organizationNameRef = useRef(null)
    const organizationPhoneRef = useRef(null)
    const organizationAddressStreetRef = useRef(null)
    const organizationAddressUnitRef = useRef(null)
    const organizationAddressCityRef = useRef(null)
    const organizationAddressStateRef = useRef(null)
    const organizationAddressZipRef = useRef(null)
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
        organizationNameRef,
        organizationPhoneRef,
        organizationAddressStreetRef,
        organizationAddressUnitRef,
        organizationAddressCityRef,
        organizationAddressStateRef,
        organizationAddressZipRef,
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

        if(val === 'Other'){
            refName.current.classList.remove('d-none')
        } else {
            refName.current.classList.remove('d-none')
            refName.current.classList.add('d-none')
        }

        if(id === 'client_type'){
            if(val === 'Resident'){
                organizationDivRef.current.classList.remove('d-none')
                organizationDivRef.current.classList.add('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
            } else if(val === 'Other') {
                organizationDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
            } else {
                organizationDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.remove('d-none')
                // clientAddressDivRef.current.classList.add('d-none')
            }
        }
    }

    const handleNewClientFormData = (e) => {
        let id = e.target.id
        let val = e.target.value
        let tmpNewClientFormData = newClientFormData;

        if(id === 'contact_name' || id === 'organization_name' || id === 'contact_email_primary' || id === 'contact_email_secondary'){
            tmpNewClientFormData[id] = val
        } else {
            tmpNewClientFormData[id] = _.lowerCase(val)
        }

        setNewClientFormData(tmpNewClientFormData)
    }

    const handleDefaultValue = () => {
        let tmpNewClientFormData = newClientFormData

        refList.forEach(item => {
            let id = item.current.id
            let val = item.current.value

            if(id === 'contact_name' || id === 'organization_name'){
                newClientFormData[id] = val
            } else {
                newClientFormData[id] = _.lowerCase(val)
            }
        })

        setNewClientFormData(tmpNewClientFormData)
    }

    const handleSaveNewClientToDB = async (e) => {
        e.preventDefault()
        saveNewClientToDB(newClientFormData)
        getClientsOnLoad()
        history.push('/clients')
    }

    useEffect(()=>{
        handleDefaultValue()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let bgStyle = {backgroundColor: '#FAFAFA'}
    return(
        <form onSubmit={handleSaveNewClientToDB}>
            <div className="shadow-sm px-4 pt-4 mb-3 rounded" style={bgStyle}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label for="client_type" className="pl-1">Client Type</label>
                        <select ref={clientTypeRef} id="client_type" className="form-control" defaultValue="Realtor" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                            <option>Realtor</option>
                            <option>Resident</option>
                            <option>Organization - Other</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="client_status" className="pl-1">Client Status</label>
                        <select ref={clientStatusDefaultRef} id="client_status" className="form-control" defaultValue="Active" onInput={handleNewClientFormData} >
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Preferred</option>
                                <option>Blacklisted</option>
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label for="preferred_payment_type" className="pl-1">Preferred Pmt Method</label>
                        <select ref={paymentTypeRef} id="preferred_payment_type" className="form-control" defaultValue="Card" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                                <option>Card</option>
                                <option>Cash</option>
                                <option>Check</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="client_source" className="pl-1">Lead Source</label>
                        <select ref={clientSourceRef} id="client_source" className="form-control" defaultValue="Existing" onInput={handleNewClientFormData} onChange={handleShowHideOtherInput}>
                                <option>Existing</option>
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

            <div ref={organizationDivRef} className="shadow-sm p-4 mb-3 rounded" style={bgStyle}>
                <div className="form-row">
                        <h3>Organization <span className="h4 text-secondary">(optional)</span></h3>
                </div>

                <div className="border px-4 pt-3 mb-4">
                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label htmlFor="organization_name">Organization Name</label>
                            <input ref={organizationNameRef} type="text" className="form-control" id="organization_name" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="organization_phone">Organization Phone</label>
                            <input ref={organizationPhoneRef} type="text" className="form-control" id="organization_phone" placeholder="" onChange={handleNewClientFormData}/>
                        </div>
                    </div>
                </div>

                <div className="border p-4 mb-4">
                    <div className="form-group">
                        <label htmlFor="organization_address_street">Organization Address</label>
                        <input ref={organizationAddressStreetRef} type="text" className="form-control" id="organization_address_street" placeholder="1234 Main St, San Francisco, CA 94132" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="organization_address_unit">Unit (if applicable)</label>
                        <input ref={organizationAddressUnitRef} type="text" className="form-control" id="organization_address_unit" placeholder="Apartment, studio, or floor" onChange={handleNewClientFormData}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="organization_address_city">City</label>
                        <input ref={organizationAddressCityRef} type="text" className="form-control" id="organization_address_city" onChange={handleNewClientFormData}/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="organization_address_state">State</label>
                        <select ref={organizationAddressStateRef} id="organization_address_state" className="form-control" defaultValue='CA' onChange={handleNewClientFormData}>
                            <FiftyStatesAbbrev />
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="organization_address_zip">Zip</label>
                        <input ref={organizationAddressZipRef} type="text" className="form-control" id="organization_address_zip"/>
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


