import React from 'react'

function IconDownArrow(props) {
    let width = '1em';
    let height = '1em'; 

    if(props.width){
        console.log(props.width)
        width = props.width
    }

    if(props.height){
        console.log(props.height)
        height = props.height
    }

    return (
        <>
            <svg width={width} height={height} viewBox="0 0 16 16" className="bi bi-arrow-down-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
            </svg>
        </>
    )
}

export default IconDownArrow
