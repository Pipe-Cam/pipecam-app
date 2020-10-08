import React from 'react'

function InputTextArea(props) {
    const {data} = props
    return(
        <div className="pb-3">
            <label htmlFor={data.name}>{data.placeholder}</label>
            <textarea className="form-control" name={data.name} rows="4"/>
        </div>
    )
}

export default InputTextArea
