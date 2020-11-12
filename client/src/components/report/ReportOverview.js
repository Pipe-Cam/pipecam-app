import React, {useState, useEffect} from 'react'
import IconDefectAlert from '../icons/IconDefectAlert'
import Bold from '../ui_components/Bold'
import RedItalic from '../ui_components/RedItalic'
import PipeCamLogo from '../ui_components/PipeCamLogo'
import Spinner from '../ui_components/Spinner'
import InsertVideos from '../ui_components/InsertVideos'
import InsertPhotos from '../ui_components/InsertPhotos'


import {getInspectionById} from '../../db/read'

function ReportOverview() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    const [inspectionData, setInspectionData] = useState(null)

    const getInspectionByIdOnLoad = async(id) => {
        let inspectionDataJSON = await getInspectionById(id)
        let inspectionObj;

        try{
            inspectionObj = JSON.parse(inspectionDataJSON)
            console.log(inspectionObj)
            setInspectionData(inspectionObj[0])
            console.log(inspectionData)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        // console.log(urlParams.get('inspection_id'))
        // if(urlParams.get('inspection_id')){
        //     getInspectionByIdOnLoad(urlParams.get('inspection_id'))
        // }
        getInspectionByIdOnLoad(inspectionId)
    },[inspectionId])

    useEffect(()=>{
        console.log(inspectionData)
    },[inspectionData])

    

    return (
        <> 
        <div>
            Report Overview
        </div>
        <div>
            Inspection Id: {inspectionId}
        </div>
        {/* <div>
            {inspectionData ? JSON.stringify(inspectionData) : <Spinner />}
        </div> */}
        <div>
            <ol>
                <li><PipeCamLogo {...{width: '200px'}}/></li>
                <li>
                    <h5>Date Of Inspection</h5>
                    {inspectionData ? inspectionData.overview.inspection_date : <Spinner />}
                </li>
                <li>
                    <h5>Inspection Ordered by</h5>
                    {inspectionData ? inspectionData.overview.client : <Spinner />}
                </li>
                <li>
                    <h5>Property address</h5>
                    {inspectionData ? inspectionData.overview.property_address : <Spinner />}
                </li>
                <li>
                    <h5>Inspected by</h5>
                    Jim Brooks
                </li>
                <li>
                    <h5>Video Files</h5>
                    <InsertVideos />
                </li>
                <li>
                    <h5>Certificate of Completion/ Root Cut Warranty</h5>
                </li>
                <li>
                    <h5>Opening Notes</h5>
                </li>
                <li>
                    <h5>Guidelines for Proper Use Of the Line</h5>
                </li>
                <li>
                    <h5>Conclusions of Serviceability</h5>
                </li>
                <li>
                    <h5>Recommendations</h5>
                </li>
                <li>
                    <h5>Areas of Concern Downstream Toward the Municipal Sewer Main</h5>
                    <InsertPhotos />
                </li>
                <li>
                    <h5>Areas of Concern Upstream Toward the Residence</h5>
                    <InsertPhotos />

                </li>
                <li>
                    <h5>Description of Sewer Line</h5>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Sewer Access 1</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, iste?
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Sewer Access 2</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, labore!
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Backwater Overflow Device</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                None  /  Mushroom cap   /    Sewer popper   /    Relief Valve
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Length of lateral Inspected</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                (in feet)
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Distance from cleanout to sewer main</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                (in feet)
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Estimated length of uninspected lateral</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                Any pipe upstream of 1-way cleanout, length and condition unknown
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Pipe Material (s)</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                Vitrified clay     /   Cast iron    /    ABS, PVC    /    Asbestos cement  /   Orangeburg        /     Ductile iron  /   HDPE
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border py-3">
                                <Bold>Occupancy</Bold>
                            </div>
                            <div className="col-8 border py-3">
                                Occupied / Vacant
                            </div>
                        </div>
                </li>
                <li>
                    <h5>Summary of Scope and Limitations of this Inspection</h5>
                    <ul>
                        <li>
                            This inspection examines the visual condition of the interior condition of the sewer lateral <u>at the time of the inspection</u>. 
                            The purpose of this inspection is to evaluate serviceability which is defined as the line’s likelihood to convey waste to its end point. 
                            It does not determine the watertight integrity of the line nor does it provide information regarding the path and depth of the sewer lateral. 
                            Pipe Cam, Inc. in no way warrants the performance, installation, materials, code compliance, longevity or watertight integrity of the sewer lateral. 
                            This inspection is not intended to comply with any requirements that a given Sanitary District may have for the purpose of certifying a sewer lateral 
                            as those criteria are dictated by and vary with each District.
                        </li>
                        <li>
                        Roots, minor pipe defects and joint misalignments are common in homes that were built in the early 1970’s and before and are still equipped with the 
                        original sewer line.  Minor joint misalignments are common in lines of any age, especially at material transitions and turns.  
                        
                        <span className="text-info"> Many properties are equipped with cast iron sewer cleanouts and/or laterals. Cast iron is known to develop small or “pin” holes over time. </span>

                        There is currently no method by which these holes can be identified by a visual inspection and are therefore excluded from the scope of this inspection. 
                        No other pipe systems such as drainage or interior waste lines were inspected at this time as they are outside the scope of this inspection.
                        </li>
                        <li>
                            <span className="text-info">When we estimate the time that small roots should be reinspected, this is an estimate only and we cannot take responsibility for faster or slower root growth than estimated.  Different species of vegetation differ vastly in regrowth rates of roots and we are not, nor do we intend to convey, that we are experts in this area.</span>
                            <pre>Use only if we wait and recommend to cut roots down the road. Remove if no roots or we recommend an immediate root cutting or a certification to repair</pre>
                        </li>
                        <li>
                            <span className="text-info">Regarding lines with areas of standing water caused by sags, please be aware that the as codes become more stringent over time, the original grade of the pipe when the line was installed may not meet current code and may not necessarily be remedied by regrading and in extreme cases, may require the installation of an ejector pump.</span>
                            <pre>If standing water</pre>
                        </li>
                        <li>
                            <RedItalic>
                                Permit histories and other information about the sewer lateral are occasionally provided as a courtesy and we make no warranty regarding the accuracy or 
                                completeness of the permit(s) or related information.  Providing information regarding the path and location of the sewer lateral are outside of the scope 
                                of this inspection and are excluded.  Any such information that may be provided does not constitute a disclosure nor does it ever serve as a substitute for 
                                your own due diligence. We strongly encourage buyers to research property histories to their satisfaction.
                            </RedItalic>
                        </li>
                    </ul>
                </li>
                <li>
                    <h5>Definitions & Explanation of Conclusions</h5>
                    <ul>
                        <li>
                            <RedItalic>The performance of any sewer lateral is highly dependent upon the manner in which it is used by the occupants.  
                            Therefore, even a Serviceable lateral can still experience backups if proper use guidelines are not followed.</RedItalic>
                        </li>
                        <li>
                            <Bold>Sewer cleanout:</Bold> The is the name of the fitting that allows access into the sewer line.  
                            This term is often confused with a cleaning of the line.  A sewer cleanout can be 1-way that allows access in only one direction which is usually downstream. 
                            A 2-way cleanout allows access both upstream and downstream and is far less common than a 1-way sewer cleanout.
                        </li>      
                        <li>
                            <Bold>Area of Concern:</Bold> This is an item or defect not properly installed or has developed over time that is notable and may or may not require repair 
                            that is identified with <IconDefectAlert />
                        </li>
                        <li>
                            <Bold>Serviceable:</Bold> This lateral performs as it was designed and effectively conveys water to the end point of the line.  
                            Although waste is not introduced into the line as a course of this inspection, it is expected to convey to the lateral’s end point as designed. 
                        </li>  
                        <li>
                            <Bold>Serviceable With Maintenance Requirements:</Bold> This lateral performs as designed for the most part and has defects that require maintenance, 
                            the timeline of which are noted in the recommendations section of this report. The defects may or may not immediately affect the performance of the lateral. 	
                        </li>
                        <li>
                            <Bold>Partially Serviceable:</Bold> This lateral has defects that are likely to prevent the line from fully operating as designed and is unlikely to 
                            convey waste effectively to its end point.  
                            <RedItalic> A <Bold>Partially Serviceable</Bold> lateral is likely to require immediate maintenance or a repair in order to convey waste properly.</RedItalic>
                        </li>    
                        <li>
                            <Bold>Not Serviceable:</Bold> This lateral has defects that are prevent the line from fully operating as designed and is unable to convey waste to its end point.
                            <RedItalic> A <Bold>Not Serviceable</Bold> lateral will require immediate maintenance, repair or replacement in order to convey waste at all.</RedItalic>
                        </li>
                        <li>
                            <Bold>Flow line:</Bold> The bottom third of the interior of the pipe where the waste and water travel.
                        </li>
                        <li>
                            <Bold>Downstream:</Bold> When the camera is travelling from the access point downstream toward the municipal sewer main or manhole.
                        </li>
                        <li>
                            <Bold>Upstream:</Bold> When the camera is travelling from the access point upstream toward the residence or structure.
                        </li>
                        <li>
                            <Bold>Lower Lateral:</Bold> This is usually the portion of the line that extends from the property line to the connection to the municipal sewer main or manhole. 
                            This portion of the line is installed when the infrastructure for the development is constructed and connects to the upper lateral. 
                            This connection commonly experiences a joint defect as the two sections consist of different materials usually installed at different times.
                        </li>
                        <li>
                            <Bold>Upper Lateral:</Bold> This is usually the portion of the line that extends from the residence to the property line. 
                            This portion of the line is installed when the residence is constructed and connects to the lower lateral.
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
        </>
    )
}

export default ReportOverview
