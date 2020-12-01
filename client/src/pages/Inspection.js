import React from 'react'
import InspectionNav from '../nav/InspectionNav'
import InspectionContext from '../context/InspectionContext'

export default function Inspection() {

    return(
        <InspectionContext.Provider value="" >
            <InspectionNav />
        </InspectionContext.Provider>
    )
}