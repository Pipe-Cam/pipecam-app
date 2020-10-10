import React from 'react'
const _ = require('lodash')

function InputCheckbox(props) {
    const {data} = props
    const {display} = data
    
    return (
        <div className='pb-3' style={{display}}>
            <div>{data.placeholder.toString()}</div>
            {data.value_choices.map(item=>{
                return (
                    <div className="form-check form-check-inline mr-5" key={`${data.name}-${data.input_type}-input-${item}-div`}>
                        <input className="form-check-input" type={data.input_type} name={data.name} id={`${data.name}-${data.input_type}-input-${item}`} value={item} style={{width: '30px', height: '30px'}}/>
                        <label className="h6" className="form-check-label" style={{fontSize: '1.5em'}}>{_.capitalize(item)}</label>
                    </div>

                )
            })}
        </div>
    )
}

export default InputCheckbox
