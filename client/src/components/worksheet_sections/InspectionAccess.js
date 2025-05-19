import React, {useState, useEffect} from 'react'

import {Link, useParams, useHistory} from 'react-router-dom'
import {Accordion, Card, Button} from 'react-bootstrap'

import Spinner from '../ui_components/Spinner'
import IconCaretDown from '../icons/IconCaretDown'

import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'
import capitalizeEachWord from '../../utility/capitalizeEachWord'


function InspectionAccess() {
    const history = useHistory()
    const {id} = useParams()

    const [inspectionData, setInspectionData] = useState(null)
    const [nextAccessNumber, setNextAccessNumber] = useState(0)

    const getInspectionDataOnLoad = async (id) => {
        let inspectionDataJSON = await getInspectionById(id)
        let inspectionDataObj
        if (inspectionDataJSON) {
            inspectionDataObj = inspectionDataJSON
            setInspectionData(inspectionDataObj[0])
        }
        
        if(inspectionDataObj[0] && inspectionDataObj[0].access){
            let accessData = inspectionDataObj[0].access
            let accessDataKeys = Object.keys(accessData)
            setNextAccessNumber((accessDataKeys.length + 1).toString())
        } else {
            setNextAccessNumber((nextAccessNumber + 1).toString())

        }
    }

    useEffect(()=>{
        getInspectionDataOnLoad(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRedirectToNewAccess = (e) => {
        e.target.setAttribute('disabled', true)
        history.push(`/new-access/${id}?access=${nextAccessNumber}`)
    }

    const handleGoHome = async (e) => {
        let tmpInspectionData = inspectionData
        tmpInspectionData.status = "completed_inspection"

        await updateInspectionById(tmpInspectionData._id, tmpInspectionData)
        history.push('/')
    }

    if(!inspectionData){
        return(
            <div className="w-100 text-center pt-5">
                <Spinner />
            </div>
            )
    } else {
        return (
            <div>
                <div className="border py-3 mb-5 px-sm-3 px-md-0">
                    <div className="row mb-sm-3 mb-md-0">
                        <div className="col-md-4 text-sm-left text-md-right">
                            <strong>Inspection ID: </strong>
                        </div>
                        <div className="col-md-8">
                            <span className="text-info">{id}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-sm-left text-md-right">
                            <strong>
                                Status: 
                            </strong>
                        </div>
                        <div className="col-md-8">
                            <span className="text-danger">{capitalizeEachWord(inspectionData.status.split('_').join(' '))}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-sm-left text-md-right">
                            <strong>
                                Client: 
                            </strong>
                        </div>
                        <div className="col-md-8">
                            <span className="text-dark">{capitalizeEachWord(inspectionData.overview.client.split('_').join(' '))}</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 text-sm-left text-md-right">
                            <strong>
                                Property Address: 
                            </strong>
                        </div>
                        <div className="col-md-8">
                            {/* <span className="lead">{capitalizeEachWord(inspectionData.overview.property_address.split('_').join(' '))}</span> */}
                            <span className="lead">{
                                `${inspectionData.overview.property_address_street}${!inspectionData.overview.property_address_unit === '' ? (", " + inspectionData.overview.property_address_unit) : ''},
                                ${inspectionData.overview.property_address_city},
                                ${inspectionData.overview.property_address_state}
                                ${inspectionData.overview.property_address_zip}`}</span>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                        <Link to={`/inspection/${id}`} className="btn btn-info btn-sm float-right mt-2" name="update_inspection_details">Edit Inspection Details</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Accordion defaultActiveKey="">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Overview
                                        <div className="w-100">
                                        </div>
                                    </Accordion.Toggle>
                                    <span className="float-right">
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <IconCaretDown />
                                        </Accordion.Toggle>
                                    </span>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <AccordionList dataObj={inspectionData.overview}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Location
                                        <div className="w-100">
                                        </div>
                                    </Accordion.Toggle>
                                    <span className="float-right">
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            <IconCaretDown />
                                        </Accordion.Toggle>
                                    </span>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <AccordionList dataObj={inspectionData.location}/>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className="row mt-5 mb-2">
                    <div className="col-6">
                        <h3>Access List</h3>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn btn-primary" onClick={handleRedirectToNewAccess}>New Access</button>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-12">
                        <AccessList {...{inspectionData, id, setNextAccessNumber}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-right">
                        <button className="btn btn-success btn-lg shadow-lg" onClick={handleGoHome}>Complete Inspection</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default InspectionAccess


const AccordionList = (props) => {
    const {dataObj} = props

    return(
        <ul className="list-group">
            {Object.keys(dataObj).map(item => {
                return(
                    <li className="list-group-item row" key={item}>
                        <strong>{capitalizeEachWord(item.split('_').join(' '))}</strong>: {(dataObj[item] === '') ? 'N/A' : ((typeof dataObj[item] !== 'boolean') ? dataObj[item] : ((dataObj[item].toString() === 'true') ? <span className="text-success">YES</span> : <span className="text-danger">NO</span>))}
                    </li>
                )
            })}
        </ul>
    )
}

const AccessList = (props)=>{
    const {inspectionData, id/*, setNextAccessNumber*/} = props
    if(inspectionData && inspectionData.access){
        let accessData = inspectionData.access
        let accessDataKeys = Object.keys(accessData)
        return(
            <div>
                <div>{accessDataKeys.map(item => {
                    return(<div key={Math.random(9999) + item} className="py-2"><Link to={`/observations/home?inspection_id=${id}&access_num=${item}`}>Access #{item}</Link>&nbsp;&nbsp;&nbsp;<Link to={`/new-access/${id}?access=${item}`} className="btn btn-info btn-sm">EDIT</Link></div>)
                })}</div>
            </div>
        )
    } else{
        return(
            <div>
                <div>create an access...</div>
            </div>
        )
    }
}