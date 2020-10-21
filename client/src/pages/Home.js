import React from 'react'
import {Link} from 'react-router-dom'
import AlternatingList from '../components/ui_components/AlternatingList'

function Home() {
    const testHandler = () => {
        console.log('test handler')
    }
    // let {listTitle, dataObject, edit, _delete} = props

    return (
        <div className="container py-3 justify-content-center">
            <div className="row justify-content-center">
                <HomeNavButtons />
            </div>
            <div className="row my-5">
                <div className="col col-sm-12 col-md-6 col-lg-6 py-3">
                    <h3>Scheduled Inspections</h3>
                    <AlternatingList {...{edit: testHandler, _delete: testHandler, dataObject: [1,2,3,4,5,6,7,8,9,0], buttons: {show: false, edit: false, _delete: false}}}/>
                </div>
                <div className="col col-sm-12 col-md-6 col-lg-6 py-3">
                    <h3>Recent Inspections</h3>
                    <AlternatingList {...{edit: testHandler, _delete: testHandler, dataObject: [1,2,3,4,5,6,7,8,9,0], buttons: {show: false, edit: false, _delete: false}}}/>
                </div>
            </div>
        </div>
    )
}

export default Home

const HomeNavButtons = () => {
    return(
            <>
                <div className="col-12 col-md-6 col-lg-6 my-2">
                    <a href="inspection/new" className="btn btn-primary border-dark btn-lg btn-block">New Inspection</a>
                </div>
                <div className="col-12 col-md-6 col-lg-6 my-2">
                    <a href="clients" className="btn btn-white border-dark btn-lg btn-block font-weight-bold">Manage Clients</a>
                </div>
            </>
    )
}