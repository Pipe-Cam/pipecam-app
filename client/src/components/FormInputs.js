import React from 'react'

import InputTextArea from './form_elements/InputTextArea'
import InputText from './form_elements/InputText'
import InputRadio from './form_elements/InputRadio'
import InputCheckbox from './form_elements/InputCheckbox'

const _ = require('lodash')


function FormInputs(props) {
    let dataObj = props.data
    let doKeys = Object.keys(props.data)

    console.log(doKeys)

    return (
        <>
        {doKeys.map(item => {
            try{
                console.log(`${item} starts with "if__" ${_.startsWith(item, 'if__')}`)
                let data = dataObj[item]

                if(_.startsWith(item, 'if__')){
                    return(
                        <div id={item} className="ml-5" key={`${data.name}-inputs-${Math.random(100)}${Math.random(100)}`}>
                            {/* {JSON.stringify(dataObj[item])} */}
                            <FormInputsIfs data={data}/>
                        </div>
                    )
                } else {
                    if(Object.keys(data).includes('input_type')){
                        return(
                            <FormInputsSwitch data={data} key={JSON.stringify(data)}/>
                        )
                    } else {
                        return(<FormInputs data={data} key={JSON.stringify(data)}/>)
                    }
                }
            } catch(e){
                console.log(e)
            }
        })}
        </>
    )
}

export default FormInputs

const FormInputsIfs = (props) => {
    const dataObjIfs = props.data
    const doiKeys = Object.keys(dataObjIfs)

    
    const hasIf = (obj) => {
        let objKeys = Object.keys(obj)
        let hasIfArr = objKeys.map(item => _.startsWith(item, 'if__') ? true : false)
        return hasIfArr.includes(true)
    }

    return (
        <>
            {doiKeys.map(item=>{
                console.log(hasIf(dataObjIfs[item]), dataObjIfs[item])
                if(hasIf(dataObjIfs[item])){
                    return (
                        <div key={`${JSON.stringify(dataObjIfs[item])}-ifs`}>
                            <FormInputsIfs data={dataObjIfs[item]}  /><br/>
                        </div>
                    )
                } else {
                    if(_.startsWith(dataObjIfs[item].name, 'if__')){
                        {/* let nameSplit = dataObjIfs[item].name.split('__')
                        let parentName = nameSplit[1]
                        let parentChoice = nameSplit[2]
                        let parentElem = document.getElementsByName(parentName) 
                        var parent = {element: parentElem, choice: parentChoice} */}
                        
                        return(
                            <FormInputsSwitch data={dataObjIfs[item]} key={JSON.stringify(dataObjIfs[item])}/>
                        )
                    }
                }
            })}
        </>
    )
}

const FormInputsSwitch = (props) => {
    let {data} = props

    if(data.input_type === 'text' || data.input_type === 'number' || data.input_type === 'date'){
        return(
            <div className="py-1" key={`${data.name}-${data.input_type}-input`} step={(data.input_type === 'number')?('0.1'):('')}>
                <InputText data={data}/>
            </div>
        )
    }

    if(data.input_type === 'textarea'){
        return(
            <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                <InputTextArea data={data}/>
            </div>
        )
    }
    
    if(data.input_type === 'checkbox'){
        return(
            <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                <InputCheckbox data={data}/>
            </div>
        )
    }

    if(data.input_type === 'radio'){
        return(
            <div className="py-1" key={`${data.name}-${data.input_type}-input`}>
                <InputRadio data={data}/>
            </div>
        )
    }

    return(
        <>
            invalid input type
            {JSON.stringify(data)}
        </>
    )
}