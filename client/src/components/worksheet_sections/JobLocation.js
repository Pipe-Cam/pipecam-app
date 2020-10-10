import React, {useRef, useContext} from 'react'
import InspectionContext from '../../context/InspectionContext'
const _ = require('lodash')

function JobLocation() {
    const jobContext = useContext(InspectionContext)
    const {job, setJob} = jobContext

    const pipeDiameterOtherRadioRef = useRef(null)
    const pipeDiameterOtherTextRef = useRef(null)
    const hasPlumbingRadioRef = useRef(null)
    const hasPlumbingDivRef = useRef(null)
    const ccusdRadioRef = useRef(null)
    const ccusdDivRef = useRef(null)
    const outbuildingRadioRef = useRef(null)
    const outbuildingDivRef = useRef(null)

    const handlePipeDiameterOther = (e) => {
        if(pipeDiameterOtherRadioRef.current.checked){
            pipeDiameterOtherTextRef.current.style.display = 'block'
        } else {
            pipeDiameterOtherTextRef.current.style.display = 'none'
        }
    }

    const handleHasPlumbingYes = (e) => {
        if(hasPlumbingRadioRef.current.checked){
            hasPlumbingDivRef.current.style.display = 'block'
        } else {
            hasPlumbingDivRef.current.style.display = 'none'
        }
    }

    const handleCCUSD = (e) => {
        if(ccusdRadioRef.current.checked){
            ccusdDivRef.current.style.display = 'block'
        } else {
            ccusdDivRef.current.style.display = 'none'
        }
    }
    
    const handleOutbuilding = (e) => {
        if(outbuildingRadioRef.current.checked){
            outbuildingDivRef.current.style.display = 'block'
        } else {
            outbuildingDivRef.current.style.display = 'none'
        }
    }

    const handleUpdateJobOverviewState = (e) => {
        let objBranch = 'location'
        let name = e.target.name
        let type = e.target.type
        let elementType = _.lowerCase(e.target.nodeName)
        let tmpJob = job

        if(type === 'text' || type === 'date' || elementType === 'textarea' || type === 'radio'){
            job[objBranch][name] = e.target.value
            console.log(job)
        }
    }
    


    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Job Location</h3>
            <div className="pt-2">
            <div className="my-5">
                    <div className="h6">Occupancy</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', value: 'occupied'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Occupied</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', value: 'vacant'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Vacant</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', value: 'unknown'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Unknown</label>
                    </div>
                </div>                
            <div className="my-5">
                    <div className="h6">Outbuilding</div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={outbuildingRadioRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', value: 'yes'}} onClick={handleOutbuilding} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', value: 'no'}} onClick={handleOutbuilding} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>                
            <div ref={outbuildingDivRef} id="outbuilding_yes" className="my-5 ml-5 p-4 border" style={{display: 'none'}}>
                <div className="h6">> Has Plumbing</div>
                <div className="form-check form-check-inline mr-5">
                    <input ref={hasPlumbingRadioRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', value: 'yes'}} onClick={handleHasPlumbingYes} onChange={handleUpdateJobOverviewState}/>
                    <label className="form-check-label radio-button-label">Yes</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', value: 'no'}} onClick={handleHasPlumbingYes} onChange={handleUpdateJobOverviewState}/>
                    <label className="form-check-label radio-button-label">No</label>
                </div>
                <div ref={hasPlumbingDivRef} id="has_plumbing_yes" className="pt-3" style={{display: 'none'}}>
                    <div className="pl-5 py-2">
                        <div className="h6">>> Cleanout</div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                            <label className="form-check-label radio-button-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', value: 'no'}} onChange={handleUpdateJobOverviewState}/>
                            <label className="form-check-label radio-button-label">No</label>
                        </div>
                    </div>                
                    <div className="pl-5 py-2">
                        <div className="h6">>> Pipe Diameter</div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', value: '3'}} onClick={handlePipeDiameterOther} onChange={handleUpdateJobOverviewState}/>
                            <label className="form-check-label radio-button-label">3</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', value: '4'}} onClick={handlePipeDiameterOther} onChange={handleUpdateJobOverviewState}/>
                            <label className="form-check-label radio-button-label">4</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input ref={pipeDiameterOtherRadioRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', value: 'other'}} onClick={handlePipeDiameterOther} onChange={handleUpdateJobOverviewState}/>
                            <label className="form-check-label radio-button-label">Other</label>
                        </div>
                        <div ref={pipeDiameterOtherTextRef} id="pipe_diameter_other" className="my-2" style={{display: 'none'}}>
                            <div className="form-inline mr-5">
                                <label className="pr-2">>>> Other: </label>
                                <input {...{className: 'form-control', type: 'text', name: 'outbuilding_pipe_diameter_other'}} onChange={handleUpdateJobOverviewState}/>
                            </div>
                        </div>                
                    </div>                
                </div>
            </div>  
            
            <div className="my-5">
                <div className="h6">CCCUSD</div>
                <div className="form-check form-check-inline mr-5">
                    <input ref={ccusdRadioRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', value: 'yes'}} onClick={handleCCUSD} onChange={handleUpdateJobOverviewState}/>
                    <label className="form-check-label radio-button-label">Yes</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', value: 'no'}} onClick={handleCCUSD} onChange={handleUpdateJobOverviewState}/>
                    <label className="form-check-label radio-button-label">No</label>
                </div>
                <div ref={ccusdDivRef} className="my-5 ml-5 p-4 border" style={{display: 'none'}}>
                    <div className="h6">> Unpermitted Work</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', value: 'yes'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', value: 'no'}} onChange={handleUpdateJobOverviewState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>                
            </div>                
        </div>
    </div>
    )
}

export default JobLocation