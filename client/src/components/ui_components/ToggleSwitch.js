import React from 'react'
import './ToggleSwitch.css'

function ToggleSwitch(props) {
    return (
        <>
            <label className="switch">
            <input ref={props.streamToggleRef} type="checkbox" onChange={props.handleToggleChange}/>
            <span className="slider round"></span>
            </label>
        </>
    )
}

export default ToggleSwitch
