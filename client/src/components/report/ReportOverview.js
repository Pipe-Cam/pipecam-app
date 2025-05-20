import React, {useState, useEffect} from 'react'
import IconDefectAlert from '../icons/IconDefectAlert'
import Bold from '../ui_components/Bold'
import RedItalic from '../ui_components/RedItalic'
import PipeCamLogo from '../ui_components/PipeCamLogo'
import Spinner from '../ui_components/Spinner'
import InsertVideos from '../ui_components/InsertVideos'
import InsertPhotos from '../ui_components/InsertPhotos'
import DisplayPhotos from '../ui_components/DisplayPhotos'

import RootCutWarranty from './opening_notes/RootCutWarranty'
import Bopd from './opening_notes/Bopd'
import CityNotes from './opening_notes/CityNotes'
import Access from './opening_notes/Access'
import UpperLateralCities from './opening_notes/UpperLateralCities'
import AdditionalScenarios from './opening_notes/AdditionalScenarios'
import Serviceability from './Serviceability'

import PipeMaterials from './description/PipeMaterials'
import BopdType from './description/BopdType'

import {getInspectionById} from '../../db/read'
import {monthNumberToName} from '../../utility/date' 

const _ = require('lodash');

function ReportOverview() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    // eslint-disable-next-line
    const [inspectionId, setInspectionId] = useState(urlParams.get('inspection_id'))
    const [inspectionData, setInspectionData] = useState(null)
    const [plusOneYear, setPlusOneYear] = useState(null)

<<<<<<< HEAD
    const getInspectionByIdOnLoad = async(id) => {
        let inspectionData = await getInspectionById(id)
        let inspectionObj;

        try{
            inspectionObj = inspectionData
=======
    const getInspectionByIdOnLoad = async (id) => {
        let inspectionDataJSON = await getInspectionById(id)
        let inspectionObj

        try {
            inspectionObj = inspectionDataJSON
>>>>>>> origin/master
            console.log(inspectionObj[0])
            setInspectionData(inspectionObj[0])
            console.log(inspectionData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSetDateEndOfWarranty = () => {
        if(inspectionData){
            let inspectionDate = new Date(inspectionData.overview.inspection_date)
            let year = inspectionDate.getFullYear()
            let month = inspectionDate.getMonth() + 1
            let monthName = monthNumberToName(month)
            let day = inspectionDate.getDate()

            let dateString = `${monthName} ${day}, ${year + 1}`
            setPlusOneYear(dateString)
        }
    }

    const handleFormatDate = (dateStr) => {
        let dateObj = new Date(dateStr)
        let year = dateObj.getFullYear()
        let month = dateObj.getMonth() + 1
        let monthName = monthNumberToName(month)
        let day = dateObj.getDate()

        return `${monthName} ${day}, ${year}`
    }
    
    useEffect(()=>{
        getInspectionByIdOnLoad(inspectionId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inspectionId])

    useEffect(()=>{
        handleSetDateEndOfWarranty()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inspectionData])

    

    return (
        <> 
        {/* .row.mb-4>.col-12 */}
        {/* <div>
            Inspection Id: {inspectionId}
        </div> */}
        <div className="row">
            <div className="col-12">
                <PipeCamLogo {...{width: '450px'}}/>
            </div>
        </div>
        <div className="ml-5">   
            <div className="row">
                <div className="col-12 h3 font-weight-light" style={{textShadow: "1.5px 1.5px 1px gray"}}>
                    Residential Sewer Inspection Report
                </div>
            </div>
            <div className="row">
                <div className="col-12 lead">
                    <span>Date Of Inspection</span>: <span>{inspectionData ? handleFormatDate(inspectionData.overview.inspection_date) : <Spinner />}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 lead">
                    <span>Inspection Ordered by</span>: <span>{inspectionData ? inspectionData.overview.client : <Spinner />}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 lead">
                    <span>Property address</span>: <span>{inspectionData ? inspectionData.overview.property_address : <Spinner />}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 lead">
                    <span>Inspected by</span>: <span>Jim Brooks</span>
                </div>
            </div>
        </div>
        <div className="ml-5 mt-3">

            <SectionTitle>LINK TO VIDEO FILES</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <InsertVideos />
                </div>
            </div>
                
            <SectionTitle>Certificate of Completion/ Root Cut Warranty</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <RootCutWarranty {...{plusOneYear}}/>
                </div>
            </div>


            <SectionTitle>Opening Notes</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <CityNotes city="livermore_ca"/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12 text-success">
                    The purpose of this inspection is to evaluate serviceability which is defined as the line’s likelihood to convey waste to its end point. 
                    Occasionally, we will address an issue outside the sewer line if it is germane to the inspection.  
                    Whenever possible, the inspector will introduce water by flushing toilets inside the residence and observe the water travel past the camera.  
                    It is important to understand that by introducing water, it is impossible to replicate the effects of waste and the line will perform differently when occupied.  
                    The performance of a sewer line is greatly affected by the way in which it is used by the occupants.  
                    You are selling or purchasing a preexisting property with a preexisting sewer system. 
                    This means that we are likely to find imperfections, many of which often do not require repair.  
                    Sewer laterals usually require some level of maintenance.  	
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <UpperLateralCities />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12 text-success">
                    The inspections are quality checked by a technically competent administrator.  On occasion, the conclusions in the report may differ from that of the 
                    inspector and his narration if additional items are noted when the video is reviewed.  In the event of a conflict of information, the information on the 
                    report will prevail.	
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <Access type="one_way" />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <Access type="two_way" />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <Bopd jurisdiction="none"/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <Bopd jurisdiction="central_san"/>
                </div>
            </div>

            <AdditionalScenarios scenario={[
                                'push_to_main',
                                'mushroom_buried',
                                'three_inch_access',
                                'break_in_access'
                                ]}/>

            <SectionTitle>Guidelines for Proper Use Of the Line</SectionTitle>
            
            <div className="row mb-4">
                <div className="col-12 text-success">
                    In order to receive the best possible service from your sewer line it is important to use the line properly. This means that only organic human waste, 
                    toilet tissue and minimal food scraps from the garbage disposal through the kitchen sink should be introduced into the line.&nbsp;
                    <RedItalic>Cooking grease, grout, paint or any other construction debris should never be disposed of into the residence’s waste system 
                    because of their tendency to accumulate in the line. Heavy or improper use of the garbage disposal can cause an accumulation of debris 
                    that can adversely affect the performance of the sewer lateral and/or waste lines.  The introduction of any other materials, including but not 
                    limited to, “flushable” cleaning products or wipes as well as paper towels and feminine or contraceptive products should be strictly avoided.</RedItalic>
                </div>
            </div>

            <SectionTitle>Conclusions of Serviceability</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <Serviceability conclusion=""/>
                    conclusions go here
                </div>
            </div>

            <SectionTitle>Recommendations</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    recommendations go here
                </div>
            </div>


            <SectionTitle>Areas of Concern Downstream Toward the Municipal Sewer Main</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <InsertPhotos />
                </div>
            </div>

            <SectionTitle>Areas of Concern Upstream Toward the Residence</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    <InsertPhotos />
                    <DisplayPhotos />
                </div>
            </div>

            <SectionTitle>Description of Sewer Line</SectionTitle>
            <div className="row mb-4 pl-3">
                <div className="col-12">
                    {inspectionData ? (<SewerAccess accessData={inspectionData.access}/>) : <Spinner />}
                    
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Backwater Overflow Device</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            {/* {inspectionData ? (JSON.stringify(inspectionData.access)) : <Spinner />} */}
                            {inspectionData ? (<BopdType accessData={inspectionData.access}/>) : <Spinner />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Length of lateral Inspected</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            {inspectionData ? (<InspectedLateralLength data={inspectionData} />) : <Spinner />}
                            
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Distance from cleanout to sewer main</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            TODO: (in feet)
                            {/* {inspectionData ? () : <Spinner />} */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Estimated length of uninspected lateral</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            
                            {inspectionData ? (<UninspectedLateral data={inspectionData}/>) : <Spinner />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Pipe Material (s)</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            {/* Vitrified clay / Cast iron / ABS, PVC / Asbestos cement  / Orangeburg / Ductile iron / HDPE */}
                            
                            {inspectionData ? (<PipeMaterials material={['ci', 'vcp', 'abs']}/>) : <Spinner />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 border py-3">
                            <Bold>Occupancy</Bold>
                        </div>
                        <div className="col-8 border py-3">
                            {inspectionData ? _.capitalize(inspectionData.location.occupancy) : <Spinner />}
                        </div>
                    </div>
                </div>
            </div>

            <SectionTitle>Summary of Scope and Limitations of this Inspection</SectionTitle>
            <div className="row mb-4">
                <div className="col-12">
                    This inspection examines the visual condition of the interior condition of the sewer lateral <u>at the time of the inspection</u>. 
                    The purpose of this inspection is to evaluate serviceability which is defined as the line’s likelihood to convey waste to its end point. 
                    It does not determine the watertight integrity of the line nor does it provide information regarding the path and depth of the sewer lateral. 
                    Pipe Cam, Inc. in no way warrants the performance, installation, materials, code compliance, longevity or watertight integrity of the sewer lateral. 
                    This inspection is not intended to comply with any requirements that a given Sanitary District may have for the purpose of certifying a sewer lateral 
                    as those criteria are dictated by and vary with each District.
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    Roots, minor pipe defects and joint misalignments are common in homes that were built in the early 1970’s and before and are still equipped with the 
                    original sewer line.  Minor joint misalignments are common in lines of any age, especially at material transitions and turns.  
                    
                    <span className="text-info"> Many properties are equipped with cast iron sewer cleanouts and/or laterals. Cast iron is known to develop small or “pin” holes over time. </span>

                    There is currently no method by which these holes can be identified by a visual inspection and are therefore excluded from the scope of this inspection. 
                    No other pipe systems such as drainage or interior waste lines were inspected at this time as they are outside the scope of this inspection.
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <span className="text-info">When we estimate the time that small roots should be reinspected, this is an estimate only and we cannot take responsibility for faster or slower root growth than estimated.  Different species of vegetation differ vastly in regrowth rates of roots and we are not, nor do we intend to convey, that we are experts in this area.</span>
                    <pre>Use only if we wait and recommend to cut roots down the road. Remove if no roots or we recommend an immediate root cutting or a certification to repair</pre>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <span className="text-info">Regarding lines with areas of standing water caused by sags, please be aware that the as codes become more stringent over time, the original grade of the pipe when the line was installed may not meet current code and may not necessarily be remedied by regrading and in extreme cases, may require the installation of an ejector pump.</span>
                    <pre>If standing water</pre>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <RedItalic>
                        Permit histories and other information about the sewer lateral are occasionally provided as a courtesy and we make no warranty regarding the accuracy or 
                        completeness of the permit(s) or related information.  Providing information regarding the path and location of the sewer lateral are outside of the scope 
                        of this inspection and are excluded.  Any such information that may be provided does not constitute a disclosure nor does it ever serve as a substitute for 
                        your own due diligence. We strongly encourage buyers to research property histories to their satisfaction.
                    </RedItalic>
                </div>
            </div>

            <SectionTitle>Definitions & Explanation of Conclusions</SectionTitle>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <RedItalic>The performance of any sewer lateral is highly dependent upon the manner in which it is used by the occupants.  
                    Therefore, even a Serviceable lateral can still experience backups if proper use guidelines are not followed.</RedItalic>
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Sewer cleanout:</Bold> The is the name of the fitting that allows access into the sewer line.  
                    This term is often confused with a cleaning of the line.  A sewer cleanout can be 1-way that allows access in only one direction which is usually downstream. 
                    A 2-way cleanout allows access both upstream and downstream and is far less common than a 1-way sewer cleanout.
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Area of Concern:</Bold> This is an item or defect not properly installed or has developed over time that is notable and may or may not require repair 
                    that is identified with <IconDefectAlert />
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Serviceable:</Bold> This lateral performs as it was designed and effectively conveys water to the end point of the line.  
                    Although waste is not introduced into the line as a course of this inspection, it is expected to convey to the lateral’s end point as designed. 
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Serviceable With Maintenance Requirements:</Bold> This lateral performs as designed for the most part and has defects that require maintenance, 
                    the timeline of which are noted in the recommendations section of this report. The defects may or may not immediately affect the performance of the lateral. 	
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Partially Serviceable:</Bold> This lateral has defects that are likely to prevent the line from fully operating as designed and is unlikely to 
                    convey waste effectively to its end point.  
                    <RedItalic> A <Bold>Partially Serviceable</Bold> lateral is likely to require immediate maintenance or a repair in order to convey waste properly.</RedItalic>
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Not Serviceable:</Bold> This lateral has defects that are prevent the line from fully operating as designed and is unable to convey waste to its end point.
                    <RedItalic> A <Bold>Not Serviceable</Bold> lateral will require immediate maintenance, repair or replacement in order to convey waste at all.</RedItalic>
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Flow line:</Bold> The bottom third of the interior of the pipe where the waste and water travel.
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Downstream:</Bold> When the camera is travelling from the access point downstream toward the municipal sewer main or manhole.
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Upstream:</Bold> When the camera is travelling from the access point upstream toward the residence or structure.
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Lower Lateral:</Bold> This is usually the portion of the line that extends from the property line to the connection to the municipal sewer main or manhole. 
                    This portion of the line is installed when the infrastructure for the development is constructed and connects to the upper lateral. 
                    This connection commonly experiences a joint defect as the two sections consist of different materials usually installed at different times.
                </div>
            </div>
            <div className="row mb-4 text-success">
                <div className="col-12">
                    <Bold>Upper Lateral:</Bold> This is usually the portion of the line that extends from the residence to the property line. 
                    This portion of the line is installed when the residence is constructed and connects to the lower lateral.
                </div>
            </div>
            <ReportPageFooter />
        </div>
        </>
    )
}

export default ReportOverview


const SectionTitle = (props) => {
    return(
        <>
            <div className="row ml-0 mb-4" style={{color: '#000099', borderBottom: '1px solid #000099'}}>
                <div className="col-12">
                    <span className="text-uppercase" style={{marginLeft: '-14px'}}>{props.children}</span>
                </div>
            </div>
        </>
    )
}

const ReportPageFooter = () => {
    return(
        <>
        <div className="row justify-content-center font-weight-light">
            <div className="col-auto">
                <a href="mailto:info@pipecaminc.com">info@pipecaminc.com</a>
            </div>
            <div className="col-auto">
                 <a href="tel:+19253717500" className="text-dark">P: 925.371.7500</a>
            </div>
            <div className="col-auto">
                CSLB License # 838101
            </div>
            <div className="col-auto">
                <a href="https://www.pipecaminc.com/">www.pipecaminc.com</a>
            </div>
        </div>
        </>
    )
}

const SewerAccess = (props) => {
    const data = props.accessData
    try{
        const dataKeys = Object.keys(data)
    
        return(
            <>
    
                {dataKeys.map(item => {
                    return(
                            <div className="row">
                                <div className="col-4 border py-3">
                                    <Bold>Sewer Access #{item}</Bold>
                                </div>
                                <div className="col-8 border py-3">
                                    {data[item] ? (<SewerAccessBlurb details={data[item].details} location={data[item].location}/>) : <Spinner />}
                                </div>
                            </div>
                    )
                })}
            </>
        )
    } catch(err){
        return(<>data unavailable</>)
    }
}

const SewerAccessBlurb = (props) => {
    const {location, details} = props
    console.log(location, details)
    return(
        <>  
            {/* {JSON.stringify(data.details)} */}
            <div>{details.pipe_diameter.toString()}" {<Rosetta>{details.direction}</Rosetta>} {<Rosetta>{details.access_material}</Rosetta>} cleanout</div>
            <br/>
            <div>
                Located:
                <ul>
                    {
                        (location.location_position_front ||
                        location.location_position_back ||
                        location.location_position_left ||
                        location.location_position_right ||
                        location.location_position_modifier_of_residence ||
                        location.location_position_modifier_corner ||
                        location.location_position_modifier_under_window ||
                        location.location_position_modifier_in ||
                        location.location_position_modifier_under_deck ||
                        location.location_position_modifier_manual) ? (<li><AccessLocationPosition location={location}/></li>) : ''
                    }

                    {location.location ? <li><Rosetta pre="at the" post="">{location.location}</Rosetta></li> : ''}
                    {location.entry ? <li><Rosetta pre="to the" post="of the front entry">{location.entry}</Rosetta></li> : ''}
                    {location.porch ? <li><Rosetta pre="to the" post="of the porch">{location.porch}</Rosetta></li> : ''}
                    {location.walk ? <li><Rosetta pre="to the" post="of the walk">{location.walk}</Rosetta></li> : ''}
                </ul>
            </div>











            {/* to the right of the front entry porch 
            at the rear of the residence 
            at the foundation edge 
            beneath a bathroom bedroom office window living room kitchen window 
            at the edge of the porch 
            in the landscape area 
            near the water supply 
            beneath the deck behind 
            the fence 
            air conditioning unit. */}
        </>
    )
}

const Rosetta = (props) => {
    var pre = props.pre;
    var post = props.post;

    if(pre === undefined){
        pre = ''
    }
    if(post === undefined){
        post = ''
    }

    switch(props.children){
        case 'one_way':
            return ` ${pre} One-Way ${post}`
        case 'two_way':
            return` ${pre} Two-Way ${post}`
        case 'ci':
            return ` ${pre} Cast Iron ${post}`
        case 'ac':
            return ` ${pre} Asbestos Cement ${post}`
        case 'abs':
            return ` ${pre} ABS ${post}`
        case 'pvc':
            return ` ${pre} PVC ${post}`
        case 'vcp':
            return ` ${pre} VCP (Vitrified Clay Pipe) ${post}`
        case 'orbg':
            return ` ${pre} Orangeburg ${post}`
        case 'hdpe':
            return ` ${pre} HDPE (High-Density Polyethylene) ${post}`
        case 'stub':
            return ` ${pre} Stub ${post}`
        case 'break_in':
            return ` ${pre} Break-In ${post}`
        case 'roof':
            return ` ${pre} Roof ${post}`
        case 'below_grade':
            return ` ${pre} Below Grade ${post}`
        case 'excess_vegetation':
            return ` ${pre} Excess Vegetation ${post}`
        case 'broken':
            return ` ${pre} Broken ${post}`
        case 'missing':
            return ` ${pre} Missing ${post}`
        case 'ball':
            return ` ${pre} Ball ${post}`
        case 'too_low':
            return ` ${pre} Too Low ${post}`
        case 'too_high':
            return ` ${pre} Too High ${post}`
        case 'check_valve':
            return ` ${pre} Check Valve ${post}`
        case 'mushroom':
            return ` ${pre} Mushroom Cap ${post}`
        case 'popper':
            return ` ${pre} Sewer Popper ${post}`
        case 'relief':
            return ` ${pre} Relief Valve ${post}`
        case 'of_residence':
            return ` ${pre} of residence ${post}`
        case 'corner':
            return ` ${pre} corner ${post}`
        case 'under_window':
            return ` ${pre} under window ${post}`
        case 'under_deck':
            return ` ${pre} under deck ${post}`
        case 'foundation_edge':
            return ` ${pre} foundation edge ${post}`
        case 'property_line':
            return ` ${pre} property line ${post}`
        case 'none':
            return (<></>)
        default:
            return ` ${pre} ${props.children} ${post}`
    }
}

const AccessLocationPosition = (props) => {
    const {location} = props
    return(
        <>
            {location.location_position_front ? <Rosetta pre="at the" post="">front</Rosetta> : ''}
            {location.location_position_back ? <Rosetta pre="at the" post="">back</Rosetta> : ''}
            {location.location_position_left ? <Rosetta pre="to the" post="">left</Rosetta> : ''}
            {location.location_position_right ? <Rosetta pre="to the" post="">right</Rosetta> : ''}
            {location.location_position_modifier_of_residence ? <Rosetta pre="" post="">of_residence</Rosetta> : ''}
            {location.location_position_modifier_corner ? <Rosetta pre="" post="">corner</Rosetta> : ''}
            {location.location_position_modifier_under_window ? <Rosetta pre="" post="">under_window</Rosetta> : ''}
            {location.location_position_modifier_in ? <Rosetta pre="" post="">in</Rosetta> : ''}
            {location.location_position_modifier_under_deck ? <Rosetta pre="" post="">under_deck</Rosetta> : ''}
            {location.location_position_modifier_manual ? location.location_position_modifier_manual : ''}
        </>
    )
}

const InspectedLateralLength = (props) => {
    const {access} = props.data
    try{
        const accessKeys = Object.keys(access)
        const inspectedLength = _.sum(accessKeys.map(item => {
            return _.last((access[item].observations.map(obs => Number(obs.footage))).sort())
        }))
        return(
            <>
                {inspectedLength}'
            </>
        )
    } catch(err){
        return(<>unable to calculate</>)
    }
}

const UninspectedLateral = (props) => {
    const {access} = props.data
    try{
        const accessKeys = Object.keys(access)
        const accessDirections = accessKeys.map(item =>{
            return(access[item].details.direction)
        })
        return(<>{(accessDirections.includes('one_way')) ? ('Any pipe upstream of 1-way cleanout, length and condition unknown'): ('N/A') }</>)
    } catch(err){
        return(<>data unavailable</>)
    }

    // Any pipe upstream of 1-way cleanout, length and condition unknown
}