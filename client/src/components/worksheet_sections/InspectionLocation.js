import React, {useRef, useState, useEffect} from 'react'
// import InspectionContext from '../../context/InspectionContext'
const _ = require('lodash')

function InspectionLocation(props) {
    // const {handleUpdateLocationStateOnChange, inspectionData} = props
    const {inspectionData, locationData, setLocationData} = props

    const checkNumRef = useRef(null)
    const usbNumRef = useRef(null)
    const occupancyRef = useRef(null)
    const outbuildingRef = useRef(null)
    const outbuildingHasPlumbingRef = useRef(null)
    const outbuildingHasCleanoutRef = useRef(null)
    const outbuildingPipeDiameter = useRef(null)
    const outbuildingPipeDiameterOtherRef = useRef(null)
    const cccusdRef = useRef(null)
    const cccusdUnpermittedRef = useRef(null)
    const openingObservationsRef = useRef(null)
    const outbuildingDivRef = useRef(null)
    const hasPlumbingDivRef = useRef(null)
    const pipeDiameterOtherDivRef= useRef(null)
    const ccusdDivRef = useRef(null)

    const handleOutbuilding = () => {
        if(outbuildingRef.current.value === 'yes'){
            outbuildingDivRef.current.style.display = 'block'
        } else {
            outbuildingDivRef.current.style.display = 'none'
        }
    }

    const handleHasPlumbingYes = () => {
        if(outbuildingHasPlumbingRef.current.value === 'yes'){
            hasPlumbingDivRef.current.style.display = 'block'
        } else {
            hasPlumbingDivRef.current.style.display = 'none'
        }
    }

    const handlePipeDiameterOther = () => {
        if(outbuildingPipeDiameter.current.value === 'other'){
            pipeDiameterOtherDivRef.current.style.display = 'block'
        } else {
            pipeDiameterOtherDivRef.current.style.display = 'none'
        }
    }

    const handleCCUSD = () => {
        if(cccusdRef.current.value === 'yes'){
            ccusdDivRef.current.style.display = 'block'
        } else {
            ccusdDivRef.current.style.display = 'none'
        }
    }

    useEffect(()=>{
        handlePreloadForm()       
    },[])

    const handlePreloadForm = ()=>{
        if(inspectionData && inspectionData.location){
            if(Object.keys(inspectionData.location).length > 0){
                let inspectionLocationData = inspectionData.location
                setLocationData({...locationData, ...inspectionLocationData})
                // console.log("set location data", {...locationData, ...inspectionLocationData})
            }
        }
    }

    useEffect(()=>{
        let locationKeys = Object.keys(locationData)
        locationKeys.forEach(item => {
            // console.log(JSON.stringify(locationData[item]))
            if(JSON.stringify(locationData[item]) !== ""){
                document.getElementById(item).value = locationData[item]
                handleOutbuilding()
                handleHasPlumbingYes()
                handlePipeDiameterOther()
                handleCCUSD()
            }
        })
    },[locationData])

    const handleUpdateLocationStateOnChange = (e)=>{
        console.log({name: e.target.id, value: e.target.value})
        let name = e.target.id
        let value = e.target.value

        if(name === 'outbuilding'){
            handleOutbuilding(e)
        }
        if(name === 'outbuilding_has_plumbing'){
            handleHasPlumbingYes(e)
        }
        if(name === 'outbuilding_pipe_diameter'){
            handleHasPlumbingYes(e)
            handlePipeDiameterOther(e)
        }
        if(name === 'cccusd'){
            handleCCUSD(e)
        }

        let tmpLocationData = locationData
        tmpLocationData[name] = value

        if(tmpLocationData['outbuilding_pipe_diameter'] !== 'other'){
            tmpLocationData['outbuilding_pipe_diameter_other'] = ''
            document.getElementById('outbuilding_pipe_diameter_other').value = ''
        }

        console.log(JSON.stringify(tmpLocationData))

        setLocationData(tmpLocationData)
    }
    
    return (
        <>
        <div>
            <h3>Location</h3>
            <div className="pt-2">
                <div className="mb-5 mt-3">
                    <div>
                        <label className="h6" htmlFor='check_num'>Check#</label>
                        <input ref={checkNumRef} {...{className: 'form-control mb-3', type: 'number', name: 'check_num', id: 'check_num', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateLocationStateOnChange}/>
                    </div>
                    <div>
                        <label className="h6" htmlFor='usb_num'>USB#</label>
                        <input ref={usbNumRef} {...{className: 'form-control mb-3', type: 'number', name: 'usb_num', id: 'usb_num', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateLocationStateOnChange}/>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Occupancy</div>
                    <select ref={occupancyRef} className="custom-select" id="occupancy" onChange={handleUpdateLocationStateOnChange}>
                        <option>Select...</option>
                        <option value="occupied">Occupied</option>
                        <option value="vacant">Vacant</option>
                        <option value="unknown">Unknown</option>
                    </select>                        

                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={occupancyRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', id: 'occupancy__occupied', value: 'occupied' }} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Occupied</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', id: 'occupancy__vacant', value: 'vacant' }} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Vacant</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'occupancy', id: 'occupancy__unknown', value: 'unknown', defaultChecked: 'checked' }} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Unknown</label>
                    </div> */}
                </div>
                <div className="my-5">
                    <div className="h6">Outbuilding</div>
                    <select ref={outbuildingRef} className="custom-select" id="outbuilding" onChange={handleUpdateLocationStateOnChange}>
                        <option>Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={outbuildingRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', id: 'outbuilding__yes', value: 'yes' }} onClick={handleOutbuilding} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={outbuildingRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', id: 'outbuilding__no', value: 'no', defaultChecked: 'checked' }} onClick={handleOutbuilding} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div> */}
                </div>
                <div ref={outbuildingDivRef} id="outbuilding_yes" className="my-5 ml-5 p-4 border" style={{display: 'none', backgroundColor: 'white' }}>
                    <div className="h6">> Has Plumbing</div>
                        <select ref={outbuildingHasPlumbingRef} className="custom-select" id="outbuilding_has_plumbing"  onChange={handleUpdateLocationStateOnChange}>
                            <option>Select...</option>
                            <option value="yes">Yes</option>                    
                            <option value="no">No</option>                                
                        </select>
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={hasPlumbingRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', id: 'outbuilding_has_plumbing__yes', value: 'yes' }} onClick={handleHasPlumbingYes} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', id: 'outbuilding_has_plumbing__no', value: 'no', defaultChecked: 'checked' }} onClick={handleHasPlumbingYes} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div> */}
                    <div ref={hasPlumbingDivRef} id="has_plumbing_yes" className="pt-3" style={{ display: 'none' }}>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Cleanout</div>
                            <select ref={outbuildingHasCleanoutRef} className="custom-select" id="outbuilding_has_cleanout" onChange={handleUpdateLocationStateOnChange}>
                                <option>Select...</option>
                                <option value="yes">Yes</option>                    
                                <option value="no">No</option>                                
                            </select>
                            {/* <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', id: 'outbuilding_has_cleanout__yes', value: 'yes' }} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', id: 'outbuilding_has_cleanout__no', value: 'no', defaultChecked: 'checked' }} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">No</label>
                            </div> */}
                        </div>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Pipe Diameter</div>
                            <select ref={outbuildingPipeDiameter} className="custom-select" id="outbuilding_pipe_diameter" onChange={handleUpdateLocationStateOnChange}>
                                <option>Select...</option>
                                <option value="3">3"</option>                    
                                <option value="4">4"</option>                                
                                <option value="other">Other</option>                                
                            </select>
                            {/* <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', id: 'outbuilding_pipe_diameter__3', value: '3', defaultChecked: 'checked' }} onClick={handlePipeDiameterOther} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">3</label>
                            </div>
                            <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', id: 'outbuilding_pipe_diameter__4', value: '4' }} onClick={handlePipeDiameterOther} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">4</label>
                            </div>
                            <div className="form-check form-check-inline mr-5">
                                <input ref={pipeDiameterOtherRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_pipe_diameter', id: 'outbuilding_pipe_diameter__other', value: 'other' }} onClick={handlePipeDiameterOther} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">Other</label>
                            </div> */}
                            <div ref={pipeDiameterOtherDivRef} id="pipe_diameter_other" className="my-2" style={{ display: 'none'}}>
                                <div className="form-inline mr-5">
                                    <label className="pr-2">>>> Other: </label>
                                    <input ref={outbuildingPipeDiameterOtherRef} {...{ className: 'form-control', type: 'text', name: 'outbuilding_pipe_diameter_other', id: 'outbuilding_pipe_diameter_other' }} onChange={handleUpdateLocationStateOnChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-3">
                    <div className="h6">CCCUSD</div>
                    <select ref={cccusdRef} className="custom-select" id="cccusd" onChange={handleUpdateLocationStateOnChange}>
                        <option>Select...</option>
                        <option value="yes">Yes</option>                    
                        <option value="no">No</option>                    
                    </select>
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={ccusdRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', id: 'cccusd__yes', value: 'yes' }} onClick={handleCCUSD} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={cccusdRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', id: 'cccusd__no', value: 'no', defaultChecked: 'checked' }} onClick={handleCCUSD} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div> */}
                    <div ref={ccusdDivRef} className="my-5 ml-5 p-4 border" style={{ display: 'none', backgroundColor: 'white' }}>
                        <div className="h6">> Unpermitted Work</div>
                        <select ref={cccusdUnpermittedRef} className="custom-select" id="cccusd_unpermitted_work" onChange={handleUpdateLocationStateOnChange}>
                            <option>Select...</option>
                            <option value="yes">Yes</option>                    
                            <option value="no">No</option>                                
                        </select>
                        {/* <div className="form-check form-check-inline mr-5">
                            <input ref={cccusdUnpermittedRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', id: 'cccusd_unpermitted_work__yes', value: 'yes' }} onChange={handleUpdateLocationStateOnChange} />
                            <label className="form-check-label radio-button-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', id: 'cccusd_unpermitted_work__no', value: 'no', defaultChecked: 'checked' }} onChange={handleUpdateLocationStateOnChange} />
                            <label className="form-check-label radio-button-label">No</label>
                        </div> */}
                    </div>
                </div>
                <div className="mt-5 mb-3">
                    <div>
                        <label className="h6" htmlFor='opening_observations'>Opening Observations</label>
                        <textarea ref={openingObservationsRef} {...{ className: 'form-control mb-3', name: 'opening_observations', id: 'opening_observations', rows: 4, placeholder: '' }} onChange={handleUpdateLocationStateOnChange} />
                    </div>
                </div>
            </div>
        </div>
            {/* {JSON.stringify(inspectionData.location)} */}
        </>
    )
}

export default InspectionLocation

