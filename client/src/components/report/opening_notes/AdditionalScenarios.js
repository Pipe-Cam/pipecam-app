import React from 'react'

function AdditionalScenarios(props) {
    const {scenario} = props

    const scenarioText = {
        'push_to_main': <PushToMain/>,
        'mushroom_buried': <MushroomBuried/>,
        'three_inch_access': <ThreeInchAccess/>,
        'break_in_access': <BreakInAccess/>
    }

    return (
        <>
            {scenario.map(item => {
                return(
                    <div className="row mb-4" key={item}>
                        <div className="col-12">
                            {scenarioText[item]}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default AdditionalScenarios

const PushToMain = () => {
    return (<>
        Footages on the video may appear in descending order if the inspector pushes the camera to the sewer main due to conditions in the line and performs the 
        inspection in an upstream direction.  Measurements in the inspection report appear in ascending order from the access toward the sewer main or manhole 
        in order to simplify the report.
    </>)
}

const MushroomBuried = () => {
    return (<>
        The bottom of the mushroom cap backwater overflow prevention device (BOPD) is in contact with the landscape bark and is too close to the ground to function.
        It should be replaced with a sewer popper BOPD that does not require clearance of the ground.
    </>)
}

const ThreeInchAccess = () => {
    return (<>
        The cleanout access is 3” in diameter which is considered to be undersized to maintain the main lateral outside the front foundation edge which is 4” in diameter. 
        The reduced size of the access will limit the size of the equipment that can be used for maintenance of the line and will cause root cutting and cleaning to be 
        less effective.
    </>)
}

const BreakInAccess = () => {
    return (<>
        The access for this lateral is improper and is referred to as “break in access” because it is a hole broken into the top pf the pipe and covered by a cleanout riser. 
        The hole pipe prevents proper maintenance of the line because it limits the size of the equipment that can enter then line and the jagged edges of the hole can be 
        further damaged with the equipment.  The roots growing on the top of the pipe as a result of an unsealed joint cannot be removed because they are inaccessible to 
        the equipment.
    </>)
}
