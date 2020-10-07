import React from 'react'
import inputElements from '../inputs/inputElements'
import Form from 'react-bootstrap/Form'
const _ = require('lodash')
const cuid = require('cuid')

export default function Inspection() {
    return (
        <Form>
            <FormInputs inputs={inputElements}/>
        </Form>
    )
}

// DEPENTENT COMPONENTS
const FormInputs = (props) => {
    let layerObj = props.inputs
    let layerKeys = Object.keys(props.inputs)

    return (
        <>
            {layerKeys.map(item => {
                {/* console.log(_.indexOf(Object.keys(layerObj[item]), 'input_type')) */}
                {/* if(typeof layerObj[item] === 'string' || Array.isArray(layerObj[item])){ */}
                if(_.indexOf(Object.keys(layerObj[item]), 'input_type') === 0){
                    return (<RenderInputs key={cuid()} inputs={layerObj[item]} />)
                } else {
                    return (<FormInputs key={cuid()} inputs={layerObj[item]}/>)
                }
            })}<br/>
        </>
    )
}

const RenderInputs = (props) =>{
    if(props.inputs.input_type === 'date'){
        return (
            <Form.Control type={props.inputs.input_type} />
        )
    } else if(props.inputs.input_type === 'text'){
        return (
            <Form.Control type={props.inputs.input_type} placeholder={props.inputs.placeholder} />
        )
    } else if(props.inputs.input_type === 'textarea'){
        return (
            <Form.Control as={props.inputs.input_type} rows="3" placeholder={props.inputs.placeholder} />
        )
    } else if(props.inputs.input_type === 'radio'){
        return (
            <>radio</>
        )
        // props.inputs.value_choices.map(item => {
        //     return <Form.Check type={props.inputs.input_type} label={props.inputs.placeholder} id={`${props.inputs.name}-${(item)? 'yes':'no'}`}/>  
        //     )}
    } else if(props.inputs.input_type === 'checkbox'){
        return (<>checkbox</>)
        // return (<>{props.inputs.value_choices.map(item => {
        //         <Form.Check type={props.inputs.input_type} label={props.inputs.placeholder} id={`${props.inputs.name}-${item}`}/>
        //     }</>)}
        // )
    } else if(props.inputs.input_type === 'number'){
        return (
            <Form.Control type={props.inputs.input_type} placeholder={props.inputs.placeholder} />
            )
        } else {
            console.log(props.inputs.input_type)
        }
    }
        {/* <Form.Check type={props.inputs.input_type} label={props.inputs.placeholder} /> */}