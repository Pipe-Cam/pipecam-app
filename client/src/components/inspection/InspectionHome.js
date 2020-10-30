import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Spinner from '../ui_components/Spinner'
import {getInspectionById as getInspectionByIdFromDB} from '../../db/read'

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
                    Client ID: {id}
                </div>
                <div>
                    <h3>Overview</h3>
                    <div className="pt-3">
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
                    </div>
                </div>
            </>
        )
    }
}

export default InspectionHome
