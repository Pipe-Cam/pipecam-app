import React from 'react'
import {Link} from 'react-router-dom'

function JobHome() {

    const ListItemDefault = (props) => {
        return(
            <li className="list-group-item">
                Access #1 <span className="mr-2 float-right"><a href="#" className="badge badge-danger px-2">Delete</a></span><span className="mx-2 float-right"><a href="#" className="badge badge-info px-3">Edit</a></span>
            </li>
        )
    }
    const ListItemSecondary = (props) => {
        return(
            <li className="list-group-item list-group-item-secondary">
                Access #2 <span className="mr-2 float-right"><a href="#" className="badge badge-danger px-2">Delete</a></span><span className="mx-2 float-right"><a href="#" className="badge badge-info px-3">Edit</a></span>
            </li>
        )
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-5">
                <div className="col col-12">
                    <button className="btn btn-primary float-right" >New Access</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col col-12">
                    <h3>Accesses</h3>
                    <ul className="list-group">
                        <ListItemDefault />
                        <ListItemSecondary />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobHome