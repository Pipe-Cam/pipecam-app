import React from 'react'

import InputTextArea from '../components/form_elements/InputTextArea'
import InputText from '../components/form_elements/InputText'
import InputRadio from '../components/form_elements/InputRadio'
import InputCheckbox from '../components/form_elements/InputCheckbox'


function InputElements(props) {
    let dataObj = props.data
    let doKeys = Object.keys(props.data)

    return (
        <>
        {doKeys.map(item => {
            try{
                let data = dataObj[item]
                if(data.input_type === 'text' || data.input_type === 'number' || data.input_type === 'date'){
                    return(
                        <div className="py-1" key={`${data.name}-${data.input_type}-input`} step={(data.input_type === 'number')?('0.1'):('')}>
                            <InputText data={data} />
                        </div>
                    )
                }

                if(data.input_type === 'textarea'){
                    return(
                        <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                            <InputTextArea data={data} />
                        </div>
                    )
                }
                
                if(data.input_type === 'checkbox'){
                    return(
                        <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                            <InputCheckbox data={data} />
                        </div>
                    )
                }

                if(data.input_type === 'radio'){
                    return(
                        <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                            <InputRadio data={data} />
                        </div>
                    )
                }
            } catch(e){
                console.log(e)
            }
        })}
        </>
    )
}

export default InputElements
