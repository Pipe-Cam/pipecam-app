import React, {useState, useEffect, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Spinner from '../ui_components/Spinner'
import InspectionLocation from '../worksheet_sections/InspectionLocation'
import {getInspectionById as getInspectionByIdFromDB} from '../../db/read'
import {updateInspectionById} from '../../db/write'

import capitalizeEachWord from '../../utility/capitalizeEachWord'

function InspectionHome() {
    var {id} = useParams()
    let history = useHistory()

    const [inspectionData, setInspectionData] = useState(null)
    // const [reloadSpinner, setReloadSpinner] = useState(0)
    const [locationData, setLocationData] = useState({
        "occupancy": "",
        "outbuilding": "",
        "outbuilding_has_plumbing": "",
        "outbuilding_has_cleanout": "",
        "outbuilding_pipe_diameter": "",
        "cccusd": "",
        "cccusd_unpermitted_work": "",
        "opening_observations": "",
        "usb_num": ""
    })
    const locationFormRef = useRef(null)

    useEffect(()=>{
        getInspectionData(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getInspectionData = async (id) => {
        let inspectionDataJSON = await getInspectionByIdFromDB(id)
        if(inspectionDataJSON){
            setInspectionData(JSON.parse(inspectionDataJSON)[0])
        }
    }

    const handleUpdateOverview = async (e)=>{
        e.preventDefault()
        let overviewObj = {}

        let elements = e.target.elements
        let elementsKeys = Object.keys(elements)

        elementsKeys.map(item => {return elements[item].id})
                    .filter(item => {return item !== ''})
                    .map(item => {return {name: item, value: document.getElementById(item).value}})
                    .forEach(item => {overviewObj[item.name] = item.value})

        await updateInspectionById(id, {overview: overviewObj, last_modified: new Date()})
    }
    
    const handleUpdateLocation = async (e)=>{
        e.preventDefault()
        console.log('handleUpdateLocation: ', JSON.stringify(locationData))
        // await updateInspectionById(id, {location: locationData, last_modified: new Date(), status: 'active_inspection'})
        await updateInspectionById(id, {location: locationData, last_modified: new Date()})
        history.push(`/access/${id}`)
        window.location.reload()
    }


    if(!inspectionData){
        return(
            <div className="w-100 text-center pt-5">
                <Spinner/>
            </div>
            )
    } else {
        return (
            <>
                <div className="mt-3 py-3 px-5 border bg-foreground">
                    {/* <div className="mb-5">
                        Inspection ID: {id}
                        {JSON.stringify(inspectionData[0])}
                    </div> */}
                    <div>
                        <h3>Overview</h3>
                        <div className="pt-3 container">
                            <form onSubmit={handleUpdateOverview}>
                                {Object.keys(inspectionData.overview).map(item => {
                                    // eslint-disable-next-line
                                    let disabledAttribute = ''
                                    if(item === 'client'){
                                        disabledAttribute = 'disabled'
                                    }
                                    return(
                                        <div className="row" key={item}>
                                            <div className="col-sm-12 col-md-3 col-lg-3 pt-sm-0 pt-md-2 pt-lg-2 text-sm-left text-md-right">{capitalizeEachWord(item.split('_').join(' '))}</div>
                                            <div className="col-sm-12 col-md-9 col-lg-9 form-group">
                                                <input className="form-control" type="text" id={item} defaultValue={inspectionData.overview[item]} disabled={(item === 'client') ? ('disabled') : ('')}/>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-info float-right">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mt-3 py-3 px-5 border bg-foreground">
                    <form ref={locationFormRef} onSubmit={handleUpdateLocation}>
                        <div className="row">
                            <div className="col-12">
                                <InspectionLocation {...{inspectionData, locationData, setLocationData}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-primary float-right" type="submit" id="submitButton">Next</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default InspectionHome