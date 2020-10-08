import React from 'react'

function InputText(props) {
    const {data} = props
    const stepInterval = (data.input_type === 'number') ? (data.number.step_interval) : ''
    const min = (data.input_type === 'number') ? (data.number.min) : ''
    const dateVal = (data.input_type === 'date') ? (formatDateValue()) : ''

    const displayValue = (e) => {
        console.log(e.target.value)
        console.log(typeof e.target.value)
    }
    return(
        <div className='pb-3'>
            <label htmlFor={data.name}>{data.placeholder}</label>
            <input className="form-control" id={`${data.name}-${data.input_type}-input`} type={data.input_type} name={data.name} step={stepInterval} min={min} defaultValue={dateVal}/>
        </div>
    )
}

export default InputText

const formatDateValue = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    // var yy = yyyy.toString().substring(2);

    if(dd<10) {
        dd='0'+dd;
    } 

    if(mm<10) {
        mm='0'+mm;
    } 
    
    return `${yyyy}-${mm}-${dd}`;
}