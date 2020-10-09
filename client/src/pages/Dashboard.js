import React from 'react'
import {Link} from 'react-router-dom'

function Dashboard() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col col-3">
                    <div className="card">
                        <Link to="/inspection/new">
                            <div className="card-body text-center" >
                                <h3>New Inspection</h3>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col col-4">
                    <div className="card">
                    <Link to="/inspection/completed">
                            <div className="card-body text-center" >
                                <h3>Completed Inspections</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
