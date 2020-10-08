import React from 'react'
const _ = require('lodash')

function InputRadio(props) {
    const {data} = props
    return (
        <div className='pb-3'>
            <div>{data.placeholder.toString()}</div>
            {data.value_choices.map(item=>{
                return (
                    <div className="form-check form-check-inline mr-5" key={`${data.name}-${data.input_type}-input-${item}`}>
                        <input className="form-check-input" type={data.input_type} name={data.name} id={`${data.name}-${data.input_type}-input-${item}`} value={item} style={{width: '40px', height: '40px'}}/>
                        <label className="form-check-label" style={{fontSize: '1.5em'}}>{_.capitalize(item)}</label>
                    </div>

                )
            })}
        </div>
    )
}

export default InputRadio
