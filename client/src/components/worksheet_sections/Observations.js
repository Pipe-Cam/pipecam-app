import React, {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Switch, Route, useParams, useHistory} from 'react-router-dom'
import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'
import capitalizeEachWord from '../../utility/capitalizeEachWord'
import Spinner from '../ui_components/Spinner'
import IconPlus from '../icons/IconPlus'

function Observations() {
    const history = useHistory()
    const {id} = useParams()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    const [accessNumber, setAccessNumber] = useState(urlParams.get('access_num'))
    const [observationQty, setObservationQty] = useState(0)

    const [inspectionData, setInspectionData] = useState(null)

    useEffect(()=>{
        console.log('inspectionId', inspectionId)
        console.log('accessNumber', accessNumber)
        setInspectionDataOnLoad(inspectionId)
    }, [])

    useEffect(()=>{
        try{
            if(inspectionData){
                let obsQty = getObservationQty(inspectionData)
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
            return null
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
            }
            if(action === 'increment'){
                setObservationQty(observationQty + num)
            }
            if(action === 'subtract'){
                setObservationQty()
            }
        } catch(err){
            console.log(err)
        }


    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/observations/home' exact>
                        <ObservationHome {...{inspectionId, accessNumber, inspectionData, history, observationQty}}/>
                    </Route>
                    <Route path='/observations/new' exact>
                        <ObservationNew {...{inspectionId, accessNumber}}/>
                    </Route>
                    <Route path='/observations/edit' exact>
                        <ObservationEdit {...{inspectionId, accessNumber}}/>
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
    // console.log(JSON.stringify(inspectionData, null, 2))
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

                    <div className="border py-3 mb-5 px-sm-3 px-md-0">
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
                                    Property Address: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="lead">{capitalizeEachWord(inspectionData.overview.property_address.split('_').join(' '))}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-2">
                        <div className="col-6">
                            <h3>Observation List</h3>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-primary" onClick={()=>{history.push(`/observations/new?inspection_id=${inspectionId}&access_num=1&observation_num=${observationQty}`)}}>New Observation</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12">
                            <ObservationList {...{inspectionData, accessNumber}}/>
                        </div>
                    </div>

                    <div className="row bg-dark text-white">
                        <div className="col-3">
                            Inspection Data:
                        </div>
                        <div className="col-9">
                            {(JSON.stringify(inspectionData) === 'null') ? <Spinner /> : (Object.keys(inspectionData).map(item=>{return(<div className="mb-4" key={JSON.stringify(inspectionData[item])}>{item}:<br/>{JSON.stringify(inspectionData[item])}</div>)}))}
                        </div>
                    </div>
                </>
            )
    }
}

const ObservationList = (props) => {
    const {inspectionData, accessNumber} = props
    if(accessNumber && inspectionData && inspectionData.access && 
        inspectionData.access[accessNumber] && inspectionData.access[accessNumber].observations && 
        JSON.stringify(inspectionData.access[accessNumber].observations) !== '[]'){
            return(
                <div>{inspectionData.access.[accessNumber].observations.map(item=>{
                    return(<div key={item}>{JSON.stringify(item)}</div>)
                })}</div>
            )
        } else {
            return(<div className="text-center">no recorded observations</div>)
    }
}
const ObservationNew = (props) => {
    const {inspectionId, accessNumber} = props
    const {handleNewObservationSubmit, handleNewObservationOnChange} = props

    const standingWaterRef = useRef(null)
    const standingWaterStartRef = useRef(null)
    const standingWaterEndRef = useRef(null)
    const underWaterRef = useRef(null)
    const underWaterStartRef = useRef(null)
    const underWaterEndRef = useRef(null)

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

    return(
        <>
        <form onSubmit={handleNewObservationSubmit}>
            <div className="p-3">
                <div className="row border p-2 m-2 bg-foreground">
                    <div className="col col-6 pt-3">
                        <label className="h6" htmlFor='footage'>Footage (in Feet) <span className="text-danger">*</span></label>
                        <input {...{className: 'form-control mb-3', type: 'number', name: 'footage', id: 'footage', placeholder: 'ft.in', step: '0.1', min: '0', required: true}} onChange={handleNewObservationOnChange}/>
                    </div>
                </div>
                <div className="row border p-2 m-2 bg-foreground">
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
                        <input {...{className: 'form-control mb-3 float-right', type: 'number', name: 'loss_of_crosssection', id: 'loss_of_crosssection', step: '1', min: '0', max: '100', placeholder: '%'}} onChange={handleNewObservationOnChange}/>
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
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col col-12 text-center">
                        <button id="add_access_btn" className="btn-primary btn-lg p-3 m-0" type="submit" name="submit">
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