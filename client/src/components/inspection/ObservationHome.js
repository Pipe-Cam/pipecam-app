import React, {useEffect, useRef, useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import InspectionContext from '../../context/InspectionContext'
import IconHouse from '../icons/IconHouse'
import IconPlus from '../icons/IconPlus'
import IconTrash from '../icons/IconTrash'
import AlternatingList from '../ui_components/AlternatingList'


function ObservationHome(props) {
    // const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const {accessNumber, setAccessNumber} = props
    const [observationNumber, setObservationNumber] = useState(0)
    const [currentObservation, setCurrentObservation] = useState({})

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const handleCreateObservation = (e) => {
        setAppNav('new_observation')
        setObservationNumber(observationNumber + 1)
    }
    
    const handleNewObservationSubmit = (e) => {
        e.preventDefault()
        let tmpJob = job
        tmpJob.access[accessNumber].observations.push(currentObservation)
        setJob(tmpJob)
        setCurrentObservation({})
        setAppNav('observations')
    }

    const handleNewObservationOnChange = (e) => {
        let name = e.target.name || e.target.id
        let type = e.target.type
        let val = (type === 'checkbox') ? e.target.checked : e.target.value
        let tmpCurrentObservation = currentObservation
        tmpCurrentObservation[name] = val
        setCurrentObservation(tmpCurrentObservation)
    }

    const handleNavToJobHome = () => {
        setAppNav('job_home')
    }

    const handleEditObservation = () => {
    }

    const handleDeleteObservation = () => {
    }


    if(appNav === 'observations'){
        return (
            <div>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><a href="#" onClick={handleNavToJobHome}>Job</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Access #{accessNumber}</li>
                </ol>
                </nav>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col col-12">
                            <div style={{display: 'inline-block'}}>
                                <div style={{width: '75%'}}></div>
                            </div>
                            <div className="float-right mt-1" style={{display: 'inline-block'}}>
                                <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateObservation}>New Observation</button>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center border bg-foreground my-5">
                        <div className="col col-12 m-2 p-3">
                            <ListGroup>
                                <div className="h5 pb-1">Property Address</div>
                                <ListGroup.Item>
                                    <span className="pr-3 align-middle py-0 my-0">
                                        <IconHouse />
                                    </span>
                                    <span className="align-middle" style={{fontSize: '1.5em'}}>
                                        {job.overview.property_address}
                                    </span>
                                </ListGroup.Item>
                                <div className="h5 pt-3 pb-1">Access #{accessNumber} Details</div>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 ">
                                            <span style={{textDecoration: 'underline'}} className="font-weight-bold">
                                                Location
                                            </span>
                                            <br/>
                                            <span>
                                                {job.access[accessNumber].location.location}
                                            </span>
                                        </div>
                                        <div className="col-md-2 col-sm-6 ">
                                            <span style={{textDecoration: 'underline'}} className="font-weight-bold">
                                                Diameter
                                            </span>
                                            <br/>
                                            <span>
                                                {job.access[accessNumber].details.pipe_diameter}
                                            </span>
                                        </div>
                                        <div className="col-md-2 col-sm-6 ">
                                            <span style={{textDecoration: 'underline'}} className="font-weight-bold">
                                                Direction
                                            </span>
                                            <br/>
                                            <span>
                                                {job.access[accessNumber].details.direction}
                                            </span>
                                        </div>
                                        <div className="col-md-2 col-sm-6 ">
                                            <span style={{textDecoration: 'underline'}} className="font-weight-bold">
                                                Access
                                            </span>
                                            <br/>
                                            <span>
                                                {job.access[accessNumber].details.access_material}
                                            </span>
                                        </div>
                                        <div className="col-md-2 col-sm-6 ">
                                            <span style={{textDecoration: 'underline'}} className="font-weight-bold">
                                                Pipe
                                            </span>
                                            <br/>
                                            <span>
                                                {job.access[accessNumber].details.initial_pipe_material}
                                            </span>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
    
                    <div className="row justify-content-center">
                        <div className="col col-12">
                            <h3>Observations</h3>
                            {/* TODO #1: populate access list from state */}
                            <ul className="list-group">
                                {(job.access[accessNumber] && job.access[accessNumber].observations.length) ? (<ListItems {...{job, setJob, accessNumber, handleEditObservation, handleDeleteObservation}}/>) : <div className="w-100 text-center border py-3">-- No Recorded Observations --</div>}
                            </ul>
                        </div>
                    </div>
                    <div className="row justify-content-center pt-5">
                        <div className="col col-12">
                            <div className="float-right mt-1" style={{display: 'inline-block'}}>
                                <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateObservation}>New Observation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if(appNav === 'new_observation') {
        return(
            <NewObservation {...{handleNewObservationSubmit, handleNewObservationOnChange}}/>
        )
    }
}

export default ObservationHome

const ListItems = (props) => {
    const {job, setJob, accessNumber, handleEditObservation, handleDeleteObservation} = props
    const observations = job.access[accessNumber].observations

    const footage = observations.map(item => {
        return item.footage
    })

    return(
       <>
            <AlternatingList {...{dataObject: footage, edit: handleEditObservation, _delete: handleDeleteObservation, buttons: {show: true, edit: true, _delete: true}}}/>
       </>
    )
}

const ListItemDefault = (props) => {
    // const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item">
            <span>
                {props.value}
            </span>
            <span className="ml-3 float-right">
                <a href="#" className="">
                    <IconTrash />
                </a>
            </span>
            <span className="mx-3 float-right">
                <a href="#" className="badge badge-info px-3 py-2">Edit</a>
            </span>
        </li>
    )
}
const ListItemSecondary = (props) => {
    // const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item list-group-item-secondary">
            <span>
                {props.value}
            </span>
            <span className="ml-3 float-right">
                <a href="#" className="">
                    <IconTrash />
                </a>
            </span>
            <span className="mx-3 float-right">
                <a href="#" className="badge badge-info px-3 py-2">Edit</a>
            </span>
        </li>
    )
}


const NewObservation = (props) => {
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
                        <div className="h6">Pipe Issue</div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_crack" value="crack" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_crack">Crack</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_separated_joint" value="separated_joint" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_separated_joint">Separated Joint</label>
                        </div>
                        <div className="form-check form-check-inline mr-5">
                            <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_hole" value="hole" onChange={handleNewObservationOnChange}/>
                            <label className="form-check-label radio-button-label" htmlFor="pipe_issue_hole">Hole</label>
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