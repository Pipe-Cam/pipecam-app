import React, {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, useParams, useHistory} from 'react-router-dom'
import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'
import capitalizeEachWord from '../../utility/capitalizeEachWord'
import Spinner from '../ui_components/Spinner'
import IconPlus from '../icons/IconPlus'

import {todaysDate} from '../../utility/date'
const _ = require('lodash')

function Observations() {
    const history = useHistory()
    const {id} = useParams()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    const [accessNumber, setAccessNumber] = useState(urlParams.get('access_num'))
    const [observationQty, setObservationQty] = useState(0)

    const [inspectionData, setInspectionData] = useState(null)
    const [observationState, setObservationState] = useState({})

    useEffect(()=>{
        console.log('inspectionId', inspectionId)
        console.log('accessNumber', accessNumber)
        setInspectionDataOnLoad(inspectionId)
    }, [])

    useEffect(()=>{
        try{
            if(inspectionData){
                let obsQty = getObservationQty(inspectionData)
                console.log('obsQty(useEffect) = ', obsQty)
                setObservationQty(obsQty)
            } else {
                throw(`inspectionData has not yet loaded`)
            }

        } catch (err) {

        }
    },[inspectionData])

    const getInspectionData = async (id) => {
        if(id){
            let inspectionJSON = await getInspectionById(id)
            return JSON.parse(inspectionJSON)[0]
        }
    }

    const setInspectionDataOnLoad = async (id) => {
        if(id){
            let inspectionObj = await getInspectionData(id)
            setInspectionData(inspectionObj)
            console.log(inspectionObj)
        }
    }

    const getObservationQty = (data) => {
        try{
            if(accessNumber && data && data.access && 
               data.access[accessNumber] && data.access[accessNumber].observations && 
               JSON.stringify(data.access[accessNumber].observations) !== '[]'){
                    return(data.access[accessNumber].observations.length)
            } else {
                throw('object does not contain observation data Function(getObservationQty)')
            }
        } catch(err){
            console.log(err)
            return 1
        }
    }

    const updateObservationQty = (action, num) => {
        try{
            if(typeof num !== 'number'){
                throw(`num parameter is not typeof 'number'`)
            }
            if(action !== 'set' || action !== 'increment' || action !== 'subtract'){
                throw(`a valid action parameter was not received`)
            }
            if(action === 'set'){
                setObservationQty(num)
                return(num)
            }
            if(action === 'add'){
                setObservationQty(observationQty + num)
                return observationQty + num
            }
            if(action === 'subtract'){
                setObservationQty(observationQty - num)
                return(observationQty - num)
            }
        } catch(err){
            console.log(err)
        }
    }

    const handleUpdateInspectionDataState = (observation_data) => {
        let tmpInspectionData = inspectionData
        try {
            tmpInspectionData.access[accessNumber].observations.push(observation_data)
            setInspectionData(tmpInspectionData)
            updateObservationQty('add', 1)
        } catch(err){
            console.log(err)
        }
        updateInspectionById(inspectionId, tmpInspectionData)
        setObservationState({})
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/observations/home' exact>
                        <ObservationHome {...{inspectionId, accessNumber, inspectionData, history, observationQty, getObservationQty}}/>
                    </Route>
                    <Route path='/observations/new' exact>
                        <ObservationNew {...{inspectionId, accessNumber, history, handleUpdateInspectionDataState, updateObservationQty, observationState, setObservationState, observationQty}}/>
                    </Route>
                    <Route path='/observations/edit' exact>
                        <ObservationEdit {...{handleUpdateInspectionDataState}}/>
                    </Route>
                    <Route path='/observations/view' exact>
                        <ObservationView/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Observations


const ObservationHome = (props) => {
    // objects //
    const {inspectionId, accessNumber, inspectionData, history, observationQty} = props
    const {getObservationQty} = props
    // console.log(JSON.stringify(inspectionData, null, 2))

    const handleNavToNewObservation = ()=>{
        console.log('observationQty', observationQty)
        // if(!observationQty){
        //     let obsQty = getObservationQty(inspectionData)
        //     // if(obsQty)
        //     console.log('obsQty', obsQty)
        // }

        history.push(`/observations/new?inspection_id=${inspectionId}&access_num=${accessNumber}&observation_num=${observationQty}`)
        window.location.reload()
    }

    if(!inspectionData){
        return(
            <div className="w-100 text-center pt-5">
                <Spinner />
            </div>
        )
    } else {
        return(
                <>
                    <h2>Access #{accessNumber}</h2>
                    {/* <div>Inspection Id: {inspectionId}</div>
                    <div>Access Number: {accessNumber}</div> */}

                    <div className="py-3 mb-2 px-sm-3 px-md-0 bg-light">
                        <div className="row mb-sm-3 mb-md-0">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>Inspection ID: </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="text-info">{inspectionId}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>
                                    Status: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="text-danger">{capitalizeEachWord(inspectionData.status.split('_').join(' '))}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>
                                    Client: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="text-dark">{capitalizeEachWord(inspectionData.overview.client.split('_').join(' '))}</span>
                            </div>
                        </div>

                    </div>

                    <div className="border border-primary py-3 mb-5 px-sm-3 px-md-0 shadow">
                        <div className="row">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>
                                    Today's Date: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="lead">{todaysDate()}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>
                                    Property Address: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="lead">{
                                `${inspectionData.overview.property_address_street}${!inspectionData.overview.property_address_unit === '' ? (", " + inspectionData.overview.property_address_unit) : ''},
                                ${inspectionData.overview.property_address_city},
                                ${inspectionData.overview.property_address_state}
                                ${inspectionData.overview.property_address_zip}`}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>
                                    Access Location: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="lead">{inspectionData.access[accessNumber].location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-2">
                        <div className="col-6">
                            <h3>Observation List</h3>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-primary" onClick={handleNavToNewObservation}>New Observation</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12">
                            <ObservationList {...{inspectionData, accessNumber, inspectionId}}/>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12 text-right">
                            <button className="btn btn-secondary btn-lg shadow">Complete Access #{accessNumber}</button>
                        </div>
                    </div>
                </>
            )
    }
}

const ObservationList = (props) => {
    const {inspectionData, accessNumber, inspectionId} = props

    if(accessNumber && inspectionData && inspectionData.access && 
        inspectionData.access[accessNumber] && inspectionData.access[accessNumber].observations && 
        JSON.stringify(inspectionData.access[accessNumber].observations) !== '[]'){
            return(
                <div>{inspectionData.access.[accessNumber].observations.map((item, index)=>{
                    {/* return(<div key={item}>{JSON.stringify(item)}</div>) */}
                    return(<div key={item}><Link to={`/observations/view?inspection_id=${inspectionId}&access_num=${accessNumber}&observation_num=${index+1}`}>{item.footage.toString()} Ft</Link></div>)
                })}</div>
            )
        } else {
            return(
                <>
                    <div className="text-center">no recorded observations</div>
                    {/* {JSON.stringify(inspectionData)} */}
                </>
            )
    }
}
const ObservationNew = (props) => {
    const {inspectionId, accessNumber, history, observationState, setObservationState, observationQty} = props
    const {handleUpdateInspectionDataState, updateObservationQty,} = props

    const [footageVal, setFootageVal] = useState([])
    const [lossOfCrossection, setLossOfCrossection] = useState(0)
    const footageRef = useRef(null)

    const standingWaterRef = useRef(null)
    const standingWaterStartRef = useRef(null)
    const standingWaterEndRef = useRef(null)
    const underWaterRef = useRef(null)
    const underWaterStartRef = useRef(null)
    const underWaterEndRef = useRef(null)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const observationNumber = Number(urlParams.get('observation_num'))

    const handleStandingWater = (e) => {
        if(standingWaterRef.current.checked){
            standingWaterStartRef.current.style.display = 'block'
            standingWaterEndRef.current.style.display = 'block'
        } else {
            standingWaterStartRef.current.style.display = 'none'
            standingWaterEndRef.current.style.display = 'none'
        }
    }

    const handleUnderWater = (e) => {
        if(underWaterRef.current.checked){
            underWaterStartRef.current.style.display = 'block'
            underWaterEndRef.current.style.display = 'block'
        } else {
            underWaterStartRef.current.style.display = 'none'
            underWaterEndRef.current.style.display = 'none'
        }
    }

    const handleNewObservationOnChange = (e) => {
        let form_id = e.target.id
        let form_value = e.target.value
        let tmpObservationState = observationState

        if(form_id && form_value){
            tmpObservationState[form_id] = form_value
        }

        if(!form_value){
            tmpObservationState[form_id] = ''
        }

        setObservationState(tmpObservationState)
    }


    const handleNewObservationFormSubmit = async (e) => {
        e.preventDefault()
        console.log('formSubmit')
        
        let btnAction = e.target.getAttribute('data-btnclicked')
        let historyRedirect = `/observations/home?inspection_id=${inspectionId}&access_num=${accessNumber}`
        // console.log(document.getElementById(e.target.id).getAttribute('data-btnclicked'), btnAction)

        console.log(btnAction)
        if(btnAction === 'done'){
            updateObservationQty('add', 1)
        } else if(btnAction === 'next') {
            historyRedirect = `/observations/new?inspection_id=${inspectionId}&access_num=${accessNumber}&observation_num=${observationNumber + 1}`
            updateObservationQty('add', 1)
            window.location.reload()
        } else {
            // do nothing
            throw(`Invalid observation submit action. 'next' and 'done' are the only two options.`)
        }

        await handleUpdateInspectionDataState(observationState)

        history.push(historyRedirect)
        window.location.reload()

        // let btnAction = 'done' || 'next'

        // if(observationState && observationState.footage.length > 0 && Object.keys(observationState).length > 1){
        //     // submit form data to  parent
        //     handleUpdateInspectionDataState(btnAction, observationState)
        // } else {
        //     console.log("invalid observation")
        // }
    }

    const handleNewObservationFormSubmitClick = (e) => {
        console.log(e.target)

        let btnAction = null
        let btnElem = e

        if(e.target.nodeName === 'path'){
            btnAction = e.target.parentElement.parentElement.getAttribute('data-action')
            btnElem = e.target.parentElement.parentElement
        } else if(e.target.nodeName === 'svg') {
            btnAction = e.target.parentElement.getAttribute('data-action')
            btnElem = e.target.parentElement
        } else {
            btnAction = e.target.getAttribute('data-action')
        }

        console.log('btnAction', btnAction)

        if(btnAction) {
            document.getElementById('observationForm').setAttribute('data-btnclicked', btnAction)
        }
    }

    ////////////////////////////////////////////////////////////////////////
    const handleAddToFootage = (e)=>{
        // footageRef
        e.preventDefault()
        e.target.disabled = true
        let tmpFootageVal = footageVal
        let btnValue = e.target.innerText

        if(tmpFootageVal.includes('.')){
            // do nothing
            if(btnValue === '.'){
                e.target.disabled = false
                return
            }

            let decimalIndex = _.indexOf(tmpFootageVal, '.')
            let footageIndexLast = tmpFootageVal.length - 1

            // console.log(`${footageIndexLast - decimalIndex} after decimal`)
            if((footageIndexLast - decimalIndex) >= 2){
                e.target.disabled = false
                return
            }
        } else {
            if(tmpFootageVal.length >= 4 && btnValue !== '.'){
                e.target.disabled = false
                return
            }
        }

        tmpFootageVal.push(btnValue)
        setFootageVal(tmpFootageVal)

        footageRef.current.value = tmpFootageVal.join('')
        console.log(btnValue)

        e.target.disabled = false
    }

    const handleClearFootage = (e) => {
        e.preventDefault()
        footageRef.current.value = ''
        setFootageVal([])
    }

    const handleRangeSlider = (e) => {
        // const sliderValue = e.target.value
        setLossOfCrossection(e.target.value)
    }

    const btnClasses = 'btn btn-secondary border btn-lg px-3 align-middle'

    return(
        <>
        <form id="observationForm" onSubmit={handleNewObservationFormSubmit} data-btnclicked=''>
            <div className="p-3">
                <h2>Observation #{observationNumber.toString()}</h2>

                <div className="border p-2 m-2 bg-foreground" style={{minWidth: '300px'}}>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 p-4">
                            <div className="row justify-content-left">
                                <div className="col-12">
                                    <label className="h6 pt-2" htmlFor='footage'>Footage (in Feet) <span className="text-danger">*</span></label>
                                    <button className="btn btn-danger float-right mb-2" onClick={handleClearFootage}>Clear</button>
                                    <input ref={footageRef} {...{className: 'form-control form-control-lg mb-3 ml-1 text-right', type: 'text', name: 'footage', id: 'footage', placeholder: '0.00', required: true, disabled: true}} style={{minWidth: '268px'}}/>
                                </div>
                            </div>
                            <div className="row justify-content-left">
                                <div className="col-12 text-center" style={{minWidth: '308px'}}>
                                    <div>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>7</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>8</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>9</button>
                                    </div>
                                    <div>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>4</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>5</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>6</button>
                                    </div>
                                    <div>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>1</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>2</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>3</button>
                                    </div>
                                    <div>
                                        <button className={btnClasses} style={{width: '180px', height: '90px'}} onClick={handleAddToFootage}>0</button>
                                        <button className={btnClasses} style={{width: '90px', height: '90px'}} onClick={handleAddToFootage}>.</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-left mt-5">
                                <div className="col-12 text-center" style={{minWidth: '308px'}}>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Tie-In</button>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Line Turns Left</button>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Line Turns Right</button>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Line Turns Up</button>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Line Turns Down</button>
                                    <button className="btn btn-outline-dark btn-lg mt-1 w-100">Line Turns Flat</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <div className="row py-3 px-5">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="formControlRange"><span className="font-weight-bold lead">{lossOfCrossection.toString()}%</span> Loss of Cross Section</label>
                                        <input type="range" className="form-control-range" id="formControlRange" min="0" max="100" step="10" defaultValue="0" onChange={handleRangeSlider}/>
                                        <div className="mt-3">
                                            <button className="btn btn-secondary">-</button><button className="btn btn-secondary float-right">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-sm-12 mt-sm-0 col-md-12 mt-md-0 col-lg-6 mt-lg-3">
                                    <button className="btn btn-primary btn-lg w-100 my-1">Roots</button>
                                    <button className="btn btn-outline-info w-100 my-1">In Flow Line</button>
                                    <button className="btn btn-outline-info w-100 my-1">Continuous</button>
                                    <button className="btn btn-outline-info w-100 my-1">Fine</button>
                                </div>
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <button className="btn btn-primary btn-lg w-100 my-1">Offset Joint</button>
                                    <button className="btn btn-outline-warning w-100 my-1">Minor</button>
                                    <button className="btn btn-outline-danger w-100 my-1">Severe</button>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <button className="btn btn-primary btn-lg w-100 my-1">Debris</button>
                                    <button className="btn btn-outline-info w-100 my-1">Attached To Roots</button>
                                    <button className="btn btn-outline-info w-100 my-1">Loose</button>
                                    <button className="btn btn-outline-info w-100 my-1">On Wall</button>
                                    <button className="btn btn-outline-info w-100 my-1">In Flow Line</button>
                                </div>
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <button className="btn btn-primary btn-lg w-100 my-1">Standing Water</button>
                                    <button className="btn btn-outline-success w-100 my-1">Start</button>
                                    <button className="btn btn-outline-danger w-100 my-1">End</button>
                                    <button className="btn btn-outline-info w-100 my-1">By Offset Joint</button>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-12">
                                    <button className="btn btn-primary btn-lg w-100 my-1">Under Water</button>
                                    <button className="btn btn-outline-success w-100 my-1">Start</button>
                                    <button className="btn btn-outline-danger w-100 my-1">End</button>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-12">
                                    <button className="btn btn-info btn-lg w-100 my-1">Break</button>
                                    <button className="btn btn-info btn-lg w-100 my-1">Crack</button>
                                    <button className="btn btn-info btn-lg w-100 my-1">Hole</button>
                                    <button className="btn btn-info btn-lg w-100 my-1">Separated Joint</button>
                                    <button className="btn btn-outline-danger w-100 my-1">Multiple</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-12 col-md-4 col-lg-6 text-left border">

                            <div className="row justify-content-center p-4">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="formControlRange"><span className="font-weight-bold lead">{lossOfCrossection.toString()}%</span> Loss of Cross Section</label>
                                        <input type="range" className="form-control-range" id="formControlRange" min="0" max="100" step="10" defaultValue="0" onChange={handleRangeSlider}/>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-left mt-3">
                                <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                    <span className="h6 pt-2">Blockage</span>
                                    <div className="btn-group-vertical">
                                        <button className="btn btn-secondary">Roots</button>
                                        <button className="btn btn-secondary">Roots Fine</button>
                                        <button className="btn btn-secondary">RFL</button>
                                    </div>
                                    <div className="btn-group-vertical">
                                        <button className="btn btn-secondary">Debris</button>
                                        <button className="btn btn-secondary">DAR</button>
                                    </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                    <span className="h6 pt-2">Pipe</span>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 text-center">
                                    <span className="h6 pt-2">Notation</span>

                                </div>
                            </div>
                        </div> */}
                    </div>                    
                </div>




                {/* <div className="row border p-2 m-2 bg-foreground">
                    <div className="col col-12 pt-3">
                        <div className="h6">Blockage</div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="roots" value="roots" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="roots">Roots</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="debris" value="debris" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="debris">Debris</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="debris_loose" value="loose" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="debris_loose">Loose</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="debris_attached_to_wall" value="attached_to_wall" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="debris_attached_to_wall">Attached To Wall</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="continuous" value="continuous" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="continuous">Continuous</label>
                        </div>
                    </div>
                    <div className="col col-6 mt-4">
                        <label className="h6 float-left" htmlFor='footage'>% Loss of Crosssection</label>
                        <input {...{className: 'form-control mb-3 float-right', type: 'number', name: 'loss_of_crosssection', id: 'loss_of_crosssection', step: '10', min: '0', max: '100', placeholder: '%'}} onChange={handleNewObservationOnChange}/>
                    </div>
                </div>
                <div className="row border p-2 m-2 pb-3 bg-foreground">
                    <div className="col col-12 pt-3">
                        <div className="h6">Pipe Issue</div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_offset_joint" value="offset_joint" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_offset_joint">Offset Joint</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_crack" value="crack" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_crack">Crack</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_hole" value="hole" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_hole">Hole</label>
                        </div>
                    </div>
                </div>
                <div className="row border p-2 m-2 pt-4 bg-foreground">
                    <div className="col col-4">
                        <div className="form-check form-check-inline mr-5 mb-3">
                            <input ref={standingWaterRef} className="form-check-input radio-button" type="checkbox" id="standing_water" value="standing_water" onClick={handleStandingWater} onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="roots">Standing Water</label>
                        </div>
                    </div>
                    <div ref={standingWaterStartRef} className="col col-4" style={{display: 'none'}}>
                        <input {...{className: 'form-control mb-3', type: 'number', name: 'standing_water_start', id: 'standing_water_start', step: '0.1', min: '0', placeholder: 'Standing Water - Start'}} onChange={handleNewObservationOnChange}/>
                    </div>
                    <div ref={standingWaterEndRef} className="col col-4" style={{display: 'none'}}>
                        <input {...{className: 'form-control mb-3', type: 'number', name: 'standing_water_end', id: 'standing_water_end', step: '0.1', min: '0', placeholder: 'Standing Water - End'}} onChange={handleNewObservationOnChange}/>
                    </div>
                </div>
                <div className="row border p-2 m-2 pt-4 bg-foreground">
                    <div className="col col-4">
                        <div className="form-check form-check-inline mr-5 mb-3">
                            <input ref={underWaterRef} className="form-check-input radio-button" type="checkbox" id="under_water" value="under_water" onClick={handleUnderWater} onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="roots">Under Water</label>
                        </div>
                    </div>
                    <div ref={underWaterStartRef} className="col col-4" style={{display: 'none'}}>
                        <input {...{className: 'form-control mb-3', type: 'number', name: 'under_water_start', id: 'under_water_start', step: '0.1', min: '0', placeholder: 'Under Water - Start'}} onChange={handleNewObservationOnChange}/>
                    </div>
                    <div ref={underWaterEndRef} className="col col-4" style={{display: 'none'}}>
                        <input {...{className: 'form-control mb-3', type: 'number', name: 'under_water_end', id: 'under_water_end', step: '0.1', min: '0', placeholder: 'Under Water - End'}} onChange={handleNewObservationOnChange}/>
                    </div>
                </div>
                <div className="row border p-2 m-2 pb-3 bg-foreground">
                    <div className="col col-12 pt-3">
                        <div className="h6">Additional Notation</div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="tie_in" value="tie-in" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="tie_in">Tie-In</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="ltl" value="ltl" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="ltl">LTL</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="ltr" value="ltr" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="ltr">LTR</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="ltf" value="ltf" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="ltf">LTF</label>
                        </div>
                    </div>
                </div>
                <div className="row border p-2 m-2 pb-3 bg-foreground">
                    <div className="col col-12 pt-3">
                        <textarea name="observation_notes" id="observation_notes" placeholder="Notes" rows="3" className="w-100 p-3" onChange={handleNewObservationOnChange}/>
                    </div>
                </div> */}
                <div className="row mt-5">
                    <div className="col col-5">
                        <button id="done_observation_btn" className="btn btn-secondary btn-lg m-0 mt-3" data-toggle="tooltip" data-placement="top" title="Save & Done" data-action="done" onMouseOver={handleNewObservationFormSubmitClick}>
                            Done
                        </button>

                    </div>
                    <div className="col col-7 text-right">
                        <button id="add_observation_btn" className="btn btn-primary btn-lg p-3 m-0" data-toggle="tooltip" data-placement="left" title="Save & Next" data-action="next" onMouseOver={handleNewObservationFormSubmitClick}>
                            <IconPlus />
                        </button>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}
const ObservationEdit = (props) => {
    const {inspectionId, accessNumber} = props
    return(<><div>Edit Observation</div></>)
}

const ObservationView = (props) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    
    const inspection_id = urlParams.get('inspection_id')
    const access_num = urlParams.get('access_num')
    const observation_num = urlParams.get('observation_num')

    return(
        <>
            <div>
                Inspection ID: {inspection_id}
            </div>
            <div>
                Access Number: {access_num}
            </div>
            <div>
                Observation Number: {observation_num}
            </div>
        </>
    )
}
