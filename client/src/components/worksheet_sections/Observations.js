import React from 'react'
import FormInputs from '../FormInputs'
import {observations} from '../../inputsMetadata'

function Observations() {
    return (
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h3>Observations</h3>
            <div className="pt-2">
                <FormInputs data={observations}/>
            </div>
        </div>
    )
}

export default Observations
