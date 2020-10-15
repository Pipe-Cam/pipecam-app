import React, {useEffect, useRef, useContext, useState} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import InspectionContext from '../../context/InspectionContext'

function ObservationHome(props) {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const {accessNumber} = props
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
        console.log('job', job)
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

    if(appNav === 'observations'){
        return (
            <div>
                <div className="float-left">
                    <button className="btn btn-secondary mt-3" onClick={handleNavToJobHome}>Done</button>
                </div>
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
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-house align-middle py-0 my-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                        </svg>
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
                                {(job.access[accessNumber] && job.access[accessNumber].observations.length) ? (<ListItems {...{job, setJob, accessNumber}}/>) : <div className="w-100 text-center border py-3">-- No Recorded Observations --</div>}
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
/*

{
    "overview": {
        "inspection_date": "2020-10-14",
        "property_address": "1234 Main St, Concord, CA 94520",
        "opening_observations": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eum harum nihil ipsa laboriosam esse in ab, amet quos asperiores iure adipisci sequi, recusandae distinctio, porro officia rerum vel dignissimos nemo possimus eligendi temporibus. Recusandae facilis dolore culpa nobis accusamus. Itaque quidem consequuntur voluptate repellendus ipsa quia quo, numquam deleniti, saepe laboriosam aperiam dolorum perferendis voluptatem mollitia alias blanditiis soluta impedit! Dolores omnis dicta at laudantium, sed ex! Accusantium deleniti numquam possimus tempore repellendus molestiae provident impedit commodi blanditiis! Debitis quos ab doloribus, ad consequatur itaque. At quos corrupti quia. Vitae consequuntur eius corporis! Animi tempore assumenda asperiores maxime consectetur!",
        "prelisting": "yes",
        "online": "yes",
        "cc_attached": "yes"
    },
    "location": {
        "occupancy": "occupied",
        "outbuilding": "yes",
        "outbuilding_has_plumbing": "yes",
        "outbuilding_has_cleanout": "yes",
        "outbuilding_pipe_diameter": "other",
        "outbuilding_pipe_diameter_other": "2",
        "cccusd": "yes",
        "cccusd_unpermitted_work": "yes"
    },
    "access": {
        "1": {
            "location": {
                "location": "foundation_edge",
                "location_position_front": "front",
                "location_position_modifier_corner": "corner",
                "location_position_modifier_under_deck": "Under Deck",
                "location_position_modifier_manual": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eum harum nihil ipsa laboriosam esse in.",
                "entry": "left",
                "porch": "right",
                "walk": "none"
            },
            "details": {
                "pipe_diameter": "3",
                "direction": "two_way",
                "opening_break_in": "break_in",
                "bopd": "check_valve",
                "bopd_condition_ball": "ball",
                "access_material": "vcp",
                "initial_pipe_material": "abs",
                "clean_out_excess_vegetation": "excess_vegetation",
                "clean_out_below_grade": "below_grade"
            },
            "observations": []
        }
    }
}

*/
export default ObservationHome

const ListItems = (props) => {
    const {job, setJob, accessNumber} = props
    const observations = job.access[accessNumber].observations
    console.log(Array.isArray(observations))
    return(
       <>
            {observations.map((item, index) => {
                if(index % 2 === 0){
                    return <ListItemDefault value={item.footage} key={item + Math.random(400) + Math.random(100)}/>
                } else {
                    return <ListItemSecondary value={item.footage}  key={item + Math.random(401) + Math.random(101)}/>
                }
            })}
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
                    <svg width="1.75em" height="1.75em" viewBox="0 0 16 16" className="bi bi-trash bg-none text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
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
                    <svg width="1.75em" height="1.75em" viewBox="0 0 16 16" className="bi bi-trash bg-none text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
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
                            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </form>
        </>
    )
}