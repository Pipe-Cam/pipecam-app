import React from 'react'
import FormInputs from '../FormInputs'
import {jobLocation} from '../../inputsMetadata'
// import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../inputsMetadata'

function JobLocation() {
    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Job Location</h3>
            <div className="pt-2">
                <FormInputs data={jobLocation}/>
            </div>
        </div>
    )
}

export default JobLocation