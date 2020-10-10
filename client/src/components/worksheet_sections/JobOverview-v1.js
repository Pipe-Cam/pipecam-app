import React from 'react'
import FormInputs from '../FormInputs'
import {jobOverview} from '../../inputsMetadata'
// import {jobOverview, jobLocation, accessLocation, accessDetails, observations} from '../inputsMetadata'

function JobOverview() {
    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Job Overview</h3>
            <div className="pt-2">
                <FormInputs data={jobOverview}/>
            </div>
        </div>
    )
}

export default JobOverview