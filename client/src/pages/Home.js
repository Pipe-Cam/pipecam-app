import React, {useState, useEffect, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import AlternatingList from '../components/ui_components/AlternatingList'
import {getScheduledInspections as getScheduledInspectionsFromDB, getRecentInspections as getRecentInspectionsFromDB} from '../db/read.js'
import ActiveContext from '../context/ActiveContext'

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
    const {activeClientId, setActiveClientId} = useContext(ActiveContext)

    const getInspectionsOnLoad = async () => {
        let scheduledInspections = await getScheduledInspectionsFromDB()
        let recentInspections = await getRecentInspectionsFromDB()

        setScheduledInspectionsFromDB(JSON.parse(scheduledInspections))
        setRecentInspectionsFromDB(JSON.parse(recentInspections))
    }

    const history = useHistory()

    useEffect(()=>{
        getInspectionsOnLoad()
    }, [])


    const handleEditInspection = () => {
        console.log('handleEditInspection')
    }
    // let {listTitle, dataObject, edit, _delete} = props

    const handleAssignActiveClient = (clientId) => {
        setActiveClientId(clientId)
    }

    return (
        <div className="container py-3 justify-content-center">
            <div className="row justify-content-center">
                <HomeNavButtons />
            </div>
            <div className="row my-5">
                <div className="col col-sm-12 col-md-6 col-lg-6 py-3">
                    <h3 className="text-center">Scheduled Inspections</h3>
                    {(!scheduledInspectionsFromDB || (JSON.stringify(scheduledInspectionsFromDB) === '[]')) ? (<div className="text-center">no scheduled inspections</div>): (                    < AlternatingList {
                        ...{
                            dataObject: (scheduledInspectionsFromDB.map(item => {
                                return {
                                    value: `${item.overview.client} [${new Date(item.overview.inspection_date).getMonth() + 1}/${new Date(item.overview.inspection_date).getDate()}/${new Date(item.overview.inspection_date).getFullYear()}]`,
                                    _id: item._id,
                                    invocationValue: item._id,
                                    pathname: `/inspection`
                                }
                            })),
                            edit: handleEditInspection,
                            _delete: null,
                            invocation: handleAssignActiveClient,
                            buttons: {
                                show: true,
                                edit: true,
                                _delete: false
                            }
                        }
                    }
                    />)}


                </div>
                <div className="col col-sm-12 col-md-6 col-lg-6 py-3">
                    <h3 className="text-center">Recent Inspections</h3>
                    {(!recentInspectionsFromDB || (JSON.stringify(recentInspectionsFromDB) === '[]')) ? (<div className="text-center">no recent inspections</div>) : (< AlternatingList {
                        ...{
                            dataObject: (recentInspectionsFromDB.map(item => {
                                return {
                                    value: `${item.overview.client} [${(item.status === 'active_inspection') ? ('active') : ('completed')}]`,
                                    _id: item._id,
                                    invocationValue: item.client_id
                                }
                            })),
                            edit: handleEditInspection,
                            _delete: null,
                            invocation: () => {},
                            buttons: {
                                show: true,
                                edit: true,
                                _delete: false
                            }
                        }
                    }
                    />)}
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
                    {/* <a href="/inspection/new" className="btn btn-primary border-dark btn-lg btn-block">New Inspection</a> */}
                    <Link to="/inspection/new" className="btn btn-primary border-dark btn-lg btn-block">New Inspection</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-6 my-2">
                    {/* <a href="clients" className="btn btn-white border-dark btn-lg btn-block font-weight-bold">Manage Clients</a> */}
                    <Link to="/clients" className="btn btn-white border-dark btn-lg btn-block font-weight-bold">Manage Clients</Link>
                </div>
            </>
    )
}