import React from 'react'
import {useParams, useHistory} from 'react-router-dom'

function InspectionHome() {
    let {id} = useParams()
    let history = useHistory()

    return (
        <>
            <div>
                {id}
            </div>
            <div>
                {JSON.stringify(history.location.pathname)}
            </div>
        </>
    )
}

export default InspectionHome
