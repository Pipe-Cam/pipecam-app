import React from 'react'
import {useParams, Redirect} from 'react-router-dom'

import NewInspection from '../components/inspection/NewInspection'
import CompletedInspectionList from '../components/inspection/CompletedInspectionList'

export default function Inspection() {
    let { mode } = useParams();
    
    if(mode === 'new') {
        return(
            <NewInspection />
        )
    } else if(mode === 'completed'){
        return(
            <CompletedInspectionList />
        )
    } else {
        return(
            <Redirect to="/" />
        )
    }
    
}