import React, {useState, useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'

import Spinner from '../ui_components/Spinner'
// import ObservationHome from './ObservationHome'
// import InspectionContext from '../../context/InspectionContext'

// TODO: 
// x. load ui
// x. form elements save to state onChange behavior
// x. get inspectionData from database
// x. handle undefined query string
// x. determine if access data exists,
// x. determine if access[accessNumber] exists, if yes then load access values into form
// 7. onSubmit, save access state data to db
// 8. redirect back to /access/:id

function NewAccess() {
    // const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const [inspectionData, setInspectionData] = useState(null)
    const newAccessPlaceholder = {location: "", details: {}, observations: []}
    const [newAccessState, setNewAccessState] = useState(newAccessPlaceholder)
    const [accessNumber, setAccessNumber] = useState(null)
    
    let {id} = useParams()
    let history = useHistory()
    
    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        let accessNum = urlParams.get('access')

        if(!isNaN(accessNum) && accessNum !== null){
            setAccessNumber(accessNum)
        }

        getInspectionDataOnLoad(id, accessNum)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(inspectionData){
            // console.log(inspectionData)
            let accessDataExists = doesAccessObjExist(inspectionData)
            // console.log('access data exists: ', accessDataExists)
            let accessNumberExists = false;

            if(accessDataExists){
                accessNumberExists = doesAccessNumberExist(accessNumber, inspectionData)
            }

            if(accessNumberExists){
                preloadFormData()
            }
        }
    // eslint-disable-next-line
    }, [, inspectionData])

    const doesAccessObjExist = (data) => {
        let dataKeys = Object.keys(data)
        return dataKeys.includes('access')
    }

    const doesAccessNumberExist = (accessNum, data) => {
        let dataKeys = Object.keys(data)
        return dataKeys.includes(accessNum)
    }

    const getInspectionDataOnLoad = async (id, accessNum) => {
        console.log(id)
        console.log(accessNum)
        let inspectionDataJSON = await getInspectionById(id)
        var inspectionDataObj;

        try {
            inspectionDataObj = JSON.parse(inspectionDataJSON)[0]
            // console.log(inspectionDataObj)
            setInspectionData(inspectionDataObj)
        } catch(err){
            console.log(err)
        } 
    }

    const preloadFormData = () => {
        try {
            let accessData = inspectionData.access.accessNumber
            let accessDataKeys = Object.keys(accessData)

            accessDataKeys.forEach(item => {
                document.getElementById(item).value = accessData[item]
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateAccessStateOnChange = (locationString, objBranch) => {
        let tmpAccessState = newAccessState
        
        tmpAccessState[objBranch] = locationString
        setNewAccessState({...tmpAccessState})
        console.log(tmpAccessState)
    }

    const handleNewAccessLocationState = (locationString) => {
        let objBranch = 'location'
        handleUpdateAccessStateOnChange(locationString, objBranch)
    }
    
    const handleNewAccessDetailsState = (stateObj) => {
        let objBranch = 'details'
        handleUpdateAccessStateOnChange(stateObj, objBranch)
    }

    const disableButton = (btnId) => {
        document.getElementById(btnId).setAttribute('disabled', true)
    }

    const handleUpdateAccess = async (e) => {
        e.preventDefault()
        disableButton('add_access_btn')

        console.log("inspection id: ", id)
        console.log(newAccessState)
        console.log('accessNumber: ', accessNumber)

        var tmpAccessObj = {};
        if(inspectionData.access){
            tmpAccessObj = inspectionData.access
        }
        
        let useNumber = accessNumber
        if(isNaN(Number(accessNumber))){
            useNumber = "1"
        }

        tmpAccessObj[useNumber] = newAccessState

        console.log(tmpAccessObj[useNumber])
        await updateInspectionById(id, {access: tmpAccessObj, last_modified: new Date()})
        history.push(`/access/${id}`)
        window.location.reload()
    }

    if(!inspectionData) {
        return(<Spinner />)
    } else {
        return (
            <>
                <h1>New Access</h1>
                <div className="px-4 py-3">
                    <form onSubmit={handleUpdateAccess}>
                        <div className="row justify-content-center">
                            <div className="col col-12">
                                <AccessLocation {...{handleNewAccessLocationState}} />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col col-12">
                                <AccessDetails {...{handleNewAccessDetailsState}} />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col col-12">
                                <button className="btn-primary btn-lg float-right" type="submit" name="submit" id="add_access_btn">&nbsp; Add Access &nbsp;</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

}

export default NewAccess


const AccessLocation = (props) => {
    const {handleNewAccessLocationState} = props
    const [accessLocationState, setAccessLocationState] = useState('')

    const accessLocationRef = useRef(null)

    useEffect(()=>{
        console.log(accessLocationState)
        handleNewAccessLocationState(accessLocationState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accessLocationState])

    const handleAddToAccessLocation = (e) => {
        e.preventDefault()
        let currentValue = accessLocationRef.current.value
        let updatedValue = `${currentValue} ${e.target.innerText}`
        accessLocationRef.current.value = updatedValue.trim()
        setAccessLocationState(updatedValue.trim())
    }

    const handleClearAccessLocation = (e) => {
        e.preventDefault()
        let updatedValue = ''
        accessLocationRef.current.value = updatedValue
        setAccessLocationState(updatedValue)
    }

    const handleAccessLocation = (e) => {
        console.log(e.target.value)
        setAccessLocationState(e.target.value.trim())
    }

    // const color = {
    //     'purple': '#ba68c8',
    //     'orange': '#ff7043',
    //     'blue': '#90caf9',
    //     'red': '#ef5350'
    // }

    // const bg = (colorVar) => {
    //     return {'backgroundColor': colorVar}
    // }

    return(
        <div className="py-3 px-4 border bg-foreground">
            <div className="">
                <h3>Access Location</h3>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-danger float-right my-2" onClick={handleClearAccessLocation}>Clear</button>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12">
                        <input ref={accessLocationRef} className="form-control form-control-lg" type="text" id="access_location" name="access_location" defaultValue="" onChange={handleAccessLocation}/>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-success" onClick={handleAddToAccessLocation}>Left</button>
                        <button className="btn btn-success border-left" onClick={handleAddToAccessLocation}>Right</button>
                        <button className="btn btn-success border-left" onClick={handleAddToAccessLocation}>Front</button>
                        <button className="btn btn-success border-left" onClick={handleAddToAccessLocation}>Back</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-warning" onClick={handleAddToAccessLocation}>@</button>
                        <button className="btn btn-warning border-left" onClick={handleAddToAccessLocation}>of</button>
                        <button className="btn btn-warning border-left" onClick={handleAddToAccessLocation}>in</button>
                        <button className="btn btn-warning border-left" onClick={handleAddToAccessLocation}>and</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-warning" onClick={handleAddToAccessLocation}>covered</button>
                        <button className="btn btn-warning border-left" onClick={handleAddToAccessLocation}>side</button>
                        <button className="btn btn-warning border-left" onClick={handleAddToAccessLocation}>under</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-primary" onClick={handleAddToAccessLocation}>Foundation Edge</button>
                        <button className="btn border-left btn-primary" onClick={handleAddToAccessLocation}>Property Line</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-primary" onClick={handleAddToAccessLocation}>Corner</button>
                        <button className="btn border-left btn-primary" onClick={handleAddToAccessLocation}>Residence</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-danger" onClick={handleAddToAccessLocation}>Entry</button>
                        <button className="btn border-left btn-danger" onClick={handleAddToAccessLocation}>Walk</button>
                        <button className="btn border-left btn-danger" onClick={handleAddToAccessLocation}>Window</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-danger" onClick={handleAddToAccessLocation}>Porch</button>
                        <button className="btn border-left btn-danger" onClick={handleAddToAccessLocation}>Deck</button>
                        <button className="btn border-left btn-danger" onClick={handleAddToAccessLocation}>Hose Bib</button>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-info" onClick={handleAddToAccessLocation}>Garage</button>
                        <button className="btn border-left btn-info" onClick={handleAddToAccessLocation}>Driveway</button>
                        <button className="btn border-left btn-info" onClick={handleAddToAccessLocation}>Living Room</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col btn-group btn-group-lg">
                        <button className="btn btn-info" onClick={handleAddToAccessLocation}>Bathroom</button>
                        <button className="btn border-left btn-info" onClick={handleAddToAccessLocation}>Closet</button>
                        <button className="btn border-left btn-info" onClick={handleAddToAccessLocation}>Kitchen</button>
                        <button className="btn border-left btn-info" onClick={handleAddToAccessLocation}>Bedroom</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AccessDetails = (props) => {
    const {handleNewAccessDetailsState} = props
    const [accessDetailsState, setAccessDetailsState] = useState(null)

    const [pipeDiameter, setPipeDiameter] = useState(null)
    const [cleanoutDirection, setCleanoutDirection] = useState(null)
    const [bopdType, setBopdType] = useState(null)
    const [bopdCondition, setBopdCondition] = useState('N/A')
    const [accessMaterial, setAccessMaterial] = useState(null)
    const [cleanoutIssues, setCleanoutIssues] = useState('N/A')

    const bopdConditionDivRef = useRef(null)
    const bopdConditionTitleDivRef = useRef(null)

    const pipeDiameter3Ref = useRef(null)
    const pipeDiameter4Ref = useRef(null)
    const pipeDiameter6Ref = useRef(null)

    const cleanoutDirection1WayRef = useRef(null)
    const cleanoutDirection2WayRef = useRef(null)
    const cleanoutDirectionBreakInRef = useRef(null)
    const cleanoutDirectionStubRef = useRef(null)
    const cleanoutDirectionToiletRef = useRef(null)
    const cleanoutDirectionRoofRef = useRef(null)

    const bopdTypeNoneRef = useRef(null)
    const bopdTypePopperRef = useRef(null)
    const bopdTypeMushroomRef = useRef(null)
    const bopdTypeCheckValveRef = useRef(null)
    const bopdTypeReliefRef = useRef(null)

    const bopdConditionGoodRef = useRef(null)
    const bopdConditionBrokenRef = useRef(null)
    const bopdConditionMissingRef = useRef(null)
    const bopdConditionBallRef = useRef(null)
    const bopdConditionTooLowRef = useRef(null)
    const bopdConditionTooHighRef = useRef(null)

    const accessMaterialCiRef = useRef(null)
    const accessMaterialAcRef = useRef(null)
    const accessMaterialAbsRef = useRef(null)
    const accessMaterialVcpRef = useRef(null)
    const accessMaterialPvcRef = useRef(null)
    const accessMaterialOrbgRef = useRef(null)

    const cleanoutIssuesBelowGradeRef = useRef(null)
    const cleanoutIssuesExcessVegetationRef = useRef(null)

    useEffect(()=>{
        handleNewAccessDetailsState(accessDetailsState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accessDetailsState])

    useEffect(()=>{
        let accessDetails = {
            pipe_diameter: pipeDiameter,
            cleanout_direction: cleanoutDirection,
            bopd_type: bopdType,
            bopd_condition: bopdCondition,
            access_material: accessMaterial,
            cleanout_issues: cleanoutIssues
        }

        setAccessDetailsState(accessDetails)
    },[pipeDiameter, cleanoutDirection, bopdType, bopdCondition, accessMaterial, cleanoutIssues])

    const handlePipeDiameter = (e) => {
        e.preventDefault();
        let pipeDiameterValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        // remove selected button formatting
        let pipeDiamRefs = [pipeDiameter3Ref, pipeDiameter4Ref, pipeDiameter6Ref]
        
        pipeDiamRefs.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setPipeDiameter(pipeDiameterValue)
    }

    const handleCleanoutDirection = (e) => {
        e.preventDefault();
        let cleanoutDirectionValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        // remove selected button formatting
        let cleanoutDirectionRefs = [
            cleanoutDirection1WayRef,
            cleanoutDirection2WayRef,
            cleanoutDirectionBreakInRef,
            cleanoutDirectionStubRef,
            cleanoutDirectionToiletRef,
            cleanoutDirectionRoofRef
        ]
        
        cleanoutDirectionRefs.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setCleanoutDirection(cleanoutDirectionValue)
    }

    const handleBopdType = (e) => {
        e.preventDefault();
        let bopdTypeValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        if(bopdTypeValue === 'none') {
            bopdConditionDivRef.current.style.display = 'none'
            bopdConditionTitleDivRef.current.style.display = 'none'

        } else {
            bopdConditionDivRef.current.style.display = 'inherit'
            bopdConditionTitleDivRef.current.style.display = 'inherit'
        }

        // remove selected button formatting
        let bopdTypeRefs = [
            bopdTypeNoneRef,
            bopdTypePopperRef,
            bopdTypeMushroomRef,
            bopdTypeCheckValveRef,
            bopdTypeReliefRef
        ]
        
        bopdTypeRefs.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setBopdType(bopdTypeValue)
    }
    
    const handleBopdCondition = (e) => {
        e.preventDefault();
        let bopdConditionValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        // remove selected button formatting
        let bopdConditionRefs = [
            bopdConditionGoodRef,
            bopdConditionBrokenRef,
            bopdConditionMissingRef,
            bopdConditionBallRef,
            bopdConditionTooLowRef,
            bopdConditionTooHighRef
        ]
        
        bopdConditionRefs.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setBopdCondition(bopdConditionValue)
    }
    
    const handleAccessMaterial = (e) => {
        e.preventDefault();
        let accessMaterialValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        // remove selected button formatting
        let accessMaterialRefs = [
            accessMaterialCiRef,
            accessMaterialAcRef,
            accessMaterialAbsRef,
            accessMaterialVcpRef,
            accessMaterialPvcRef,
            accessMaterialOrbgRef
        ]
        
        accessMaterialRefs.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setAccessMaterial(accessMaterialValue)
    }

    const handleCleanoutIssues = (e) => {
        e.preventDefault();
        let cleanoutIssuesValue = e.target.getAttribute('data-value')
        let bsColor = e.target.getAttribute('data-bscolor')

        // remove selected button formatting
        let cleanoutIssuesRef = [
            cleanoutIssuesBelowGradeRef,
            cleanoutIssuesExcessVegetationRef
        ]
        
        cleanoutIssuesRef.forEach(item => {
            let itemColor = item.current.getAttribute('data-bscolor')
            item.current.classList.remove(`btn-${itemColor}`)
            item.current.classList.remove(`text-white`)
        })

        // add selected button formatting
        e.target.classList.add(`btn-${bsColor}`)
        e.target.classList.add(`text-white`)
        setCleanoutIssues(cleanoutIssuesValue)
    }
    
    return(

        <div className="py-3 px-4 border bg-foreground">
            <div className="">
                <h3>Access Details</h3>
                <div className="row mt-4">
                    <div className="col h6">Pipe Diameter <span className="text-danger">*</span></div>
                </div>
                <div className="row">
                    <div className="col btn-group">
                        <button ref={pipeDiameter3Ref} className="btn btn-outline-secondary font-weight-bold" data-bscolor="secondary" data-value="3" onClick={handlePipeDiameter}>3"</button>
                        <button ref={pipeDiameter4Ref} className="btn btn-outline-success border-left-success font-weight-bold" data-bscolor="success" data-value="4" onClick={handlePipeDiameter}>4"</button>
                        <button ref={pipeDiameter6Ref} className="btn btn-outline-danger border-left-danger font-weight-bold" data-bscolor="danger" data-value="6" onClick={handlePipeDiameter}>6"</button>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col h6">Cleanout Direction <span className="text-danger">*</span></div>
                </div>

                <div className="row">
                    <div className="col btn-group">
                        <button ref={cleanoutDirection1WayRef} className="btn btn-outline-primary font-weight-bold" data-bscolor="primary" data-value="one_way" onClick={handleCleanoutDirection}>1-Way</button>
                        <button ref={cleanoutDirection2WayRef} className="btn btn-outline-success border-left-success font-weight-bold" data-bscolor="success" data-value="two_way" onClick={handleCleanoutDirection}>2-Way</button>
                        <button ref={cleanoutDirectionBreakInRef} className="btn btn-outline-danger border-left-danger font-weight-bold" data-bscolor="danger" data-value="break_in" onClick={handleCleanoutDirection}>Break-In</button>
                        <button ref={cleanoutDirectionStubRef} className="btn btn-outline-warning border-left-warning font-weight-bold" data-bscolor="warning" data-value="stub" onClick={handleCleanoutDirection}>Stub</button>
                        <button ref={cleanoutDirectionToiletRef} className="btn btn-outline-secondary border-left-secondary font-weight-bold" data-bscolor="secondary" data-value="toilet" onClick={handleCleanoutDirection}>Toilet</button>
                        <button ref={cleanoutDirectionRoofRef} className="btn btn-outline-info border-left-info font-weight-bold" data-bscolor="info" data-value="roof" onClick={handleCleanoutDirection}>Roof</button>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col h6">Access Material <span className="text-danger">*</span></div>
                </div>

                <div className="row">
                    <div className="col btn-group">
                        <button ref={accessMaterialCiRef} className="btn btn-outline-warning font-weight-bold" data-bscolor="warning" data-value="ci" onClick={handleAccessMaterial}>CI</button>
                        <button ref={accessMaterialAcRef} className="btn btn-outline-secondary border-left-secondary font-weight-bold" data-bscolor="secondary" data-value="ac" onClick={handleAccessMaterial}>AC</button>
                        <button ref={accessMaterialAbsRef} className="btn btn-outline-primary border-left-primary font-weight-bold" data-bscolor="primary" data-value="abs" onClick={handleAccessMaterial}>ABS</button>
                        <button ref={accessMaterialVcpRef} className="btn btn-outline-success border-left-success font-weight-bold" data-bscolor="success" data-value="vcp" onClick={handleAccessMaterial}>VCP</button>
                        <button ref={accessMaterialPvcRef} className="btn btn-outline-info border-left-info font-weight-bold" data-bscolor="info" data-value="pvc" onClick={handleAccessMaterial}>PVC</button>
                        <button ref={accessMaterialOrbgRef} className="btn btn-outline-danger border-left-danger font-weight-bold" data-bscolor="danger" data-value="orbg" onClick={handleAccessMaterial}>ORBG</button>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col h6">BOPD <span className="text-danger">*</span></div>
                </div>

                <div className="row">
                    <div className="col btn-group">
                        <button ref={bopdTypeNoneRef} className="btn btn-outline-secondary font-weight-bold" data-bscolor="secondary" data-value="none" onClick={handleBopdType}>None</button>
                        <button ref={bopdTypePopperRef} className="btn btn-outline-primary border-left-primary font-weight-bold" data-bscolor="primary" data-value="popper" onClick={handleBopdType}>Popper</button>
                        <button ref={bopdTypeMushroomRef} className="btn btn-outline-success border-left-success font-weight-bold" data-bscolor="success" data-value="mushroom" onClick={handleBopdType}>Mushroom</button>
                        <button ref={bopdTypeCheckValveRef} className="btn btn-outline-info border-left-info font-weight-bold" data-bscolor="info" data-value="check_valve" onClick={handleBopdType}>Check Valve</button>
                        <button ref={bopdTypeReliefRef} className="btn btn-outline-danger border-left-danger font-weight-bold" data-bscolor="danger" data-value="relief" onClick={handleBopdType}>Relief Valve</button>
                    </div>
                </div>

                <div className="row mt-4" ref={bopdConditionTitleDivRef} style={{display: 'none'}}>
                    <div className="col h6">BOPD Condition <span className="text-danger">*</span></div>
                </div>

                <div className="row" ref={bopdConditionDivRef} style={{display: 'none'}}>
                    <div className="col btn-group">
                        <button ref={bopdConditionGoodRef} className="btn btn-outline-success font-weight-bold" data-bscolor="success" data-value="good" onClick={handleBopdCondition}>Good</button>
                        <button ref={bopdConditionBrokenRef} className="btn btn-outline-danger font-weight-bold" data-bscolor="danger" data-value="broken" onClick={handleBopdCondition}>Broken</button>
                        <button ref={bopdConditionMissingRef} className="btn btn-outline-secondary border-left-secondary font-weight-bold" data-bscolor="secondary" data-value="missing" onClick={handleBopdCondition}>Missing</button>
                        <button ref={bopdConditionBallRef} className="btn btn-outline-primary border-left-primary font-weight-bold" data-bscolor="primary" data-value="ball" onClick={handleBopdCondition}>Ball</button>
                        <button ref={bopdConditionTooLowRef} className="btn btn-outline-warning border-left-warning font-weight-bold" data-bscolor="warning" data-value="too_low" onClick={handleBopdCondition}>Too Low</button>
                        <button ref={bopdConditionTooHighRef} className="btn btn-outline-info border-left-info font-weight-bold" data-bscolor="info" data-value="too_high" onClick={handleBopdCondition}>Too High</button>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col h6">Cleanout Issues</div>
                </div>

                <div className="row">
                    <div className="col btn-group">
                        <button ref={cleanoutIssuesBelowGradeRef} className="btn btn-outline-secondary font-weight-bold" data-bscolor="secondary" data-value="below_grade" onClick={handleCleanoutIssues}>Below Grade</button>
                        <button ref={cleanoutIssuesExcessVegetationRef} className="btn btn-outline-secondary border-left-secondary font-weight-bold" data-bscolor="secondary" data-value="excess_vegetation" onClick={handleCleanoutIssues}>Excess Vegetation</button>
                    </div>
                </div>
            </div>
        </div>


    )
}