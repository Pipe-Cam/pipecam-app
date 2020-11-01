import React, {useRef, useState, useEffect} from 'react'
// import InspectionContext from '../../context/InspectionContext'
const _ = require('lodash')

function InspectionLocation(props) {
    // const jobContext = useContext(InspectionContext)
    // const {job, setJob} = jobContext

    const {handleUpdateLocationStateOnChange, inspectionData} = props

    const [locationData, setLocationData] = useState(null)

    // for show/hide sub-menu items
    const pipeDiameterOtherRadioRef = useRef(null)
    const pipeDiameterOtherTextRef = useRef(null)
    const hasPlumbingRadioRef = useRef(null)
    const hasPlumbingDivRef = useRef(null)
    const ccusdRadioRef = useRef(null)
    const ccusdDivRef = useRef(null)
    const outbuildingRadioRef = useRef(null)
    const outbuildingDivRef = useRef(null)
    const openingObservationsRef = useRef(null)

    // for setting default values to state
    const occupancyRef = useRef(null)
    const outbuildingRef = useRef(null)
    const cccusdRef = useRef(null)
    const cccusdUnpermittedRef = useRef(null)

    const checkRef = useRef(null)
    const usbRef = useRef(null)
    const outbuilding_pipe_diameter_other = useRef(null)

    useEffect(()=>{
        if(inspectionData){
            let objkeys = Object.keys(inspectionData)
            if(objkeys.includes('location')){
                console.log(inspectionData.location)
                setLocationData(inspectionData.location)
                preloadLocationData(inspectionData.location)
            }
        }
    },[])

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

    const preloadLocationData = (locData) => {
        if(locData){
            console.log(locData)

            // non-radio
            let refList = [ 
                checkRef,
                usbRef,
                outbuilding_pipe_diameter_other,
                openingObservationsRef
            ]

            for(let i=0, max=refList.length; i < max; i++){
                let name = refList[i].current.name
                console.log(name)
                if(refList[i].current.type === 'number'){
                    refList[i].current.defaultValue = Number(locData[name])
                } else {
                    refList[i].current.defaultValue = locData[name]
                }
            }
            // [ checkRef,
            //   usbRef,
            //   outbuilding_pipe_diameter_other ].forEach(item => {
            //       let name = item.current.name
            //       item.current.defaultValue = locData[name].value
            //   })
        }
    }

    // const preloadLocationDefaults = () => {
    //     if(inspectionData && inspectionData.location){
    //         let locationData = inspectionData
    //         console.log(locationData)
    //     }
    //     // let locationKeys = Object.keys(locationData)
    // }

    // useEffect(()=>{
    //     preloadLocationDefaults()
    // },[])

    // const handleUpdateJobOverviewState = (e) => {
    //     // let objBranch = 'location'
    //     // let name = e.target.name
    //     // let type = e.target.type
    //     // let elementType = _.lowerCase(e.target.nodeName)
    //     // let tmpJob = job

    //     // if(type === 'text' || type === 'date' || elementType === 'textarea' || type === 'radio'){
    //     //     tmpJob[objBranch][name] = e.target.value
    //     //     setJob(tmpJob)
    //     // }
    //     // console.log(job)
    // }

    // const handleUpdateJobOverviewStateDefault = (elem) => {
    //     // let objBranch = 'location'
    //     // let name = elem.name

    //     // let tmpJob = job
    //     // tmpJob[objBranch][name] = elem.value
    //     // setJob(tmpJob)

    //     // console.log(job)
    // }

    // useEffect(()=>{
    //     // [occupancyRef,
    //     // outbuildingRef,
    //     // cccusdRef,
    //     // cccusdUnpermittedRef,
    //     // pipeDiameterOtherRadioRef,
    //     // pipeDiameterOtherTextRef,
    //     // hasPlumbingRadioRef,
    //     // ccusdRadioRef,
    //     // outbuildingRadioRef,
    //     // openingObservationsRef]

    //     [occupancyRef,
    //     outbuildingRef,
    //     cccusdRef,
    //     cccusdUnpermittedRef].forEach(item=>{
    //         handleUpdateJobOverviewStateDefault(item.current)
    //     })

    // }, [])


    return (
        <div>
            <h3>Location</h3>
            <div className="pt-2">
                <div className="mb-5 mt-3">
                    <div>
                        <label className="h6" htmlFor='check_num'>Check#</label>
                        <input ref={checkRef} {...{className: 'form-control mb-3', type: 'number', name: 'check_num', id: 'check_num__', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateLocationStateOnChange}/>
                    </div>
                    <div>
                        <label className="h6" htmlFor='usb_num'>USB#</label>
                        <input ref={usbRef} {...{className: 'form-control mb-3', type: 'number', name: 'usb_num', id: 'usb_num_number__', min: 0, placeholder: '(Optional)'}} onChange={handleUpdateLocationStateOnChange}/>
                    </div>
                    </div>
                    <div className="my-5">
                    <div className="h6">Occupancy</div>
                    <div className="form-check form-check-inline mr-5">
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
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Outbuilding</div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={outbuildingRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', id: 'outbuilding__yes', value: 'yes' }} onClick={handleOutbuilding} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={outbuildingRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding', id: 'outbuilding__no', value: 'no', defaultChecked: 'checked' }} onClick={handleOutbuilding} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>
                <div ref={outbuildingDivRef} id="outbuilding_yes" className="my-5 ml-5 p-4 border" style={{ display: 'none', backgroundColor: 'white' }}>
                    <div className="h6">> Has Plumbing</div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={hasPlumbingRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', id: 'outbuilding_has_plumbing__yes', value: 'yes' }} onClick={handleHasPlumbingYes} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_plumbing', id: 'outbuilding_has_plumbing__no', value: 'no', defaultChecked: 'checked' }} onClick={handleHasPlumbingYes} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                    <div ref={hasPlumbingDivRef} id="has_plumbing_yes" className="pt-3" style={{ display: 'none' }}>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Cleanout</div>
                            <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', id: 'outbuilding_has_cleanout__yes', value: 'yes' }} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline mr-5">
                                <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'outbuilding_has_cleanout', id: 'outbuilding_has_cleanout__no', value: 'no', defaultChecked: 'checked' }} onChange={handleUpdateLocationStateOnChange} />
                                <label className="form-check-label radio-button-label">No</label>
                            </div>
                        </div>
                        <div className="pl-5 py-2">
                            <div className="h6">>> Pipe Diameter</div>
                            <div className="form-check form-check-inline mr-5">
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
                            </div>
                            <div ref={pipeDiameterOtherTextRef} id="pipe_diameter_other" className="my-2" style={{ display: 'none' }}>
                                <div className="form-inline mr-5">
                                    <label className="pr-2">>>> Other: </label>
                                    <input ref={outbuilding_pipe_diameter_other} {...{ className: 'form-control', type: 'text', name: 'outbuilding_pipe_diameter_other', id: 'outbuilding_pipe_diameter_other_text' }} onChange={handleUpdateLocationStateOnChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 mb-3">
                    <div className="h6">CCCUSD</div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={ccusdRadioRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', id: 'cccusd__yes', value: 'yes' }} onClick={handleCCUSD} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={cccusdRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd', id: 'cccusd__no', value: 'no', defaultChecked: 'checked' }} onClick={handleCCUSD} onChange={handleUpdateLocationStateOnChange} />
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                    <div ref={ccusdDivRef} className="my-5 ml-5 p-4 border" style={{ display: 'none', backgroundColor: 'white' }}>
                        <div className="h6">> Unpermitted Work</div>
                        <div className="form-check form-check-inline mr-5">
                            <input ref={cccusdUnpermittedRef} {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', id: 'cccusd_unpermitted_work__yes', value: 'yes' }} onChange={handleUpdateLocationStateOnChange} />
                            <label className="form-check-label radio-button-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input {...{ className: 'form-check-input radio-button', type: 'radio', name: 'cccusd_unpermitted_work', id: 'cccusd_unpermitted_work__no', value: 'no', defaultChecked: 'checked' }} onChange={handleUpdateLocationStateOnChange} />
                            <label className="form-check-label radio-button-label">No</label>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-3">
                    <div>
                        <label className="h6" htmlFor='opening_observations'>Opening Observations</label>
                        <textarea ref={openingObservationsRef} {...{ className: 'form-control mb-3', name: 'opening_observations', id: 'opening_observations', rows: 4, placeholder: '' }} onChange={handleUpdateLocationStateOnChange} />
                    </div>
                </div>
            </div>
            {JSON.stringify(inspectionData.location)}
        </div>
    )
}

export default InspectionLocation

