import React from 'react'
import Spinner from '../ui_components/Spinner'

function ObservationView(props) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    
    const inspection_id = urlParams.get('inspection_id')
    const access_num = urlParams.get('access_num')
    const observation_num = urlParams.get('observation_num')

    return(
        <>
            <div>
                Inspection ID: {inspection_id}
            </div>
            <div>
                Access Number: {access_num}
            </div>
            <div>
                Observation Number: {observation_num}
            </div>
            <div className="lead mt-5">
                {(!props.inspectionData) ? (<Spinner />) : (JSON.stringify(props.inspectionData.access[access_num].observations[observation_num - 1], null, 2))}
            </div>
        </>
    )
}

export default ObservationView
