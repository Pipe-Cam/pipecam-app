import React, {useState, useEffect} from 'react'
import JobOverview from '../worksheet_sections/JobOverview'
import JobLocation from '../worksheet_sections/JobLocation'
import JobHome from '../worksheet_sections/JobHome'
import InspectionContext from '../../context/InspectionContext'

const _ = require('lodash')

function NewInspection() {
    const [job, setJob] = useState({overview: {}, location: {}, access: {}, progress: 0})
    // const [appNav, setAppNav] = useState('new_inspection')
    const [appNav, setAppNav] = useState('new_access')

    const handleCreateJob = (e) => {
        console.log("handleCreateJob")
        e.preventDefault()
        // create new job in DB

        // redirect to job-dashboard
        setAppNav('job_home')
    }

    const handleIncrementProgress = () => {
        setJob({...job, progress: job.progress + 1})
    }
    
    if(appNav === 'new_inspection'){
        return (
            <div className="container">
                <h1>New Inspection</h1>
                <form onSubmit={handleCreateJob}>
                    <div className="row">
                        <div className="col col-12">
                            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                                <JobOverview />
                            </InspectionContext.Provider>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col col-12">
                            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
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
    } else if (appNav === 'job_home' || appNav === 'new_access') {
        return(
            <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                <JobHome />
            </InspectionContext.Provider> 
        )
    } else {
        return(
            <div>
                COMPONENT: NewInspection.js<br/>
                {appNav}
            </div>
        )
    }

}

export default NewInspection