import React, {useContext, useState, useEffect, useRef} from 'react'
import InspectionContext from '../../context/InspectionContext'
const _ = require('lodash')

function JobOverview() {
    const jobContext = useContext(InspectionContext)
    const {job, setJob} = jobContext

    const dateRef = useRef(null)
    const openingObservationsRef = useRef(null)
    const prelistingRef = useRef(null)
    const onlineRef = useRef(null)
    const ccAttachedRef = useRef(null)
    const checkRef = useRef(null)
    const usbRef = useRef(null)

    useEffect(()=>{
        [dateRef,
        openingObservationsRef,
        prelistingRef,
        onlineRef,
        ccAttachedRef,
        checkRef,
        usbRef].forEach(item =>{
            handleUpdateJobOverviewStateDefault(item.current)
        })
    },[])

    const handleUpdateJobOverviewState = (e) => {
        let objBranch = 'overview'
        let name = e.target.name
        let type = e.target.type
        let elementType = _.lowerCase(e.target.nodeName)
        let tmpJob = job

        if(type === 'text' || type === 'date' || elementType === 'textarea' || type === 'radio'){
            tmpJob[objBranch][name] = e.target.value
            setJob(tmpJob)
        }
    }

    const handleUpdateJobOverviewStateDefault = (elem) => {
        let objBranch = 'overview'
        let name = elem.name
        
        let tmpJob = job
        tmpJob[objBranch][name] = elem.value
        setJob(tmpJob)
    }


    const formatDateValue = () => {
        var today = new Date();
        var dd = today.getDate();
    
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        // var yy = yyyy.toString().substring(2);
    
        if(dd<10) {
            dd='0'+dd;
        } 
    
        if(mm<10) {
            mm='0'+mm;
        } 
        
        return `${yyyy}-${mm}-${dd}`;
    }

    return (
        <div className="mt-3 py-3 px-5 border bg-foreground">
            <h3>Job Overview</h3>
            <div className="pt-2">
                <div className="mt-5">
                    <div>
                        <label className="h6" htmlFor='inspection_date'>Today's Date </label>
                    </div>
                    <div>
                        <TodaysDate {...{handleUpdateJobOverviewState, dateRef, job}}/>                
                    </div>
                </div>
                <div>
                    <label className="h6" htmlFor='property_address'>Property Address <span className="text-danger">*</span></label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'property_address', id: 'property_address_text_input', placeholder: 'e.g. 1234 Main St, Some City, CA 95950', required: true}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='opening_observations'>Opening Observations</label>
                    <textarea ref={openingObservationsRef} {...{className: 'form-control mb-3', name: 'opening_observations', id: 'opening_observations_textarea_input', rows: 4, placeholder: '(Optional)'}} onChange={handleUpdateJobOverviewState}/>
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
            </div>
        </div>
    )
}

export default JobOverview

const TodaysDate = (props) => {
    const {handleUpdateJobOverviewState, job} = props
    const [changeDate, setChangeDate] = useState(false)

    console.log('changeDate', changeDate)

    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    let fullDate = `${month}/${day}/${year}`

    const handleToggleChangeDate = (e) => {
        e.preventDefault()
        setChangeDate(true)
        console.log(changeDate)
    }

    useEffect(()=>{
        console.log(job)
    }, [, changeDate]) // forces re-render of component on state change

    if(changeDate){
        return(
            <>
                <input {...{className: 'form-control mb-3', type: 'date', name: 'inspection_date', id: 'inspection_date_date_input', required: true}} onChange={handleUpdateJobOverviewState}/>
            </>
        )
    } else {
        return(
            <>
            <div style={{display: 'inline-block'}} className="mx-3">
                <input ref={props.dateRef} {...{className: 'form-control mb-3', type: 'text', name: 'inspection_date', id: 'inspection_date_date_input', disabled: true, defaultValue: fullDate}}/>
            </div>
            <div style={{display: 'inline-block'}} className="align-middle pb-1">
                <button className="btn btn-primary float-right" onClick={handleToggleChangeDate}>Change</button>
            </div>
            </>
        )
    }
}

