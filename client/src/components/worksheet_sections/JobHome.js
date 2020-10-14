import React, {useContext, useState} from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'
import InspectionContext from '../../context/InspectionContext'
import NewAccess from '../inspection/NewAccess'
import Observations from '../inspection/Observations'

function JobHome() {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    const handleCreateAccess = (e) => {
        console.log(e.target.name)
        console.log(appNav)

        if(e.target.name === 'new_access'){
            setAppNav('new_access')
        }
    }

    const JobDetails = () => {
        const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    
        return(
            <Accordion defaultActiveKey="">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Overview
                            <div className="w-100">
                            </div>
                        </Accordion.Toggle>
                        <span className="float-right">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </Accordion.Toggle>
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <OverviewStatic />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Location
                            <div className="w-100">
                            </div>
                        </Accordion.Toggle>
                        <span className="float-right">
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </Accordion.Toggle>
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <LocationStatic />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }

    if(appNav === 'job_home'){
        return (
            <div className="container py-5">
                <div className="row justify-content-center mb-5">
                    <div className="col col-12">
                        <button className="btn btn-primary float-right" name="new_access" onClick={handleCreateAccess}>New Access</button>
                    </div>
                </div>
                <div className="row justify-content-center my-5">
                    <div className="col col-12">
                        <h3>Job Details</h3>
                    </div>
                </div>
                <div className="row justify-content-center my-5">
                    <div className="col col-12">
                        {/* <OverviewStatic />  */}
                        <JobDetails />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-12">
                        <h3>Access List</h3>
                        {/* TODO #1: populate access list from state */}
                        <ul className="list-group">
                            <ListItemDefault />
                            <ListItemSecondary />
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else if(appNav === 'new_access' || appNav === 'observations'){
        return(
            <NewAccess />
        )
    }
    
}

export default JobHome

const ListItemDefault = (props) => {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item">
            Access #1 <span className="mr-2 float-right"><a href="#" className="badge badge-danger px-2">Delete</a></span><span className="mx-2 float-right"><a href="#" className="badge badge-info px-3">Edit</a></span>
        </li>
    )
}
const ListItemSecondary = (props) => {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item list-group-item-secondary">
            <span>
                Access #2 
            </span>
            <span className="mr-2 float-right">
                <a href="#" className="badge badge-danger px-2">Delete</a>
            </span>
            <span className="mx-2 float-right">
                <a href="#" className="badge badge-info px-3">Edit</a>
            </span>
        </li>
    )
}

const OverviewStatic = () => {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <>
            {/* TODO #2: display Job Overview & Job Location details here */}
            <div className="row py-2">
                <div className="col col-3">Inspection Date:</div>
                <div className="col col-9">{job.overview.inspection_date}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Property Address:</div>
                <div className="col col-9">{job.overview.property_address}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Opening Observations:</div>
                <div className="col col-9">{job.overview.opening_observations}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Prelisting?</div>
                <div className="col col-9">{job.overview.prelisting}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Online?</div>
                <div className="col col-9">{job.overview.online}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">CC Attached?</div>
                <div className="col col-9">{job.overview.cc_attached}</div>
            </div>
        </>
    )
}

const LocationStatic = ()=>{
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <>
            {/* TODO #2: display Job Overview & Job Location details here */}
            <div className="row py-2">
                <div className="col col-3">Occupancy: </div>
                <div className="col col-9">{job.location.occupancy}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Outbuilding? </div>
                <div className="col col-9">{job.location.outbuilding}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Outbuilding Has Plumbing? </div>
                <div className="col col-9">{job.location.outbuilding_has_plumbing}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Outbuilding Has Cleanout?</div>
                <div className="col col-9">{job.location.outbuilding_has_cleanout}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">Outbuilding Pipe Diameter?</div>
                <div className="col col-9">{(job.location.outbuilding_pipe_diameter === 'other') ? (job.location.outbuilding_pipe_diameter_other) : (job.location.outbuilding_pipe_diameter)}</div>
            </div>
            <div className="row py-2">
                <div className="col col-3">CCUSD?</div>
                <div className="col col-9">{job.location.ccusd}</div>
            </div> 
            <div className="row py-2">
                <div className="col col-3">CCUSD - Unpermitted Work?</div>
                <div className="col col-9">{job.location.cccusd_unpermitted_work}</div>
            </div> 
        </>
    )
}


