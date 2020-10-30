import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Spinner from '../ui_components/Spinner'
import {getInspectionById as getInspectionByIdFromDB} from '../../db/read'
import {updateInspectionById} from '../../db/write'

import capitalizeEachWord from '../../utility/capitalizeEachWord'

function InspectionHome() {
    let {id} = useParams()
    let history = useHistory()

    const [inspectionData, setInspectionData] = useState(null)

    useEffect(()=>{
        getInspectionDataOnLoad(id)
    },[])

    const getInspectionDataOnLoad = async () => {
        let inspectionDataJSON = await getInspectionByIdFromDB(id)
        setInspectionData(JSON.parse(inspectionDataJSON))
    }

    const handleUpdateOverview = async (e)=>{
        let overviewObj = {}
        let diffObj = {}

        let elements = e.target.elements
        let elementsKeys = Object.keys(elements)

        elementsKeys.map(item => {return elements[item].id})
                    .filter(item => {return item !== ''})
                    .map(item => {return {name: item, value: document.getElementById(item).value}})
                    .forEach(item => {overviewObj[item.name] = item.value})

        // let newOverview = overviewObj
        // let oldOverview = inspectionData[0].overview
        // let objKeys = Object.keys(oldOverview)

        // console.log(JSON.stringify(objKeys))
        // objKeys.forEach(item => {
        //     if(newOverview[item] !== oldOverview[item]){
        //         diffObj[item] = newOverview[item]
        //     }
        // })
        
        // console.log(JSON.stringify(diffObj))

        await updateInspectionById(id, {overview: overviewObj, last_modified: new Date()})
        // console.log('return_value: ', return_value)
        // setInspectionData(tmpInspectionData)
    }

    if(!inspectionData){
        return(
            <div className="w-100 text-center pt-5">
                <Spinner />
            </div>
            )
    } else {
        return (
            <>
                <div className="mb-5">
                    Inspection ID: {id}
                    {JSON.stringify(inspectionData[0])}
                </div>
                <div>
                    <h3>Overview</h3>
                    <div className="pt-3 container">
                        <form onSubmit={handleUpdateOverview}>
                            {Object.keys(inspectionData[0].overview).map(item => {
                                return(
                                    <div className="row" key={item}>
                                        <div className="col-sm-12 col-md-3 col-lg-3 pt-sm-0 pt-md-2 pt-lg-2 text-sm-left text-md-right">{capitalizeEachWord(item.split('_').join(' '))}</div>
                                        <div className="col-sm-12 col-md-9 col-lg-9 form-group">
                                            <input className="form-control" type="text" id={item} defaultValue={inspectionData[0].overview[item]}/>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-primary float-right">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default InspectionHome
