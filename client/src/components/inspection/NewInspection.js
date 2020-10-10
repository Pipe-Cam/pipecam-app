import React, {useState, useEffect} from 'react'
import JobOverview from '../worksheet_sections/JobOverview'
import JobLocation from '../worksheet_sections/JobLocation'
import JobHome from '../worksheet_sections/JobHome'

import InspectionContext from '../../context/InspectionContext'
import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../../inputsMetadata'

const _ = require('lodash')

function NewInspection() {
    const [job, setJob] = useState({overview: {}, location: {}, access: {}, progress: 0})
    const [currentPage, setCurrentPage] = useState()

    const handleCreateJob = (e) => {
        console.log("handleCreateJob")
        console.log('current page: ', currentPage)
        e.preventDefault()
        // create new job in DB

        // redirect to job-dashboard
        handleIncrementProgress()
    }

    const handleIncrementProgress = () => {
        setJob({...job, progress: job.progress + 1})
    }
    
    if(job.progress === 0){
        // setCurrentPage('overview')
        return (
            <div className="container">
                <form onSubmit={handleCreateJob}>
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
                            <button className="btn-primary btn-lg float-right" type="submit" name="submit">&nbsp; Create Job &nbsp;</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else if (job.progress === 1) {
        // setCurrentPage('home')
        return(
            <InspectionContext.Provider value={{job, setJob}}>
                <JobHome />
            </InspectionContext.Provider> 
        )
    }

}

export default NewInspection

            // <AccessLocation/>
            // <AccessDetails/>
            // <Observations/>