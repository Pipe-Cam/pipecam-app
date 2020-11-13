import React from 'react'
import Spinner from '../../ui_components/Spinner'

function RootCutWarranty(props) {
    const {plusOneYear} = props
    return (
        <>
            Root intrusions were removed from the line immediately prior to this inspection. 
            A sewer popper backwater overflow prevention device was installed in lieu of the water tight cleanout cap. 
            Some residual root matter remained in the line that was treated with a chemical foam treatment to decay the roots over time. 
            The line is now warranted for 1 year until {plusOneYear ? plusOneYear : <Spinner />} for any root related blockage. We recommend an annual maintenance 
            program as the roots will grow and change over time and require cutting.
        </>
    )
}

export default RootCutWarranty
