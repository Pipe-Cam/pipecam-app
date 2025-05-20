import React, {useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import InspectionOverview from '../worksheet_sections/InspectionOverview'
// import InspectionLocation from '../worksheet_sections/InspectionLocation'
// import JobHome from '../worksheet_sections/JobHome'
import InspectionContext from '../../context/InspectionContext'
import {newInspection as saveNewInspectionToDB} from '../../db/write'

// const _ = require('lodash')

function NewInspection() {
    const [job, setJob] = useState({status: '', client_id: '', overview: {}, location: {}, access: {}})
    const [formMode, setFormMode] = useState(null)
    const history = useHistory();

    const newInspectionFormRef = useRef(null)

    const handleNewInspectionFormSubmit = (e) => {
        e.preventDefault()

        let clientId = newInspectionFormRef.current.elements['client'].getAttribute('data-id')

        if(clientId === ''){
            return
        } else {
            let tmpJob = job
            tmpJob.client_id = clientId
            setJob(tmpJob)
        }

        if(formMode === 'create') {
            // create
            handleCreateJob()
        } else if(formMode === 'save') {
            // save
            handleSaveJob()
        } else {
            // do nothing
        }
    }

    const handleCreateJob = async () => {
        let tmpJob = job
        tmpJob.status = 'active_inspection'
        setJob(tmpJob)
        // create new job in DB
        let savedInspection = await saveNewInspectionToDB(job)
    }

    const handleSaveJob = async () => {
        let tmpJob = job
        tmpJob.status = 'scheduled_inspection'
        setJob(tmpJob)
        // create new job in DB
        let savedInspection = await saveNewInspectionToDB(job)
        // redirect to job-dashboard
        history.push('/')
        window.location.reload();
    }

    const handleChangeFormMode = (e) => {
        let mode = e.target.getAttribute('data-name');
        setFormMode(mode)
    }


    return (
        <div className="container pt-4">
            <h1>New Inspection</h1>
            <form ref={newInspectionFormRef} onSubmit={handleNewInspectionFormSubmit}>
                <div className="row">
                    <div className="col col-12">
                        <InspectionContext.Provider value={{job, setJob}}>
                            <InspectionOverview />
                        </InspectionContext.Provider>
                    </div>
                </div>

                <div className="row justify-content-center py-5">
                    <div className="col col-5 text-center">
                        <button className="btn-primary btn-lg" data-name="save" onClick={handleChangeFormMode}>&nbsp; Save &nbsp;</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewInspection


