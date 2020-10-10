import React from 'react'

function InputTextArea(props) {
    const {data} = props
    const {display} = data
    
    return(
        <div className="pb-3" style={{display}}>
            <label className="h6" htmlFor={data.name}>{data.placeholder}</label>
            <textarea className="form-control" name={data.name} rows="4"/>
        </div>
    )
}

export default InputTextArea
