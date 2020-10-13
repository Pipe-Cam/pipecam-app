import React, {useContext} from 'react'
import InspectionContext from '../../context/InspectionContext'
const _ = require('lodash')

function JobOverview() {
    const jobContext = useContext(InspectionContext)
    const {job, setJob} = jobContext

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
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Job Overview</h3>
            <div className="pt-2">
                <div>
                    <label className="h6" htmlFor='inspection_date'>Today's Date</label>
                    <input {...{className: 'form-control mb-3', type: 'date', name: 'inspection_date', id: 'inspection_date_date_input'}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='property_address'>Property Address</label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'property_address', id: 'property_address_text_input'}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='opening_observations'>Opening Observations</label>
                    <textarea {...{className: 'form-control mb-3', name: 'opening_observations', id: 'opening_observations_textarea_input', rows: 4}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div className="my-5">
                    <div className="h6">Prelisting</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'no'}} onChange={handleUpdateJobOverviewState}/>
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
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'online', id: 'online_radio_input', value: 'no'}} onChange={handleUpdateJobOverviewState}/>
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
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', value: 'no'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>

                <div>
                    <label className="h6" htmlFor='icheck_num'>Check#</label>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'check_num', id: 'check_num_number_input', min: 0}} onChange={handleUpdateJobOverviewState}/>
                </div>
                <div>
                    <label className="h6" htmlFor='usb_num'>USB#</label>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'usb_num', id: 'usb_num_number_input', min: 0}} onChange={handleUpdateJobOverviewState}/>
                </div>
            </div>
        </div>
    )
}

export default JobOverview