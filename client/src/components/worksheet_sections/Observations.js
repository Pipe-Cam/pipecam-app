import React, {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'

import ObservationView from '../inspection/ObservationView'
import ObservationEdit from '../inspection/ObservationEdit'

import Spinner from '../ui_components/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import IconPlus from '../icons/IconPlus'
import IconBackspace from '../icons/IconBackspace'
import IconTieIn from '../icons/IconTieIn'
import IconLeftArrow from '../icons/IconLeftArrow'
import IconRightArrow from '../icons/IconRightArrow'
import IconUpArrow from '../icons/IconUpArrow'
import IconDownArrow from '../icons/IconDownArrow'
import IconFlatArrow from '../icons/IconFlatArrow'

import capitalizeEachWord from '../../utility/capitalizeEachWord'
import {todaysDate} from '../../utility/date'
const _ = require('lodash')


function Observations() {
    const history = useHistory()
    // const {id} = useParams()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    // eslint-disable-next-line
    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    // eslint-disable-next-line
    const [accessNumber, setAccessNumber] = useState(urlParams.get('access_num'))
    const [observationQty, setObservationQty] = useState(0)

    const [inspectionData, setInspectionData] = useState(null)
    const [observationState, setObservationState] = useState({})

    useEffect(()=>{
        console.log('inspectionId', inspectionId)
        console.log('accessNumber', accessNumber)
        setInspectionDataOnLoad(inspectionId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        try{
            if(inspectionData){
                let obsQty = getObservationQty(inspectionData)
                console.log('obsQty(useEffect) = ', obsQty)
                setObservationQty(obsQty)
            } else {
                throw new Error('inspectionData has not yet loaded')
            }
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inspectionData])

    const getInspectionData = async (id) => {
        if(id){
            let inspectionJSON = await getInspectionById(id)
            console.log(inspectionJSON)
            return JSON.parse(inspectionJSON)[0]
            // return JSON.parse(inspectionJSON)
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
                throw new Error('object does not contain observation data Function(getObservationQty)' )
            }
        } catch(err){
            console.log(err)
            return 1
        }
    }

    const updateObservationQty = (action, num) => {
        try{
            if(typeof num !== 'number'){
                throw new Error(`num parameter is not typeof 'number'`)
            }
            if(action !== 'set' || action !== 'increment' || action !== 'subtract'){
                throw new Error(`a valid action parameter was not received`)
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
                        <ObservationView {...{inspectionData}}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Observations


const ObservationHome = (props) => {
    const {inspectionId, accessNumber, inspectionData, history, observationQty} = props
    // const {getObservationQty} = props

    const handleNavToNewObservation = ()=>{
        console.log('observationQty', observationQty)

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
                <div>{inspectionData.access[accessNumber].observations.map((item, index)=>{
                    return(<div key={item + Math.random(9999).toString() + index.toString()}><Link to={`/observations/view?inspection_id=${inspectionId}&access_num=${accessNumber}&observation_num=${index+1}`}>{item.footage.toString()} Ft</Link></div>)
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
    const {inspectionId, accessNumber, history, /*observationState, setObservationState, observationQty*/} = props
    const {handleUpdateInspectionDataState, updateObservationQty,} = props

    const [footageVal, setFootageVal] = useState([])
    const [lossOfCrossection, setLossOfCrossection] = useState(0)
    const [pipeHoleObservation, setPipeHoleObservation] = useState({hole: false})
    const [pipeSeparatedJointObservation, setPipeSeparatedJointObservation] = useState({separated_joint: false})
    const [locateDepth, setLocateDepth] = useState(null)
    const [materialX2, setMaterialX2] = useState(null)
    const [observationNotes, setObservationNotes] = useState(null)
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [lineNotation, setLineNotation] = useState({
        ti: false,
        ltl: false,
        ltr: false,
        ltu: false,
        ltd: false,
        ltf: false,
        intro_water_grade: false,
        intro_water_debris: false,
        intro_water_camera: false,
        main: false,
        locate: false
    })

    const [rootsObservation, setRootsObservation] = useState({
        roots: false,
        modifier: {
            in_flow_line: false,
            continuous: false,
            fine: false
        }
    })
    
    const [ojObservation, setOjObservation] = useState({
        oj: false,
        modifier: {
            minor: false,
            severe: false
        }
    })

    const [debObservation, setDebObservation] = useState({
        deb: false,
        modifier: {
            attached_to_roots: false,
            loose: false,
            on_wall: false,
            in_flow_line: false
        }
    })

    const [swObservation, setSwObservation] = useState({
        sw: false,
        modifier: {
            start: false,
            end: false,
            by_offset_joint: false
        }
    })

    const [uwObservation, setUwObservation] = useState({
        uw: false,
        modifier: {
            start: false,
            end: false
        }
    })

    const [pipeBreakObservation, setPipeBreakObservation] = useState({
        break: false, 
        modifier: {
            break_multiple: false
        }
    })

    const [pipeCrackObservation, setPipeCrackObservation] = useState({
        crack: false, 
        modifier: {
            crack_multiple: false
        }
    })

    const footageRef = useRef(null)
    const footageModalRef = useRef(null)
    const rangeSliderRef = useRef(null)

    const tiRef = useRef(null)
    const ltlRef = useRef(null)
    const ltrRef = useRef(null)
    const ltuRef = useRef(null)
    const ltdRef = useRef(null)
    const ltfRef = useRef(null)
    const waterGradeRef = useRef(null)
    const waterDebrisRef = useRef(null)
    const waterCameraRef = useRef(null)
    const mainRef = useRef(null)

    const locateDivRef = useRef(null)
    const locateRef = useRef(null)
    const locateDepthRef = useRef(null)

    const rtsRef = useRef(null)
    const rtsInFlowLineRef = useRef(null)
    const rtsConRef = useRef(null)
    const rtsFineRef = useRef(null)

    const ojRef = useRef(null)
    const ojMinorRef = useRef(null)
    const ojSevereRef = useRef(null)

    const debRef = useRef(null)
    const debDarRef = useRef(null)
    const debLooseRef = useRef(null)
    const debWallRef = useRef(null)
    const debInFlowRef = useRef(null)

    const swRef = useRef(null)
    const swStartRef = useRef(null)
    const swEndRef = useRef(null)
    const swByOjRef = useRef(null)

    const uwRef = useRef(null)
    const uwStartRef = useRef(null)
    const uwEndRef = useRef(null)
    
    const pipeBreakRef = useRef(null)
    const pipeCrackRef = useRef(null)
    const pipeHoleRef = useRef(null)
    const pipeSeparatedJointRef = useRef(null)
    const pipeBreakMultipleRef = useRef(null)
    const pipeCrackMultipleRef = useRef(null)

    const materialX2Ref = useRef(null)
    const x2MaterialCiRef = useRef(null)
    const x2MaterialAcRef = useRef(null)
    const x2MaterialAbsRef = useRef(null)
    const x2MaterialVcpRef = useRef(null)
    const x2MaterialPvcRef = useRef(null)
    const x2MaterialOrbgRef = useRef(null)
    const x2MaterialHdpeRef = useRef(null)

    const rtsModifierDivRef = useRef(null)
    const ojModifierDivRef = useRef(null)
    const debModifierDivRef = useRef(null)
    const swModifierDivRef = useRef(null)
    const uwModifierDivRef = useRef(null)
    const pipeBreakModifierDivRef = useRef(null)
    const pipeCrackModifierDivRef = useRef(null)
    const materialX2DivRef = useRef(null)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const observationNumber = Number(urlParams.get('observation_num'))

    useEffect(() => {console.log(lineNotation)}, [lineNotation])
    useEffect(() => {console.log(rootsObservation)}, [rootsObservation])
    useEffect(() => {console.log(ojObservation)}, [ojObservation])
    useEffect(() => {console.log(debObservation)}, [debObservation])
    useEffect(() => {console.log(swObservation)}, [swObservation])
    useEffect(() => {console.log(uwObservation)}, [uwObservation])
    useEffect(() => {console.log(pipeBreakObservation)}, [pipeBreakObservation])
    useEffect(() => {console.log(pipeCrackObservation)}, [pipeCrackObservation])
    useEffect(() => {console.log(pipeHoleObservation)}, [pipeHoleObservation])
    useEffect(() => {console.log(pipeSeparatedJointObservation)}, [pipeSeparatedJointObservation])
    useEffect(() => {console.log(observationNotes)}, [observationNotes])
    useEffect(() => {console.log(locateRef.current.getAttribute('data-active'))}, [locateRef])

    const handleNewObservationFormSubmit = async (e) => {
        e.preventDefault()
        console.log('formSubmit')
        
        let btnAction = e.target.getAttribute('data-btnclicked')
        console.log(btnAction)

        let historyRedirect = `/observations/home?inspection_id=${inspectionId}&access_num=${accessNumber}`

        // if(btnAction === 'close'){
        //     updateObservationQty('add', 1)
        // } else 

        if(btnAction === 'next') {
            historyRedirect = `/observations/new?inspection_id=${inspectionId}&access_num=${accessNumber}&observation_num=${observationNumber + 1}`
            updateObservationQty('add', 1)
            window.scrollTo(0, 0)
            window.location.reload()
        } else {
            throw new Error(`Invalid observation submit action. 'next' and 'done' are the only two options.`) // do nothing
        }

        let footage_var = (footageVal.map(item => item.trim())).join('').trim()
        let footage = (footage_var === '') ? ('0.00') : (footage_var)

        let observationData = {
            footage: footage,
            loss_of_crosssection: lossOfCrossection,
            line_notation: lineNotation,
            roots: rootsObservation,
            offset_joint: ojObservation,
            debris: debObservation,
            standing_water: swObservation,
            under_water: uwObservation,
            pipe_break: pipeBreakObservation,
            pipe_crack: pipeCrackObservation,
            pipe_hole: pipeHoleObservation,
            pipe_separated_joint: pipeSeparatedJointObservation,
            locate_depth: locateDepth,
            material_change: materialX2,
            notes: observationNotes
        }

        await handleUpdateInspectionDataState(observationData)

        history.push(historyRedirect)
        window.location.reload()
    }

    const handleNewObservationFormSubmitClick = (e) => {
        console.log(e.target)

        let btnAction = null
        // eslint-disable-next-line
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

    const handleAddToFootage = (e)=>{
        e.preventDefault()
        let tmpFootageVal = footageVal
        let btnValue = e.target.innerText

        if(tmpFootageVal.includes('.')){
            // do nothing if decimal already exists
            if(btnValue === '.'){
                return
            }

            let decimalIndex = _.indexOf(tmpFootageVal, '.')
            let footageIndexLast = tmpFootageVal.length - 1

            // only 2 digits after decimal are allowed
            if((footageIndexLast - decimalIndex) >= 2){
                return
            }

            if((footageIndexLast - decimalIndex) === 1 && tmpFootageVal[footageIndexLast] === '0' && btnValue === '0'){
                return
            }
        } else {
            // only 4 digits before decimal are allowed
            if(tmpFootageVal.length >= 4 && btnValue !== '.'){
                return
            }
        }

        tmpFootageVal = [...tmpFootageVal, btnValue]
        setFootageVal(tmpFootageVal)
        console.log(btnValue)
    }

    const handleClearFootage = (e) => {
        e.preventDefault()
        setFootageVal([])
    }

    const handleBackspace = (e) => {
        e.preventDefault()
        let tmpFootageVal = footageVal

        tmpFootageVal.pop()

        setFootageVal(tmpFootageVal)
        footageModalRef.current.innerText = tmpFootageVal.join('')
        footageModalRef.current.focus()
    }

    const handleEnter = (e) => {
        e.preventDefault()
        let tmpFootageVal = footageVal
        
        if(!tmpFootageVal.includes('.') && tmpFootageVal.length > 0){
            setFootageVal([...tmpFootageVal, '.', '0'])
        }
        
        if(tmpFootageVal[0] === '.'){
            setFootageVal(['0', ...tmpFootageVal])
        }
        
        if(tmpFootageVal[tmpFootageVal.length - 1] === '.'){
            setFootageVal([...tmpFootageVal, '0'])
            footageModalRef.current.innerText = [...tmpFootageVal, '0'].join('')
        }

        handleClose()
    }

    const handleRangeSlider = (e) => {
        setLossOfCrossection(e.target.value)
    }

    const handleAdjustRangeSlider = (e) => {
        e.preventDefault()
        let action = e.target.getAttribute('data-action')
        let step = 10
        let value = Number(rangeSliderRef.current.value)

        if(action === 'increment' && value <= 90){
            let incremented = value + step
            rangeSliderRef.current.value = incremented
            setLossOfCrossection(incremented)
        }

        if(action === 'decrement' && value >= 10){
            let decremented = value - step
            rangeSliderRef.current.value = decremented
            setLossOfCrossection(decremented)
        } 
    }

    const toggleElem = (paramObj) => {
        const {action, elem, color} = paramObj
        const {inverse} = paramObj
        let activeAttribute = false
        let actionVar = action

        if(inverse) {
            actionVar = (actionVar === 'on') ? 'off' : 'on'
            activeAttribute = !activeAttribute
        }

        if(actionVar === 'off'){
            elem.classList.add(`btn-outline-${color}`)
            elem.classList.remove(`btn-${color}`)
            elem.setAttribute('data-active', activeAttribute)
        } else {
            elem.classList.add(`btn-${color}`) 
            elem.classList.remove(`btn-outline-${color}`)
            elem.setAttribute('data-active', !activeAttribute)
        }
    }
    
    const handleLineNotation = (e) => {
        e.preventDefault()
        let tmpLineNotation = lineNotation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))

        if(dataActive) {
            toggleElem({'action': 'on', 'elem': e.target, 'color': 'dark'})
            if(dataObservation === 'locate'){
                locateDepthRef.current.classList.remove('hide')
                locateDivRef.current.classList.add('border')
                locateDivRef.current.classList.add('border-warning')
                locateDivRef.current.classList.add('rounded-lg')
            }
        } else {
            toggleElem({'action': 'off', 'elem': e.target, 'color': 'dark'})
            if(dataObservation === 'locate'){
                locateDepthRef.current.classList.add('hide')
                locateDivRef.current.classList.remove('border')
                locateDivRef.current.classList.remove('border-warning')
                locateDivRef.current.classList.remove('rounded-lg')
            }
        }

        tmpLineNotation[dataObservation] = dataActive
        setLineNotation(tmpLineNotation)
    }

    const handleRoots = (e) => {
        e.preventDefault()
        let tmpRootsObservation = rootsObservation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        if(dataObservation === 'roots'){
            if(dataActive === true){
                rtsModifierDivRef.current.classList.remove('hide')
                e.target.classList.add('btn-success')
            } else {
                rtsModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
            }
        } else {
            if(dataActive === true){
                toggleElem({'action': 'on', 'elem': e.target, 'color': 'info'})
            } else {
                toggleElem({'action': 'off', 'elem': e.target, 'color': 'info'})
            }
        }

        if(dataObservation === 'roots'){
            tmpRootsObservation.roots = JSON.parse(dataActive)
        } else {
            tmpRootsObservation.modifier[dataObservation] = dataActive
        }

        console.log(tmpRootsObservation)
        setRootsObservation(tmpRootsObservation)
    }

    const handleOj = (e) => {
        e.preventDefault()
        let tmpOjObservation = ojObservation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        let minor = 'warning'
        let severe = 'danger'

        if(dataObservation === 'offset_joint'){
            if(dataActive === true){
                ojModifierDivRef.current.classList.remove('hide')
                e.target.classList.add('btn-success')
            } else {
                ojModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
            }
        } else {
            if(dataActive === true){
                if(dataObservation === 'minor'){
                    toggleElem({'action': 'on', 'elem': ojMinorRef.current, 'color': minor})
                    toggleElem({'action': 'off', 'elem': ojSevereRef.current, 'color': severe})

                } else{
                    toggleElem({'action': 'on', 'elem': ojSevereRef.current, 'color': severe})
                    toggleElem({'action': 'off', 'elem': ojMinorRef.current, 'color': minor})
                }
            } else {
                if(dataObservation === 'minor'){
                    toggleElem({'action': 'off', 'elem': ojMinorRef.current, 'color': minor})
                } else{
                    toggleElem({'action': 'off', 'elem': ojSevereRef.current, 'color': severe})
                }
            }
        }
 
        if(dataObservation === 'offset_joint'){
            tmpOjObservation.oj = JSON.parse(dataActive)
        } else {
            tmpOjObservation.modifier.minor = false
            tmpOjObservation.modifier.severe = false

            tmpOjObservation.modifier[dataObservation] = dataActive
        }

        setOjObservation(tmpOjObservation)
    }

    const handleDeb = (e) => {
        e.preventDefault()
        let tmpDebObservation = debObservation
        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        if(dataObservation === 'debris'){

            if(dataActive === true){
                debModifierDivRef.current.classList.remove('hide')
                e.target.classList.add('btn-success')
            } else {
                debModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
            }
        } else {
            if(dataActive === true){
                toggleElem({'action': 'on', 'elem': e.target, 'color': 'info'})
            } else {
                toggleElem({'action': 'off', 'elem': e.target, 'color': 'info'})
            }
        }

        if(dataObservation === 'debris'){
            tmpDebObservation.deb = JSON.parse(dataActive)
        } else {
            tmpDebObservation.modifier[dataObservation] = dataActive
        }

        setDebObservation(tmpDebObservation)
    }

    const handleSw = (e) => {
        e.preventDefault()
        let tmpSwObservation = swObservation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        let start = 'warning' 
        let end = 'danger'
        let byOj = 'info'

        if(dataObservation === 'standing_water'){

            if(dataActive === true){
                swModifierDivRef.current.classList.remove('hide')
                swRef.current.classList.add('btn-success')
            } else {
                swModifierDivRef.current.classList.add('hide')
                swRef.current.classList.remove('btn-success')
            }
        } else {
            if(dataActive === true){
                if(dataObservation === 'start'){
                    toggleElem({'action': 'on', 'elem': swStartRef.current, 'color': start})
                    toggleElem({'action': 'off', 'elem': swEndRef.current, 'color': end})
                    toggleElem({'action': 'off', 'elem': swByOjRef.current, 'color': byOj})
                } else if(dataObservation === 'end') {
                    toggleElem({'action': 'off', 'elem': swStartRef.current, 'color': start})
                    toggleElem({'action': 'on', 'elem': swEndRef.current, 'color': end})
                    toggleElem({'action': 'off', 'elem': swByOjRef.current, 'color': byOj})
                } else {
                    toggleElem({'action': 'off', 'elem': swEndRef.current, 'color': end})
                    toggleElem({'action': 'off', 'elem': swStartRef.current, 'color': start})
                    toggleElem({'action': 'on', 'elem': swByOjRef.current, 'color': byOj})
                }
            } else {
                if(dataObservation === 'start'){
                    toggleElem({'action': 'off', 'elem': swStartRef.current, 'color': start})
                } else if(dataObservation === 'end'){
                    toggleElem({'action': 'off', 'elem': swEndRef.current, 'color': end})
                } else {
                    toggleElem({'action': 'off', 'elem': swByOjRef.current, 'color': byOj})

                }
            }
        }

        if(dataObservation === 'standing_water'){
            tmpSwObservation.sw = JSON.parse(dataActive)
        } else {
            tmpSwObservation.modifier['start'] = false
            tmpSwObservation.modifier['end'] = false
            tmpSwObservation.modifier['by_offset_joint'] = false

            tmpSwObservation.modifier[dataObservation] = dataActive
        }

        setSwObservation(tmpSwObservation)
    }

    const handleUw = (e) => {
        e.preventDefault()
        let tmpUwObservation = uwObservation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        let start = 'warning'
        let end = 'danger'

        if(dataObservation === 'under_water'){

            if(dataActive === true){
                uwModifierDivRef.current.classList.remove('hide')
                e.target.classList.add('btn-success')
            } else {
                uwModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
            }
        } else {
            if(dataActive === true){
                if(dataObservation === 'start'){
                    toggleElem({'action': 'on', 'elem': uwStartRef.current, 'color': start})
                    toggleElem({'action': 'off', 'elem': uwEndRef.current, 'color': end})

                } else{
                    toggleElem({'action': 'off', 'elem': uwStartRef.current, 'color': start})
                    toggleElem({'action': 'on', 'elem': uwEndRef.current, 'color': end})
                }
            } else {
                if(dataObservation === 'start'){
                    toggleElem({'action': 'off', 'elem': uwStartRef.current, 'color': start})
                } else{
                    toggleElem({'action': 'off', 'elem': uwEndRef.current, 'color': end})
                }
            }
        }

        if(dataObservation === 'under_water'){
            tmpUwObservation.uw = JSON.parse(dataActive)
        } else {
            tmpUwObservation.modifier['start'] = false
            tmpUwObservation.modifier['end'] = false
            tmpUwObservation.modifier[dataObservation] = dataActive
        }

        setUwObservation(tmpUwObservation)
    }

    const handlePipe = (e) => {
        e.preventDefault()
        let tmpPipeBreakObservation = pipeBreakObservation
        let tmpPipeCrackObservation = pipeCrackObservation
        let tmpPipeHoleObservation = pipeHoleObservation
        let tmpPipeSeparatedJointObservation = pipeSeparatedJointObservation

        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        if(dataObservation === 'break'){
            if(dataActive === true){
                pipeBreakModifierDivRef.current.classList.remove('hide')
                e.target.classList.remove('btn-info')
                e.target.classList.add('btn-success')
            } else {
                pipeBreakModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
                e.target.classList.add('btn-info')
            }
        } else if(dataObservation === 'crack'){
            if(dataActive === true){
                pipeCrackModifierDivRef.current.classList.remove('hide')
                e.target.classList.remove('btn-info')
                e.target.classList.add('btn-success')
            } else {
                pipeCrackModifierDivRef.current.classList.add('hide')
                e.target.classList.remove('btn-success')
                e.target.classList.add('btn-info')
            }
        } else if(dataObservation === 'hole' || dataObservation === 'separated_joint'){
            if(dataActive === true){
                e.target.classList.remove('btn-info')
                e.target.classList.add('btn-success')
            } else {
                e.target.classList.remove('btn-success')
                e.target.classList.add('btn-info')
            }
        } else {
            let ref = (dataObservation === 'break_multiple') ? pipeBreakMultipleRef : pipeCrackMultipleRef
            if(dataActive === true){
                toggleElem({'action': 'on', 'elem': ref.current, 'color': 'danger'})

            } else {
                toggleElem({'action': 'off', 'elem': ref.current, 'color': 'danger'})
            }
        }

        if(dataObservation === 'break'){
            tmpPipeBreakObservation.break = JSON.parse(dataActive)
            setPipeBreakObservation(tmpPipeBreakObservation)
        }
        if(dataObservation === 'crack'){
            tmpPipeCrackObservation.crack = JSON.parse(dataActive)
            setPipeCrackObservation(tmpPipeCrackObservation)
        }
        if(dataObservation === 'hole'){
            tmpPipeHoleObservation.hole = JSON.parse(dataActive)
            setPipeHoleObservation(tmpPipeHoleObservation)
        }
        if(dataObservation === 'separated_joint'){
            tmpPipeSeparatedJointObservation.separated_joint = JSON.parse(dataActive)
            setPipeSeparatedJointObservation(tmpPipeSeparatedJointObservation)
        }

        if(dataObservation === 'break_multiple'){
            tmpPipeBreakObservation.modifier.break_multiple = JSON.parse(dataActive)
            setPipeBreakObservation(tmpPipeBreakObservation)
        }
        if(dataObservation === 'crack_multiple'){
            tmpPipeCrackObservation.modifier.crack_multiple = JSON.parse(dataActive)
            setPipeCrackObservation(tmpPipeCrackObservation)
        }
    }

    const handleObservationNotes = (e) => {
        e.preventDefault()
        setObservationNotes(Number(e.target.value.trim()))
    }

    const handleLocateDepth = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setLocateDepth(Number(e.target.value.trim()))
    }

    const handleMaterialX2 = (e) => {
        e.preventDefault()
        let dataObservation = e.target.getAttribute('data-observation')
        let dataActive = !JSON.parse(e.target.getAttribute('data-active'))
        e.target.setAttribute('data-active', dataActive)

        console.log(dataObservation, dataActive)

        let color = {
            'ci': 'warning',
            'ac': 'secondary',
            'abs': 'primary',
            'vcp': 'success',
            'pvc': 'info',
            'orbg': 'danger',
            'hdpe': 'dark'
        }

        let materialRefs = [
            x2MaterialCiRef,
            x2MaterialAcRef,
            x2MaterialAbsRef,
            x2MaterialVcpRef,
            x2MaterialPvcRef,
            x2MaterialOrbgRef,
            x2MaterialHdpeRef
        ]

        if(dataObservation === 'material_change'){
            if(dataActive === true){
                materialX2DivRef.current.classList.remove('hide')
                materialX2Ref.current.classList.add('btn-success')
                materialX2Ref.current.classList.remove('btn-warning')
            } else {
                materialX2DivRef.current.classList.add('hide')
                materialX2Ref.current.classList.remove('btn-success')
                materialX2Ref.current.classList.add('btn-warning')
            }
        } else {
            materialRefs.forEach(item => {
                toggleElem({'action': 'off', 'elem': item.current, 'color': color[item.current.getAttribute('data-observation')]})
            })

            if(dataActive === true){
                toggleElem({'action': 'on', 'elem': e.target, 'color': color[e.target.getAttribute('data-observation')]})
                setMaterialX2(dataObservation.trim())
            } else {
                setMaterialX2(null)
            }
        }
    }

    const btnClasses = 'btn btn-secondary border border-dark btn-lg px-3 align-middle'

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
                                </div>
                                <div className="col-12">
                                    <div ref={footageRef} {...{className: 'form-control form-control-lg mb-1 ml-1 mt-3 text-right', name: 'footage', id: 'footage'}} style={{minWidth: '268px'}} onClick={handleShow}>{(!footageVal.length) ? "0.00" : (footageVal.join(''))}</div>
                                </div>
                            </div>
                            <div className="row justify-content-left mt-5">
                                <div className="col-12 text-left" style={{minWidth: '308px'}}>
                                    <button ref={tiRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ti" onClick={handleLineNotation}>Tie-In<span className="float-right"><IconTieIn/></span></button>
                                    <button ref={ltlRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ltl" onClick={handleLineNotation}>Line Turns Left<span className="float-right"><IconLeftArrow/></span></button>
                                    <button ref={ltrRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ltr" onClick={handleLineNotation}>Line Turns Right<span className="float-right"><IconRightArrow/></span></button>
                                    <button ref={ltuRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ltu" onClick={handleLineNotation}>Line Turns Up<span className="float-right"><IconUpArrow/></span></button>
                                    <button ref={ltdRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ltd" onClick={handleLineNotation}>Line Turns Down<span className="float-right"><IconDownArrow/></span></button>
                                    <button ref={ltfRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="ltf" onClick={handleLineNotation}>Line Turns Flat<span className="float-right"><IconFlatArrow/></span></button>
                                    <button ref={waterGradeRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="intro_water_grade" onClick={handleLineNotation}>Intro Water - Grade<span className="float-right"></span></button>
                                    <button ref={waterDebrisRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="intro_water_debris" onClick={handleLineNotation}>Intro Water - Debris<span className="float-right"></span></button>
                                    <button ref={waterCameraRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="intro_water_camera" onClick={handleLineNotation}>Intro Water - Camera<span className="float-right"></span></button>
                                    <button ref={mainRef} className="btn btn-outline-dark btn-lg mt-1 w-100" data-active="false" data-observation="main" onClick={handleLineNotation}>@ Main<span className="float-right"></span></button>
                                    <div ref={locateDivRef} className="mt-2">
                                        <button ref={locateRef} className="btn btn-outline-dark btn-lg w-100" data-active="false" data-observation="locate" onClick={handleLineNotation}>Locate<span className="float-right"></span></button>
                                        <div className="mt-1 hide" ref={locateDepthRef}>
                                            <input className="form-control form-control-lg" type="number" min="0.00" max="100.00" step="1.00" id="locateDepth" placeholder="Depth Footage" onChange={handleLocateDepth}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8 pt-4">
                            <div className="row py-1 px-5">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="formControlRange"><span className="font-weight-bold lead">{lossOfCrossection.toString()}%</span> Loss of Cross Section</label>
                                        <input ref={rangeSliderRef} type="range" className="form-control-range" id="formControlRange" min="0" max="100" step="10" defaultValue="0" onChange={handleRangeSlider}/>
                                        <div className="mt-3 text-center">
                                            <button className="btn btn-secondary btn-lg border border-dark float-left ml-3" data-action="decrement" onClick={handleAdjustRangeSlider}>&nbsp;-&nbsp;</button>
                                            <button className="btn btn-secondary btn-lg border border-dark float-right mr-3" data-action="increment" onClick={handleAdjustRangeSlider}>&nbsp;+&nbsp;</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-1 px-5 mt-sm-5 mt-md-5 mt-lg-4">
                                <div className="col-sm-12 mt-sm-0 col-md-12 mt-md-0 col-lg-6 mt-lg-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <button ref={rtsRef} className="btn btn-primary btn-lg w-100 my-1" data-active="false" data-observation="roots" onClick={handleRoots}>Roots</button>
                                        </div>
                                        <div className="col-12 hide" ref={rtsModifierDivRef}>
                                            <button ref={rtsInFlowLineRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="in_flow_line" onClick={handleRoots}>In Flow Line</button>
                                            <button ref={rtsConRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="continuous" onClick={handleRoots}>Continuous</button>
                                            <button ref={rtsFineRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="fine" onClick={handleRoots}>Fine</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <button ref={ojRef} className="btn btn-primary btn-lg w-100 my-1" data-active="false" data-observation="offset_joint" onClick={handleOj}>Offset Joint</button>
                                        </div>
                                        <div className="col-12 hide" ref={ojModifierDivRef}>
                                            <button ref={ojMinorRef} className="btn btn-outline-warning w-100 my-1" data-active="false" data-observation="minor" onClick={handleOj}>Minor</button>
                                            <button ref={ojSevereRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="severe" onClick={handleOj}>Severe</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-1 px-5">
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <button ref={debRef} className="btn btn-primary btn-lg w-100 my-1" data-active="false" data-observation="debris" onClick={handleDeb}>Debris</button>
                                        </div>
                                        <div className="col-12 hide" ref={debModifierDivRef}>
                                            <button ref={debDarRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="attached_to_roots" onClick={handleDeb}>Attached To Roots</button>
                                            <button ref={debLooseRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="loose" onClick={handleDeb}>Loose</button>
                                            <button ref={debWallRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="on_wall" onClick={handleDeb}>On Wall</button>
                                            <button ref={debInFlowRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="in_flow_line" onClick={handleDeb}>In Flow Line</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-sm-3 col-md-12 mt-md-3 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <button ref={swRef} className="btn btn-primary btn-lg w-100 my-1" data-active="false" data-observation="standing_water" onClick={handleSw}>Standing Water</button>
                                        </div>
                                        <div className="col-12 hide" ref={swModifierDivRef}>
                                            <button ref={swStartRef} className="btn btn-outline-warning w-100 my-1" data-active="false" data-observation="start" onClick={handleSw}>Start</button>
                                            <button ref={swEndRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="end" onClick={handleSw}>End</button>
                                            <button ref={swByOjRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="by_offset_joint" onClick={handleSw}>By Offset Joint</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-1 px-5 mt-sm-3 mt-md-3">
                                <div className="col-12">
                                    <button ref={uwRef} className="btn btn-primary btn-lg w-100 my-1" data-active="false" data-observation="under_water" onClick={handleUw}>Under Water</button>
                                </div>
                                <div className="col-12 hide" ref={uwModifierDivRef}>
                                    <button ref={uwStartRef} className="btn btn-outline-warning w-100 my-1" data-active="false" data-observation="start" onClick={handleUw}>Start</button>
                                    <button ref={uwEndRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="end" onClick={handleUw}>End</button>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-12">
                                    <button ref={pipeBreakRef} className="btn btn-info btn-lg w-100 my-1" data-active="false" data-observation="break" onClick={handlePipe}>Break</button>
                                </div>
                                <div className="col-12 hide" ref={pipeBreakModifierDivRef}>
                                    <button ref={pipeBreakMultipleRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="break_multiple" onClick={handlePipe}>Multiple Breaks</button>
                                </div>

                                <div className="col-12">
                                    <button ref={pipeCrackRef} className="btn btn-info btn-lg w-100 my-1" data-active="false" data-observation="crack" onClick={handlePipe}>Crack</button>
                                </div>
                                <div className="col-12 hide" ref={pipeCrackModifierDivRef}>
                                    <button ref={pipeCrackMultipleRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="crack_multiple" onClick={handlePipe}>Multiple Cracks</button>
                                </div>

                                <div className="col-12">
                                    <button ref={pipeHoleRef} className="btn btn-info btn-lg w-100 my-1" data-active="false" data-observation="hole" onClick={handlePipe}>Hole</button>
                                    <button ref={pipeSeparatedJointRef} className="btn btn-info btn-lg w-100 my-1" data-active="false" data-observation="separated_joint" onClick={handlePipe}>Separated Joint</button>
                                </div>
                            </div>
                            <div className="row py-3 px-5">
                                <div className="col-12">
                                    <button ref={materialX2Ref} className="btn btn-warning btn-lg w-100 my-1" data-active="false" data-observation="material_change" onClick={handleMaterialX2}>Material Change</button>
                                </div>
                                <div ref={materialX2DivRef} className="col-12 hide">
                                    <button ref={x2MaterialCiRef} className="btn btn-outline-warning w-100 my-1" data-active="false" data-observation="ci" onClick={handleMaterialX2}>CI</button>
                                    <button ref={x2MaterialAcRef} className="btn btn-outline-secondary w-100 my-1" data-active="false" data-observation="ac" onClick={handleMaterialX2}>AC</button>
                                    <button ref={x2MaterialAbsRef} className="btn btn-outline-primary w-100 my-1" data-active="false" data-observation="abs" onClick={handleMaterialX2}>ABS</button>
                                    <button ref={x2MaterialVcpRef} className="btn btn-outline-success w-100 my-1" data-active="false" data-observation="vcp" onClick={handleMaterialX2}>VCP</button>
                                    <button ref={x2MaterialPvcRef} className="btn btn-outline-info w-100 my-1" data-active="false" data-observation="pvc" onClick={handleMaterialX2}>PVC</button>
                                    <button ref={x2MaterialOrbgRef} className="btn btn-outline-danger w-100 my-1" data-active="false" data-observation="orbg" onClick={handleMaterialX2}>ORBG</button>
                                    <button ref={x2MaterialHdpeRef} className="btn btn-outline-dark w-100 my-1" data-active="false" data-observation="hdpe" onClick={handleMaterialX2}>HDPE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row border p-2 m-2 pb-3 bg-foreground">
                        <div className="col col-12 pt-3">
                            <textarea name="observation_notes" id="observation_notes" placeholder="Notes" rows="3" className="form-control w-100 p-3" onChange={handleObservationNotes}/>
                        </div>
                    </div>                    
                </div>
                <div className="row mt-5">
                    <div className="col col-5">
                        <button id="done_observation_btn" className="btn btn-secondary btn-lg m-0 mt-3" data-toggle="tooltip" data-placement="top" title="Close" data-action="close" onMouseOver={handleNewObservationFormSubmitClick}>
                            Close
                        </button>
                    </div>
                    <div className="col col-7 text-right">
                        <button id="add_observation_btn" className="btn btn-primary btn-lg p-3 m-0" data-toggle="tooltip" data-placement="left" title="Next" data-action="next" onMouseOver={handleNewObservationFormSubmitClick}>
                            <IconPlus />
                        </button>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-12">
                        <div className="border">
                            <div className="text-break">{JSON.stringify(lineNotation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(lossOfCrossection)}</div>
                            <div className="text-break">{JSON.stringify(rootsObservation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(ojObservation)}</div>
                            <div className="text-break">{JSON.stringify(debObservation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(swObservation)}</div>
                            <div className="text-break">{JSON.stringify(uwObservation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(pipeBreakObservation)}</div>
                            <div className="text-break">{JSON.stringify(pipeCrackObservation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(pipeHoleObservation)}</div>
                            <div className="text-break">{JSON.stringify(pipeSeparatedJointObservation)}</div>
                            <div className="text-break text-danger">{JSON.stringify(locateDepth)}</div>
                            <div className="text-break">{JSON.stringify(materialX2)}</div>
                            <div className="text-break text-danger">{JSON.stringify(observationNotes)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <Modal show={show} onHide={handleClose} animation={false} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="bg-dark text-white border-bottom-0">
                <Modal.Title id="contained-modal-title-vcenter">Footage (in Feet)</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div className="py-2">
                    <div className="pb-4 align-center" style={{minWidth: '382px'}}>
                        <div ref={footageModalRef} {...{className: 'form-control form-control-lg text-right', name: 'footage', id: 'footage'}} style={{minWidth: '238px', height: '5rem', fontSize: '3rem'}}>{(!footageVal.length) ? "0.00" : (footageVal.join(''))}</div>
                    </div>
                    <div className="text-center" style={{minWidth: '386px'}}>
                        <div style={{display: 'inline-block'}} className="">
                            <div style={{minWidth: "278px"}}>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>7</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>8</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>9</button>
                            </div>
                            <div style={{minWidth: "278px"}}>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>4</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>5</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>6</button>
                            </div>
                            <div style={{minWidth: "278px"}}>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>1</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>2</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>3</button>
                            </div>
                            <div style={{minWidth: "278px"}}>
                                <button className={btnClasses} style={{width: '200px', height: '100px'}} onClick={handleAddToFootage}>0</button>
                                <button className={btnClasses} style={{width: '100px', height: '100px'}} onClick={handleAddToFootage}>.</button>
                            </div>
                        </div>
                        <div style={{display: 'inline-block', verticalAlign: 'top'}} className="">
                            <div style={{minWidth: '106px'}}>
                                <button className="btn btn-secondary border border-dark btn-lg" style={{width: '100px', height: '200px', display: 'block'}} onClick={handleBackspace}><IconBackspace /></button>
                                <button className="btn btn-secondary border border-dark btn-lg" style={{width: '100px', height: '200px', display: 'block'}} onClick={handleEnter} type="button" data-dismiss="modal" aria-label="Enter">Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark border-top-0">
                <Button variant="danger" onClick={handleClearFootage}>
                    Clear
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
