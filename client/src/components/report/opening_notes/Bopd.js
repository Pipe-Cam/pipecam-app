import React from 'react'
import RedItalic from '../../ui_components/RedItalic'

function Bopd(props) {
    const {jurisdiction} = props

    switch(jurisdiction) {
        case 'central_san':
            return(<>
                We recommend installing a backwater overflow prevention device (BOPD) over vertically oriented exterior cleanouts as a maintenance measure whenever possible. 
                One of the purposes of this device is to protect the home from a backup in the event that the municipal sewer main backs up.  
                Without such a device, the homeowner would be unable to file a claim with the Central Contra Costa County Sanitary District (CCCSD) if the sewer main was 
                to back up and cause damage inside the residence.  This device allows waste to expel outside the residence in the event of a backup of the line.&nbsp;
                <RedItalic>Be sure to install where it does not create a tripping hazard</RedItalic>.
            </>)
        case 'none':
            return(<>
                We recommend installing a backwater overflow prevention device (BOPD) over vertically oriented exterior cleanouts as a maintenance measure whenever possible. 
                This device allows waste to expel outside the residence in the event of a backup of the line.&nbsp;  
                <RedItalic>Be sure to install where it does not create a tripping hazard</RedItalic>.
            </>)
        default:
            return <><span className="text-danger">ERROR</span></>
    }
}

export default Bopd
