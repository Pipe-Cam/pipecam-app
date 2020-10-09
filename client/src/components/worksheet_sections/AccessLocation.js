import React from 'react'
import FormInputs from '../FormInputs'
import {accessLocation} from '../../inputsMetadata'

function AccessLocation() {
    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Access Location</h3>
            <div className="pt-2">
                <FormInputs data={accessLocation}/>
            </div>
        </div>
    )
}

export default AccessLocation
