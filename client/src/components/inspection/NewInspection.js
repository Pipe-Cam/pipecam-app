import React, {useState, useEffect} from 'react'
import JobOverview from '../worksheet_sections/JobOverview'
import JobLocation from '../worksheet_sections/JobLocation'
import AccessLocation from '../worksheet_sections/AccessLocation'
import AccessDetails from '../worksheet_sections/AccessDetails'
import Observations from '../worksheet_sections/Observations'

import InspectionContext from '../../context/InspectionContext'

function NewInspection() {
    const [phase, setPhase] = useState(1);
    const [jobOverview, setJobOverview] = useState()
    const [jobLocation, setJobLocation] = useState()
    const [access, setAccess] = useState()


    if(phase === 1) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-6">
                        <InspectionContext.Provider value={{jobOverview, setJobOverview}}>
                            <JobOverview />
                        </InspectionContext.Provider>
                    </div>
                    <div className="col col-6">
                        <InspectionContext.Provider value={{jobLocation, setJobLocation}}>
                            <JobLocation />
                        </InspectionContext.Provider>
                    </div>
                </div>
                <div className="row justify-content-center py-5">
                    <div className="col col-12">
                        <button className="btn-primary btn-lg float-right" onClick={()=>{setPhase(phase+1)}}>&nbsp; Next &nbsp;</button>
                    </div>
                </div>
            </div>
        )
    } else if(phase === 2) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col col-6">
                        access location
                    </div>
                    <div className="col col-6">
                        access details
                    </div>
                </div>
                <div className="row justify-content-center py-5">
                    <div className="col col-12">
                        <button className="btn-primary btn-lg float-right" onClick={()=>{setPhase(phase+1)}}>&nbsp; Next &nbsp;</button>
                    </div>
                </div>
            </div>
        )
    } else if(phase === 3) {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-12">
                        observations
                    </div>
                </div>
                <div className="row justify-content-center py-5">
                    <div className="col col-12">
                        <button className="btn-primary btn-lg float-right" onClick={()=>{setPhase(phase+1)}}>&nbsp; Next &nbsp;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewInspection

            // <AccessLocation/>
            // <AccessDetails/>
            // <Observations/>