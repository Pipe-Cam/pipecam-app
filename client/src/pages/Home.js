import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlternatingList from '../components/ui_components/AlternatingList'
import {getScheduledInspections as getScheduledInspectionsFromDB, getRecentInspections as getRecentInspectionsFromDB} from '../db/read.js'

const formatDate = (dateStr) => {
    let date = new Date(dateStr)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()

    // console.log(month)
    // console.log(day)
    // console.log(year)

    console.log(`${month}/${day}/${year}`)

    return dateStr
}

function Home() {
    const [scheduledInspectionsFromDB, setScheduledInspectionsFromDB] = useState(null)
    const [recentInspectionsFromDB, setRecentInspectionsFromDB] = useState(null)

    const getInspectionsOnLoad = async () => {
        let scheduledInspections = await getScheduledInspectionsFromDB()
        let recentInspections = await getRecentInspectionsFromDB()

        setScheduledInspectionsFromDB(JSON.parse(scheduledInspections))
        setRecentInspectionsFromDB(JSON.parse(recentInspections))
    }

    useEffect(()=>{
        getInspectionsOnLoad()
    }, [])


    const handleEditInspection = () => {
        console.log('handleEditInspection')
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
                    <AlternatingList {...{dataObject: ((!scheduledInspectionsFromDB)? ([]) : (scheduledInspectionsFromDB.map(item => { return {value: `${item.overview.client} [${new Date(item.overview.inspection_date).getMonth() + 1}/${new Date(item.overview.inspection_date).getDate()}/${new Date(item.overview.inspection_date).getFullYear()}]`, _id: item._id}}))), edit: handleEditInspection, _delete: null, invocation: handleEditInspection, buttons: {show: true, edit: true, _delete: false}}}/>

                </div>
                <div className="col col-sm-12 col-md-6 col-lg-6 py-3">
                    <h3>Recent Inspections</h3>
                    <AlternatingList {...{dataObject: ((!recentInspectionsFromDB)? ([]) : (recentInspectionsFromDB.map(item => { return {value: `${item.overview.client} [${(item.status === 'active_inspection') ? ('active') : ('completed')}]`, _id: item._id}}))), edit: handleEditInspection, _delete: null, buttons: {show: true, edit: true, _delete: false}}}/>

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