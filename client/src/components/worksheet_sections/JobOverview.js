import React from 'react'
import InputElements from '../InputElements'
import {jobOverview} from '../../inputsMetadata'
// import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../inputsMetadata'

function JobOverview() {
    return (
        <div className="pt-3">
            <h3>Job Overview</h3>
            <div className="pt-2">
                <InputElements data={jobOverview}/>
            </div>
        </div>
    )
}

export default JobOverview