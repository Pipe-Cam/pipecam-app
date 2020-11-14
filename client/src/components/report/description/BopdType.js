import React from 'react'

function BopdType(props) {
    const access = props.accessData

    try{
        const accessKeys = Object.keys(access)
    
        const bopdList = accessKeys.map(item => {
            if(access[item].details.bopd){
                return (access[item].details.bopd)
            } else {
                return "none"
            }
        })
        
        const bopdTypeName = {
            "none": "None",
            "check_valve": "Check Valve",
            "mushroom": "Mushroom Cap",
            "popper": "Sewer Popper",
            "relief": "Relief Valve"
        }
    
        const bopdTypeString = bopdList.map(item => bopdTypeName[item])
    
        return (
            <div>
                {/* {JSON.stringify(Object.keys(access))} */}
                {bopdTypeString.join(', ')}
            </div>
        )
    } catch(err){
        return(<>data unavailable</>)
    }
}

export default BopdType
