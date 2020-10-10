import React, {useState, useEffect} from 'react'
import JobOverview from '../worksheet_sections/JobOverview'
import JobLocation from '../worksheet_sections/JobLocation'
import AccessLocation from '../worksheet_sections/AccessLocation'
import AccessDetails from '../worksheet_sections/AccessDetails'
import Observations from '../worksheet_sections/Observations'

import InspectionContext from '../../context/InspectionContext'
import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../../inputsMetadata'

const _ = require('lodash')

function NewInspection() {
    const [job, setJob] = useState({overview: {}, location: {}, access: {}})

    const handleCreateJob = () => {
        // create new job in DB
        // redirect to job-dashboard
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-12">
                    <InspectionContext.Provider value={{job, setJob}}>
                        <JobOverview />
                    </InspectionContext.Provider>
                </div>
            </div>    
            <div className="row">
                <div className="col col-12">
                    <InspectionContext.Provider value={{job, setJob}}>
                        <JobLocation />
                    </InspectionContext.Provider>
                </div>
            </div>
            <div className="row justify-content-center py-5">
                <div className="col col-12">
                    <button className="btn-primary btn-lg float-right" onClick={handleCreateJob}>&nbsp; Create Job &nbsp;</button>
                </div>
            </div>
        </div>
    )
}

export default NewInspection

            // <AccessLocation/>
            // <AccessDetails/>
            // <Observations/>