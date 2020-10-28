import React, {useContext, useState} from 'react'
import { useHistory, Link } from "react-router-dom";
import {Accordion, Card, Button} from 'react-bootstrap'
import InspectionContext from '../../context/InspectionContext'
import NewAccess from '../inspection/NewAccess'
import IconCaretDown from '../icons/IconCaretDown'
import IconTrash from '../icons/IconTrash'
import AlternatingList from '../ui_components/AlternatingList'

function JobHome() {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const history = useHistory();


    const handleCreateAccess = (e) => {
        console.log(e.target.name)
        console.log(appNav)

        if(e.target.name === 'new_access'){
            setAppNav('new_access')
        }
    }

    const handleNavToHome = () => {
        history.push("/")
    }

    const handleEditAccess = () => {
        console.log('handleEditAccess')
    }

    const handleDeleteAccess = () => {
        console.log('handleDeleteAccess')
    }

    const JobDetails = () => {
        const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

        const handleAddLocationDetails = () => {}


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
                                <IconCaretDown />
                            </Accordion.Toggle>
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <OverviewStatic />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <button className="btn btn-warning float-right mt-2" name="new_access" onClick={handleAddLocationDetails}>Add Location Details</button>
                {/* <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Location
                            <div className="w-100">
                            </div>
                        </Accordion.Toggle>
                        <span className="float-right">
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                <IconCaretDown />
                            </Accordion.Toggle>
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <LocationStatic />
                    </Card.Body>
                    </Accordion.Collapse>
                </Card> */}
            </Accordion>
        )
    }

    if(appNav === 'job_home'){
        return (
            <>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Job</li>
                </ol>
                </nav>
                <div className="container pt-4">
                    <div className="row justify-content-center pt-5">
                        <div className="col col-12">
                            <div style={{display: 'inline-block'}}>
                                <h1>Job Details</h1>
                            </div>
                            {/* <div className="float-right mt-1" style={{display: 'inline-block'}}>
                                <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateAccess}>New Access</button>
                            </div> */}
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
                                {(JSON.stringify(job.access) === '{}') ? <div className="w-100 text-center border py-3">-- Access List Is Empty --</div> : (<ListItems {...{job, handleEditAccess, handleDeleteAccess}}/>)}
                            </ul>
                        </div>
                    </div>
                    <div className="row justify-content-center py-5">
                        <div className="col col-12">
                            <button className="btn-primary btn-lg float-right" name="new_access" onClick={handleCreateAccess}>New Access</button>
                        </div>
                    </div>
                </div>
            </>
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
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)

    return(
        <li className="list-group-item list-group-item-secondary">
            <span>
                Access #2
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
                <div className="text-md-right text-sm-left py-2 col col-md-3 col-sm-5 border-bottom border-top">Office Notes:</div>
                <div className="py-2 col col-md-9 col-sm-7 border-bottom border-top border-left">{job.overview.office_notes}</div>
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
    const {job, handleEditAccess, handleDeleteAccess} = props
    // console.log(job)
    // const accessArr = Object.keys(job.access)

    return(
       <>
            <AlternatingList {...{dataObject: job.access, edit: handleEditAccess, _delete: handleDeleteAccess, buttons: {show: true, edit: true, _delete: true}}}/>
            {/* {accessArr.map((item, index) => {
                if(index % 2 === 0){
                    return <ListItemDefault value={job.access[item]} key={item + Math.random(400) + Math.random(100)}/>
                } else {
                    return <ListItemSecondary value={job.access[item]}  key={item + Math.random(401) + Math.random(101)}/>
                }
            })} */}
       </>
    )
}