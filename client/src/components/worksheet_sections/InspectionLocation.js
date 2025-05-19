import React, {useRef, useEffect} from 'react'
// const _ = require('lodash')

function InspectionLocation(props) {
    const {inspectionData, locationData, setLocationData} = props

    const usbNumRef = useRef(null)
    const occupancyRef = useRef(null)
    const outbuildingRef = useRef(null)
    const outbuildingHasPlumbingRef = useRef(null)
    const outbuildingHasCleanoutRef = useRef(null)
    const outbuildingPipeDiameter = useRef(null)
    const outbuildingPipeDiameterOtherRef = useRef(null)
    const cccsdRef = useRef(null)
    const cccsdUnpermittedRef = useRef(null)
    const openingObservationsRef = useRef(null)
    const outbuildingDivRef = useRef(null)
    const hasPlumbingDivRef = useRef(null)
    const pipeDiameterOtherDivRef= useRef(null)
    const cccsdDivRef = useRef(null)

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

    const handleCCCSD = () => {
        if(cccsdRef.current.value === 'yes'){
            cccsdDivRef.current.style.display = 'block'
        } else {
            cccsdDivRef.current.style.display = 'none'
        }
    }

    useEffect(()=>{
        handlePreloadForm()       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlePreloadForm = ()=>{
        if(inspectionData && inspectionData.location){
            if(Object.keys(inspectionData.location).length > 0){
                let inspectionLocationData = inspectionData.location
                setLocationData({...locationData, ...inspectionLocationData})
            }
        }
    }

    useEffect(()=>{
        let locationKeys = Object.keys(locationData)
        console.log(locationKeys)
        try{
            locationKeys.forEach(item => {
                if(JSON.stringify(locationData[item]) !== ""){
                    document.getElementById(item).value = locationData[item]
                    handleOutbuilding()
                    handleHasPlumbingYes()
                    handlePipeDiameterOther()
                    handleCCCSD()
                }
            })
        } catch(err){
            console.log(err)
        }
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
        if(name === 'cccsd'){
            handleCCCSD(e)
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
                </div>
                <div className="my-5">
                    <div className="h6">Outbuilding</div>
                    <select ref={outbuildingRef} className="custom-select" id="outbuilding" onChange={handleUpdateLocationStateOnChange}>
                        <option>Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div ref={outbuildingDivRef} id="outbuilding_yes" className="my-5 ml-5 p-4 border" style={{display: 'none', backgroundColor: 'white' }}>
                    <div className="h6">> Has Plumbing</div>
                        <select ref={outbuildingHasPlumbingRef} className="custom-select" id="outbuilding_has_plumbing"  onChange={handleUpdateLocationStateOnChange}>
                            <option>Select...</option>
                            <option value="yes">Yes</option>                    
                            <option value="no">No</option>                                
                        </select>
                    <div ref={hasPlumbingDivRef} id="has_plumbing_yes" className="pt-3" style={{ display: 'none' }}>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Cleanout</div>
                            <select ref={outbuildingHasCleanoutRef} className="custom-select" id="outbuilding_has_cleanout" onChange={handleUpdateLocationStateOnChange}>
                                <option>Select...</option>
                                <option value="yes">Yes</option>                    
                                <option value="no">No</option>                                
                            </select>
                        </div>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Pipe Diameter</div>
                            <select ref={outbuildingPipeDiameter} className="custom-select" id="outbuilding_pipe_diameter" onChange={handleUpdateLocationStateOnChange}>
                                <option>Select...</option>
                                <option value="3">3"</option>                    
                                <option value="4">4"</option>                                
                                <option value="other">Other</option>                                
                            </select>
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
                    <div className="h6">CCCSD</div>
                    <select ref={cccsdRef} className="custom-select" id="cccsd" onChange={handleUpdateLocationStateOnChange}>
                        <option>Select...</option>
                        <option value="yes">Yes</option>                    
                        <option value="no">No</option>                    
                    </select>
                    <div ref={cccsdDivRef} className="my-5 ml-5 p-4 border" style={{ display: 'none', backgroundColor: 'white' }}>
                        <div className="h6">> Unpermitted Work</div>
                        <select ref={cccsdUnpermittedRef} className="custom-select" id="cccsd_unpermitted_work" onChange={handleUpdateLocationStateOnChange}>
                            <option>Select...</option>
                            <option value="yes">Yes</option>                    
                            <option value="no">No</option>                                
                        </select>
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
        </>
    )
}

export default InspectionLocation

