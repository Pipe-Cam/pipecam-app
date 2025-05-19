import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import AlternatingList from '../components/ui_components/AlternatingList'
import {getScheduledInspections as getScheduledInspectionsFromDB, getRecentInspections as getRecentInspectionsFromDB} from '../db/read.js'
import ActiveContext from '../context/ActiveContext'

function Home() {
    const [scheduledInspectionsFromDB, setScheduledInspectionsFromDB] = useState(null)
    const [recentInspectionsFromDB, setRecentInspectionsFromDB] = useState(null)
    // eslint-disable-next-line
    const {activeClientId, setActiveClientId} = useContext(ActiveContext)

    const getInspectionsOnLoad = async () => {
        let scheduledInspections = await getScheduledInspectionsFromDB()
        let recentInspections = await getRecentInspectionsFromDB()

        setScheduledInspectionsFromDB(scheduledInspections)
        setRecentInspectionsFromDB(recentInspections)
    }

    useEffect(()=>{
        getInspectionsOnLoad()
    }, [])


    const handleEditInspection = () => {
        console.log('handleEditInspection')
    }

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
                                    value: `${item.overview.property_address_street} ${item.overview.property_address_city}, ${item.overview.property_address_state} [${new Date(item.overview.inspection_date).getMonth() + 1}/${new Date(item.overview.inspection_date).getDate()}/${new Date(item.overview.inspection_date).getFullYear()}]`,
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
                                    value: `${item.overview.property_address_street} ${item.overview.property_address_city}, ${item.overview.property_address_state} [${(item.status === 'active_inspection') ? ('active') : ('completed')}]`,
                                    _id: item._id,
                                    invocationValue: item._id,
                                    pathname: 'report',
                                    method_key: 'inspection_id',
                                    method_value: 'query_string'
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
                    <Link to="/inspection/new" className="btn btn-primary border-dark btn-lg btn-block">New Inspection</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-6 my-2">
                    <Link to="/clients" className="btn btn-white border-dark btn-lg btn-block font-weight-bold">Manage Clients</Link>
                </div>
            </>
    )
}