import React from 'react'
import InputElements from '../InputElements'
import {jobLocation} from '../../inputsMetadata'
// import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../inputsMetadata'

function JobLocation() {
    return (
        <div className="pt-3">
            <h3>Job Location</h3>
            <div className="pt-2">
                <InputElements data={jobLocation}/>
            </div>
        </div>
    )
}

export default JobLocation