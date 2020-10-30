import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import ActiveContext from '../../context/ActiveContext'
import InspectionContext from '../../context/InspectionContext'
import JobHome from '../worksheet_sections/JobHome'

function ScheduledInspection() {
    const {activeClientId, setActiveClientId} = useContext(ActiveContext)
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)


    if(activeClientId){
        return (
            <div>
                <InspectionContext.Provider value={{job, setJob, appNav, setAppNav}}>
                    <JobHome status={'scheduled'}/>
                </InspectionContext.Provider>
            </div>
        )
    } else {
        return(<Redirect to="/"/>
        )
    }
}

export default ScheduledInspection
