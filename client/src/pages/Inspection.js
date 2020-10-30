import React from 'react'
import InspectionNav from '../nav/InspectionNav'
import InspectionContext from '../context/InspectionContext'

// import NewInspection from '../components/inspection/NewInspection'
// import CompletedInspectionList from '../components/inspection/CompletedInspectionList'
// import ScheduledInspection from '../components/inspection/ScheduledInspection'

export default function Inspection() {

    return(
        <InspectionContext.Provider value="" >
            <InspectionNav />
        </InspectionContext.Provider>
    )
}





// console.log(mode)

// if(mode === 'new') {
//     return(
//         <NewInspection />
//     )
// } else if(mode === 'completed'){
//     return(
//         <CompletedInspectionList />
//     )
// } else if(mode === 'scheduled'){
//     return(
//         <>
//         {/*<ScheduledInspection />*/}
//         scheduled inspection
//         </>
//     )
// } else {
//     return(
//         <Redirect to="/" />
//     )
// }