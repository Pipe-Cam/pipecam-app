import React from 'react'
import InspectionHome from '../components/inspection/InspectionHome'
import NewInspection from '../components/inspection/NewInspection'

import {  
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

function InspectionNav() {
    return(
        <>
            <Router>
                <Switch>
                    <Route path='/inspection' exact>
                        <Redirect to="/"/>
                    </Route>
                    <Route path='/inspection/new' exact>
                        <NewInspection />
                    </Route>
                    <Route path='/inspection/:id'>
                        <InspectionHome />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default InspectionNav
