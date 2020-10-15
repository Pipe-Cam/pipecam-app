import React, {useContext, useState} from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'
import InspectionContext from '../../context/InspectionContext'
import NewAccess from '../inspection/NewAccess'

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
 
            <div className="container pt-4">
                <div className="row justify-content-center pt-5">
                    <div className="col col-12">
                        <div style={{display: 'inline-block'}}>
                            <h1>Job Details</h1>
                        </div>
                        <div className="float-right mt-1" style={{display: 'inline-block'}}>
                            <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateAccess}>New Access</button>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mb-5">
                    <div className="col col-12">
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
                            {(job.access && job.access.length) ? (<ListItems />) : <div className="w-100 text-center border py-3">-- No Recorded Observations --</div>}

                            {/* <ListItemDefault />
                            <ListItemSecondary /> */}
                        </ul>
                    </div>
                </div>
                {/* <div className="float-right mt-5">
                        <button className="btn btn-primary" name="new_access" onClick={handleCreateAccess}>New Access</button>
                </div> */}
                <div className="row justify-content-center py-5">
                    <div className="col col-12">
                        <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateAccess}>New Access</button>
                    </div>
                </div>
            </div>
        )
    } else if(appNav === 'new_access' || appNav === 'observations' || appNav === 'new_observation'){
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
            <span>
                Access #1
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
            </span>        </li>
    )
}
const ListItemSecondary = (props) => {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item list-group-item-secondary">
            <span>
                Access #2
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

const OverviewStatic = () => {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <>
            {/* TODO #2: display Job Overview & Job Location details here */}
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-5 border-bottom">Inspection Date:</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-left">{job.overview.inspection_date}</div>
            </div> 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-5 border-bottom border-top">Property Address:</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-top border-left">{job.overview.property_address}</div>
            </div> 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-5 border-bottom border-top">Prelisting?</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-top border-left">{job.overview.prelisting}</div>
            </div> 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-5 border-bottom border-top">Online?</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-top border-left">{job.overview.online}</div>
            </div> 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-5 border-top">CC Attached?</div>
                <div className="py-2 col col-md-9 col-sm-7 border-top border-left">{job.overview.cc_attached}</div>
            </div>
            <div className="row">
                <div className="text-md-right text-sm-left py-2 col col-md-3 col-sm-5 border-bottom border-top">Opening Observations:</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-top border-left">{job.overview.opening_observations}</div>
            </div> 
        </>
    )
}

const LocationStatic = ()=>{
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const OutbuildingModifiers = () => {
        return(
            <>
                <div className="row">
                    <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom border-top">Outbuilding Has Plumbing? </div>
                    <div className="py-2 col col-md-9 col-sm-6 border-bottom border-top border-left">{job.location.outbuilding_has_plumbing}</div>
                </div> 
                <div className="row">
                    <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom border-top">Outbuilding Has Cleanout?</div>
                    <div className="py-2 col col-md-9 col-sm-6 border-bottom border-top border-left">{job.location.outbuilding_has_cleanout}</div>
                </div> 
                <div className="row">
                    <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom border-top">Outbuilding Pipe Diameter?</div>
                    <div className="py-2 col col-md-9 col-sm-6 border-bottom border-top border-left">{(job.location.outbuilding_pipe_diameter === 'other') ? (job.location.outbuilding_pipe_diameter_other) : (job.location.outbuilding_pipe_diameter)}</div>
                </div>
            </>
        )
    }

    return(
        <>
            {/* TODO #2: display Job Overview & Job Location details here */}
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom">Occupancy: </div>
                <div className="py-2 col col-md-9 col-sm-6 border-bottom  border-left">{job.location.occupancy}</div>
            </div> 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom border-top">Outbuilding? </div>
                <div className="py-2 col col-md-9 col-sm-6 border-bottom border-top border-left">{job.location.outbuilding}</div>
            </div>
            {(job.location.outbuilding === 'yes') ? (<OutbuildingModifiers />) : <div className="row" style={{display: 'none'}}>&nbsp;</div>} 
            <div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-6 border-bottom border-top">CCUSD?</div>
                <div className="py-2 col col-md-9 col-sm-6 border-bottom border-top border-left">{job.location.cccusd}</div>
            </div> 
            {(job.location.cccusd === 'yes') ? (<div className="row">
                <div className="text-right py-2 col col-md-3 col-sm-6 border-top">CCUSD - Unpermitted Work?</div>
                <div className="py-2 col col-md-9 col-sm-6 border-top border-left">{job.location.cccusd_unpermitted_work}</div>
            </div> ) : <div className="row" style={{display: 'none'}}>&nbsp;</div>} 
        </>
    )
}


const ListItems = (props) => {
    return(
        <>
            <ListItemDefault />
            <ListItemSecondary />
        </>
    )
}