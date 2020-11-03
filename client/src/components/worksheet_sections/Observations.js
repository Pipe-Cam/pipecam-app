import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, useParams, useHistory} from 'react-router-dom'
import {getInspectionById} from '../../db/read'
import capitalizeEachWord from '../../utility/capitalizeEachWord'
import Spinner from '../ui_components/Spinner'

function Observations() {
    const history = useHistory()
    const {id} = useParams()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    const [accessNumber, setAccessNumber] = useState(urlParams.get('access_num'))
    const [observationQty, setObservationQty] = useState(0)

    const [inspectionData, setInspectionData] = useState(null)

    useEffect(()=>{
        console.log('inspectionId', inspectionId)
        console.log('accessNumber', accessNumber)
        setInspectionDataOnLoad(inspectionId)
    }, [])

    useEffect(()=>{
        try{
            if(inspectionData){
                let obsQty = getObservationQty(inspectionData)
                setObservationQty(obsQty)
            } else {
                throw(`inspectionData has not yet loaded`)
            }

        } catch (err) {

        }
    },[inspectionData])

    const getInspectionData = async (id) => {
        if(id){
            let inspectionJSON = await getInspectionById(id)
            return JSON.parse(inspectionJSON)[0]
        }
    }

    const setInspectionDataOnLoad = async (id) => {
        if(id){
            let inspectionObj = await getInspectionData(id)
            setInspectionData(inspectionObj)
        }
    }

    const getObservationQty = (data) => {
        try{
            if(accessNumber && data && data.access && 
               data.access[accessNumber] && data.access[accessNumber].observations && 
               JSON.stringify(data.access[accessNumber].observations) !== '[]'){
                    return(data.access[accessNumber].observations.length)
            } else {
                throw('object does not contain observation data Function(getObservationQty)')
            }
        } catch(err){
            console.log(err)
            return null
        }
    }

    const updateObservationQty = (action, num) => {
        try{
            if(typeof num !== 'number'){
                throw(`num parameter is not typeof 'number'`)
            }
            if(action !== 'set' || action !== 'increment' || action !== 'subtract'){
                throw(`a valid action parameter was not received`)
            }
            if(action === 'set'){
                setObservationQty(num)
            }
            if(action === 'increment'){
                setObservationQty(observationQty + num)
            }
            if(action === 'subtract'){
                setObservationQty()
            }
        } catch(err){
            console.log(err)
        }


    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/observations/home' exact>
                        <ObservationHome {...{inspectionId, accessNumber, inspectionData, history, observationQty}}/>
                    </Route>
                    <Route path='/observations/new' exact>
                        <ObservationNew {...{inspectionId, accessNumber}}/>
                    </Route>
                    <Route path='/observations/edit' exact>
                        <ObservationEdit {...{inspectionId, accessNumber}}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Observations


const ObservationHome = (props) => {
    // objects //
    const {inspectionId, accessNumber, inspectionData, history, observationQty} = props
    // console.log(JSON.stringify(inspectionData, null, 2))
    if(!inspectionData){
        return(
            <div className="w-100 text-center pt-5">
                <Spinner />
            </div>
        )
    } else {
        return(
                <>
                    <h2>Access #{accessNumber}</h2>
                    {/* <div>Inspection Id: {inspectionId}</div>
                    <div>Access Number: {accessNumber}</div> */}

                    <div className="border py-3 mb-5 px-sm-3 px-md-0">
                        <div className="row mb-sm-3 mb-md-0">
                            <div className="col-md-4 text-sm-left text-md-right">
                                <strong>Inspection ID: </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="text-info">{inspectionId}</span>
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
                                    Property Address: 
                                </strong>
                            </div>
                            <div className="col-md-8">
                                <span className="lead">{capitalizeEachWord(inspectionData.overview.property_address.split('_').join(' '))}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-2">
                        <div className="col-6">
                            <h3>Observation List</h3>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-primary" onClick={()=>{history.push(`/observations/new?inspection_id=${inspectionId}&access_num=1&observation_num=${observationQty}`)}}>New Observation</button>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-12">
                            <ObservationList {...{inspectionData, accessNumber}}/>
                        </div>
                    </div>

                    <div className="row bg-dark text-white">
                        <div className="col-3">
                            Inspection Data:
                        </div>
                        <div className="col-9">
                            {(JSON.stringify(inspectionData) === 'null') ? <Spinner /> : (Object.keys(inspectionData).map(item=>{return(<div className="mb-4" key={JSON.stringify(inspectionData[item])}>{item}:<br/>{JSON.stringify(inspectionData[item])}</div>)}))}
                        </div>
                    </div>
                </>
            )
    }
}

const ObservationList = (props) => {
    const {inspectionData, accessNumber} = props
    if(accessNumber && inspectionData && inspectionData.access && 
        inspectionData.access[accessNumber] && inspectionData.access[accessNumber].observations && 
        JSON.stringify(inspectionData.access[accessNumber].observations) !== '[]'){
            return(
                <div>{inspectionData.access.[accessNumber].observations.map(item=>{
                    return(<div key={item}>{JSON.stringify(item)}</div>)
                })}</div>
            )
        } else {
            return(<div className="text-center">no recorded observations</div>)
    }
}
const ObservationNew = (props) => {
    const {inspectionId, accessNumber} = props
    return(<><div>Add New Observation</div></>)
}
const ObservationEdit = (props) => {
    const {inspectionId, accessNumber} = props
    return(<><div>Edit Observation</div></>)
}





// return (
//     <div>
//         <div className="border py-3 mb-5 px-sm-3 px-md-0">
//             <div className="row mb-sm-3 mb-md-0">
//                 <div className="col-md-4 text-sm-left text-md-right">
//                     <strong>Inspection ID: </strong>
//                 </div>
//                 <div className="col-md-8">
//                     <span className="text-info">{id}</span>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-4 text-sm-left text-md-right">
//                     <strong>
//                         Status: 
//                     </strong>
//                 </div>
//                 <div className="col-md-8">
//                     <span className="text-danger">{capitalizeEachWord(inspectionData.status.split('_').join(' '))}</span>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-4 text-sm-left text-md-right">
//                     <strong>
//                         Property Address: 
//                     </strong>
//                 </div>
//                 <div className="col-md-8">
//                     <span className="lead">{capitalizeEachWord(inspectionData.overview.property_address.split('_').join(' '))}</span>
//                 </div>
//             </div>
//         </div>
//         <div className="row mb-2">
//             <div className="col-12">
//                 <Link to={`/inspection/${id}`} className="btn btn-info btn-sm float-right mt-2" name="update_inspection_details">Edit Inspection Details</Link>
//             </div>
//         </div>
//         <div className="row">
//             <div className="col-12">
//                 <Accordion defaultActiveKey="">
//                     <Card>
//                         <Card.Header>
//                             <Accordion.Toggle as={Button} variant="link" eventKey="0">
//                                 Overview
//                                 <div className="w-100">
//                                 </div>
//                             </Accordion.Toggle>
//                             <span className="float-right">
//                                 <Accordion.Toggle as={Button} variant="link" eventKey="0">
//                                     <IconCaretDown />
//                                 </Accordion.Toggle>
//                             </span>
//                         </Card.Header>
//                         <Accordion.Collapse eventKey="0">
//                             <Card.Body>
//                                 <AccordionList dataObj={inspectionData.overview}/>
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>
//                     <Card>
//                         <Card.Header>
//                         <Accordion.Toggle as={Button} variant="link" eventKey="1">
//                                 Location
//                                 <div className="w-100">
//                                 </div>
//                             </Accordion.Toggle>
//                             <span className="float-right">
//                                 <Accordion.Toggle as={Button} variant="link" eventKey="1">
//                                     <IconCaretDown />
//                                 </Accordion.Toggle>
//                             </span>
//                         </Card.Header>
//                         <Accordion.Collapse eventKey="1">
//                         <Card.Body>
//                             <AccordionList dataObj={inspectionData.location}/>
//                         </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>
//                 </Accordion>
//             </div>
//         </div>
//         <div className="row mt-5 mb-2">
//             <div className="col-6">
//                 <h3>Access List</h3>
//             </div>
//             <div className="col-6 text-right">
//                 <button className="btn btn-primary" onClick={handleRedirectToNewAccess}>New Access</button>
//             </div>
//         </div>
//         <div className="row my-5">
//             <div className="col-12">
//                 <AccessList {...{inspectionData, id, setNextAccessNumber}}/>
//             </div>
//         </div>
//     </div>
// )