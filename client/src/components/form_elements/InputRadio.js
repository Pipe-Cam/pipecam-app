import React from 'react'
import './InputRadio.css'
const _ = require('lodash')

function InputRadio(props) {
    const {data} = props
    return (
        <div className='pb-3'>
            <div className="h6">{data.placeholder.toString()}</div>
            {data.value_choices.map(item=>{
                return (
                    <div className="form-check form-check-inline mr-5" key={`${data.id}-${Math.random(50)}${Math.random(49)}${Math.random(48)}_div`}>
                        <input className="form-check-input radio-button" type={data.input_type} name={data.name} id={`${data.id}__${item}`} value={item}/>
                        <label className="form-check-label radio-button-label">{_.capitalize(item)}</label>
                    </div>

                )
            })}
        </div>
    )
}

export default InputRadio
