import React, {useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import JobOverview from '../worksheet_sections/JobOverview'
import JobLocation from '../worksheet_sections/JobLocation'
import JobHome from '../worksheet_sections/JobHome'
import InspectionContext from '../../context/InspectionContext'
import {newInspection as saveNewInspectionToDB} from '../../db/write'

const _ = require('lodash')

function NewInspection() {
    const [job, setJob] = useState({status: '', client_id: '', overview: {}, location: {}, access: {}})
    const [appNav, setAppNav] = useState('new_inspection')
    const [formMode, setFormMode] = useState(null)
    // const [appNav, setAppNav] = useState('job_home')
    // const [appNav, setAppNav] = useState('new_access')
    const history = useHistory();

    const newInspectionFormRef = useRef(null)

    const handleNewInspectionFormSubmit = (e) => {
        e.preventDefault()

        let clientId = newInspectionFormRef.current.elements['client'].getAttribute('data-id')
        console.log('clientId', clientId)

        if(clientId === ''){
            return
        } else {
            let tmpJob = job
            tmpJob.client_id = clientId
            setJob(tmpJob)
        }

        if(formMode === 'create') {
            // create
            console.log('create')
            handleCreateJob()
        } else if(formMode === 'save') {
            // save
            console.log('save')
            handleSaveJob()
        } else {
            // do nothing
            console.log(formMode)
        }
    }

    const handleCreateJob = () => {
        console.log("handleCreateJob")
        let tmpJob = job
        tmpJob.status = 'active'
        setJob(tmpJob)
        // create new job in DB
        saveNewInspectionToDB(job)
        // redirect to job-dashboard
        setAppNav('job_home')
    }

    const handleSaveJob = () => {
        console.log("handleSaveJob")
        let tmpJob = job
        tmpJob.status = 'scheduled'
        setJob(tmpJob)
        // create new job in DB
        saveNewInspectionToDB(job)
        
        // redirect to job-dashboard
        history.push('/')
    }

    const handleChangeFormMode = (e) => {
        let mode = e.target.getAttribute('data-name');
        setFormMode(mode)
    }

    
    if(appNav === 'new_inspection'){
        return (
            <div className="container pt-4">
                <h1>New Inspection</h1>
                <form ref={newInspectionFormRef} onSubmit={handleNewInspectionFormSubmit}>
                    <div className="row">
                        <div className="col col-12">
                            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                                <JobOverview />
                            </InspectionContext.Provider>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col col-12">
                            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                                <JobLocation />
                            </InspectionContext.Provider>
                        </div>
                    </div> */}

                    <div className="row justify-content-center py-5">
                        <div className="col col-5 text-right">
                            <button className="btn-primary btn-lg" data-name="save" onClick={handleChangeFormMode}>&nbsp; Save &nbsp;</button>
                        </div>
                        <div className="col col-7 text-left">
                            <button className="btn-warning btn-lg" data-name="create" onClick={handleChangeFormMode}>&nbsp; Create & Continue &nbsp;</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else if (appNav === 'job_home' || appNav === 'new_access' || appNav === 'observations' || appNav === 'new_observation') {
        return(
            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                <JobHome />
            </InspectionContext.Provider> 
        )
    } else {
        return(
            <div>
                <div>
                    <h3>COMPONENT: NewInspection.js</h3>

                </div>
                <div>
                    <em>No such view is available</em>
                </div>
                <div>
                    appNav: {appNav}
                </div>
            </div>
        )
    }

}

export default NewInspection


