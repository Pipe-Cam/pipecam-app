import React, {useContext, useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import InspectionContext from '../../context/InspectionContext'
import {searchForClient as searchForClientInDB} from '../../db/read'
import IconPlus from '../icons/IconPlus'
import FiftyStatesAbbrev from '../form_elements/FiftyStatesAbbrev'

const _ = require('lodash')


function JobOverview() {
    const {job, setJob} = useContext(InspectionContext)
    const history = useHistory()
    const [dropdownClients, setDropdownClients] = useState(null)

    const dateRef = useRef(null)
    const addressStreetRef = useRef(null)
    const addressUnitRef = useRef(null)
    const addressCityRef = useRef(null)
    const addressStateRef = useRef(null)
    const addressZipRef = useRef(null)
    const prelistingRef = useRef(null)
    const rootCutRef = useRef(null)
    const clientLocatedAccessRef = useRef(null)
    const lengthOfLateralRef = useRef(null)
    const paymentStatusRef = useRef(null)
    const paymentStatusAmountRef = useRef(null)
    const paymentStatusInputDivRef = useRef(null)
    const officeNotesRef = useRef(null)
    
    const clientTextRef = useRef(null)
    const clientDropdownRef = useRef(null)


    useEffect((handleUpdateJobOverviewStateDefault)=>{
        [
            dateRef,
            clientTextRef,
            addressStreetRef,
            addressUnitRef,
            addressCityRef,
            addressStateRef,
            addressZipRef,
            prelistingRef,
            rootCutRef,
            clientLocatedAccessRef,
            lengthOfLateralRef,
            paymentStatusRef,
            paymentStatusAmountRef,
            officeNotesRef
        ].forEach(item =>{
            handleUpdateJobOverviewStateDefault(item.current)
        })
    },[])

    const handleRedirectToNewClient = () => {
        history.push('/clients/new')
        window.location.reload()
    }

    const handleUpdateJobOverviewState = (e) => {
        if(paymentStatusRef.current.value === 'collect') {
            paymentStatusInputDivRef.current.style.visibility = 'visible'
        }
        if(paymentStatusRef.current.value === 'received') {
            paymentStatusInputDivRef.current.style.visibility = 'hidden'
        }

        let objBranch = 'overview'
        let name = e.target.name
        let type = e.target.type
        let elementType = _.lowerCase(e.target.nodeName)
        let value = e.target.value
        let tmpJob = job

        if(type === 'text' || type === 'number' || type === 'date' || elementType === 'textarea' || type === 'checkbox'){
            if(name === 'client') {
                console.log('client: ', `${name} / ${value}`)
                tmpJob.client_id = e.target.getAttribute('data-id')
            }

            if(type === 'checkbox'){
                console.log(e.target.value, e.target.checked)
                value = Boolean(e.target.checked)
            }

            console.log('value: ', value)
            tmpJob[objBranch][name] = value
            
            if(type === 'date'){
                let date = value.split('-')
                console.log(date)
                let year = Number(date[0])
                let month = Number(date[1]) -1
                let day = Number(date[2])

                let dateTime = new Date(year, month, day, 12, 0, 0, 0).toLocaleString('en-US', {timeZoneName: 'short', hour12: false})

                tmpJob[objBranch][name] = dateTime
                console.log(e.target.value)
                console.log(tmpJob[objBranch][name])
            }
            setJob(tmpJob)
        }
    }

    // const handleUpdateJobOverviewStateDefault = (elem) => {
    //     let objBranch = 'overview'
    //     let name = elem.name || elem.id
        
    //     let tmpJob = job
    //     if(elem.type === 'checkbox'){
    //         tmpJob[objBranch][name] = Boolean(elem.checked)
    //     } else {
    //         tmpJob[objBranch][name] = elem.value
    //     }
    //     setJob(tmpJob)
    // }

    const handleClientDropDown = async (e) => {
        console.log(clientTextRef.current.value)
        let searchValue = clientTextRef.current.value
        let searchResults = await searchForClientInDB(encodeURI(searchValue))

        let searchResultObj; 
        
        try{
            searchResultObj = JSON.parse(searchResults)
            console.log(searchResultObj)
            setDropdownClients(searchResultObj.map(item => {
                return({name: (item.business_name || item.client_name), id: item._id})
            }))
    
            clientDropdownRef.current.classList.add('show')
        } catch (err) {
            clientTextRef.current.setAttribute('data-id', '')
            console.log('searchResults', searchResults)
            console.log(err)
        }
    }

    const handleClientDropDownSelect = (e) => {
        // console.log(e.target)
        let id = e.target.getAttribute('data-id')
        let name = e.target.innerHTML
        console.log(name, id)
        clientTextRef.current.value = ''
        clientTextRef.current.value = name
        
        let tmpJob = job
        tmpJob.overview.client = name
        setJob(tmpJob)

        clientTextRef.current.setAttribute('data-id', id)
        clientDropdownRef.current.classList.remove('show')
    }


    const DropdownItems = (props) => {
        const {dropdownClients} = props
        if(dropdownClients){
            return(
                <>
                    {dropdownClients.map(item => {
                        return (<a key={item.id} className="dropdown-item" data-id={item.id} href="#" onClick={handleClientDropDownSelect}>{item.name}</a>)
                    })}
    
                </>
            )
        } else {
            return (<>&nbsp;</>)
        }
    }

    const mouseover = {cursor: 'pointer'}

    return (
        <div className="mt-3 py-3 px-5 border bg-foreground">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <div>
                        <label className="h6" htmlFor='inspection_date'>Inspection Date <span className="text-danger">*</span></label>
                    </div>
                    <div>
                        <input ref={dateRef} {...{className: 'form-control mb-3', type: 'date', name: 'inspection_date', id: 'inspection_date', required: true}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <div>
                        <label className="h6" htmlFor='client'>Client <span className="text-danger">*</span></label>
                    </div>
                    <label className="sr-only" htmlFor="client_input">Client</label>
                    <div className="dropdown input-group">
                        <input ref={clientTextRef} {...{className: 'form-control mb-3', type: 'text', name: 'client', id: 'client', required: true}} data-toggle="dropdown" onKeyUp={handleClientDropDown} onChange={handleUpdateJobOverviewState}/>
                        <div className="input-group-append mb-3">
                            <div className="input-group-text rounded-right" style={mouseover} onClick={handleRedirectToNewClient}><IconPlus size={{width: "1.5em", height: "1.5em"}}/></div>
                        </div>
                        <div ref={clientDropdownRef} className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                            <DropdownItems {...{dropdownClients}}/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-8">
                    <div>
                        <label className="h6" htmlFor='property_address_street'>Property Address <span className="text-danger">*</span></label>
                        <input ref={addressStreetRef} {...{className: 'form-control mb-3', type: 'text', name: 'property_address_street', id: 'property_address_street', placeholder: 'e.g. 1234 Main St', required: true}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <label className="h6" htmlFor='property_address_unit'>Unit</label>
                        <input ref={addressUnitRef} {...{className: 'form-control mb-3', type: 'text', name: 'property_address_unit', id: 'property_address_unit', placeholder: 'e.g. Apt. 123 or Unit. 456', required: false}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div>
                        <label className="h6" htmlFor='property_address_city'>City <span className="text-danger">*</span></label>
                        <input ref={addressCityRef} {...{className: 'form-control mb-3', type: 'text', name: 'property_address_city', id: 'property_address_city', placeholder: 'e.g. San Francisco', required: true}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
                <div className="col-3">
                    <div>
                        <label className="h6" htmlFor='property_address_state'>State <span className="text-danger">*</span></label>
                        {/* <input {...{className: 'form-control mb-3', type: 'text', name: 'property_address_state', id: 'property_address_state', placeholder: 'e.g. Apt. 123 or Unit. 456', required: true}} onChange={handleUpdateJobOverviewState}/> */}
                        <select ref={addressStateRef} className="custom-select" defaultValue="CA" name='property_address_state' id='property_address_state' onChange={handleUpdateJobOverviewState}>
                            <FiftyStatesAbbrev />
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div>
                        <label className="h6" htmlFor='property_address_zip'>Zip <span className="text-danger">*</span></label>
                        <input ref={addressZipRef} {...{className: 'form-control mb-3', type: 'text', name: 'property_address_zip', id: 'property_address_zip', placeholder: 'e.g. 94123', required: true}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col m-2 border rounded py-2">
                    <div className="h6">Job Info</div>
                    <div className="row">
                        <div className="col-12">
                            <div className="custom-control custom-checkbox">
                                <input ref={prelistingRef} className="custom-control-input" type="checkbox" name="prelisting" id="prelisting" defaultChecked={false} defaultValue={false} onChange={handleUpdateJobOverviewState}/>
                                <label className="custom-control-label" htmlFor="prelisting">Prelisting</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="custom-control custom-checkbox">
                                <input ref={rootCutRef} className="custom-control-input" type="checkbox" name="root_cut" id="root_cut" defaultChecked={false} defaultValue={false} onChange={handleUpdateJobOverviewState}/>
                                <label className="custom-control-label" htmlFor="root_cut">Root Cut</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="custom-control custom-checkbox">
                                <input ref={clientLocatedAccessRef} className="custom-control-input" type="checkbox" name="client_located_access" id="client_located_access" defaultChecked={false} defaultValue={false} onChange={handleUpdateJobOverviewState}/>
                                <label className="custom-control-label" htmlFor="client_located_access">Access Located By Client</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            {/* <label htmlFor="length_of_lateral">Length of Lateral</label> */}
                            <input ref={lengthOfLateralRef} className="form-control" type="text" name="length_of_lateral" id="length_of_lateral" placeholder="Length of Lateral (in feet)" onChange={handleUpdateJobOverviewState}/>
                        </div>
                    </div>
                    {/* <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input ref={prelistingRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div> */}

                </div>

                <div className="col m-2 border rounded py-2">
                <div className="h6">Payment Info <span className="text-danger">*</span></div>
                    <select ref={paymentStatusRef} className="custom-select" id="payment_status" defaultValue="collect" onChange={handleUpdateJobOverviewState}>
                        <option value="collect">Collect</option>
                        <option value="received">Received</option>
                    </select>
                    {/* <div className="input-group" ref={paymentStatusInputRef} style={{display: 'none'}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input className="form-control mt-1" type="text" placeholder="e.g. $260.00" onChange={handleUpdateJobOverviewState}/>
                    </div> */}

                    <div className="input-group mb-3 mt-2" ref={paymentStatusInputDivRef} style={{visibility: 'visible'}}>
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input ref={paymentStatusAmountRef} id="payment_status_amount" name="payment_status_amount" type="number" className="form-control" placeholder="0.00" min="0.0" step="0.1" aria-label="Dollar amount (with dot and two decimal places)" onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
{/* 
                <div className="col m-2 border rounded py-2">
                    <div className="h6">Online</div>
                    <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'online', id: 'online_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input ref={onlineRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'online', id: 'online_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>
                <div className="col m-2 border rounded py-2">
                    <div className="h6">CC Attached</div>
                    <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5 justify-content-center">
                        <input ref={ccAttachedRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div> */}
                <div className="col-12">
                    <label className="h6" htmlFor='opening_observations'>Office Notes</label>
                    <textarea ref={officeNotesRef} {...{className: 'form-control mb-3', name: 'office_notes', id: 'office_notes', rows: 4, placeholder: ''}} onChange={handleUpdateJobOverviewState}/>
                </div>
            </div>

        </div>
    )
}

export default JobOverview









/*
JOB OVERVIEW

return (
        <div className="mt-3 py-3 px-5 border bg-foreground">
            <h3>Job Overview</h3>
            <div className="pt-2">
                <div className="mt-5">
                    <div>
                        <label className="h6" htmlFor='inspection_date'>Inspection Date </label>
                    </div>
                    <div>
                        <input ref={dateRef} {...{className: 'form-control mb-3', type: 'date', name: 'inspection_date', id: 'inspection_date_date_input', required: true}} style={{width: '50%'}} onChange={handleUpdateJobOverviewState}/>
                    </div>
                </div>
                <div>
                    <label className="h6" htmlFor='property_address'>Property Address <span className="text-danger">*</span></label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'property_address', id: 'property_address_text_input', placeholder: 'e.g. 1234 Main St, Some City, CA 95950', required: true}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div className="my-5">
                    <div className="h6">Prelisting</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={prelistingRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Online</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'online', id: 'online_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={onlineRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'online', id: 'online_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">CC Attached</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={ccAttachedRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', value: 'no', defaultChecked: 'checked'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>

                <div>
                    <label className="h6" htmlFor='check_num'>Check#</label>
                    <input ref={checkRef} {...{className: 'form-control mb-3', type: 'number', name: 'check_num', id: 'check_num_number_input', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='usb_num'>USB#</label>
                    <input ref={usbRef} {...{className: 'form-control mb-3', type: 'number', name: 'usb_num', id: 'usb_num_number_input', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='opening_observations'>Office Notes</label>
                    <textarea ref={officeNotesRef} {...{className: 'form-control mb-3', name: 'office_notes', id: 'office_notes_textarea_input', rows: 4, placeholder: ''}} onChange={handleUpdateJobOverviewState}/>
                </div>
            </div>
        </div>
    )


*/