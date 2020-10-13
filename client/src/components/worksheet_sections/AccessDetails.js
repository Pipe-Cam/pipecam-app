import React from 'react'
import FormInputs from '../FormInputs'
import {accessDetails} from '../../inputsMetadata'

function AccessDetails() {
        // TODO: make sure the location address & access details are at the top of each page
    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Access Details</h3>
            <div className="pt-2">
                <FormInputs data={accessDetails}/>
            </div>
        </div>
    )
}

export default AccessDetails
