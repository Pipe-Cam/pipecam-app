import React from 'react'
import IconTrash from '../icons/IconTrash'
import EditButton from '../buttons/EditButton'

function AlternatingList(props) {
    let {dataObject, edit, _delete, buttons} = props
    // console.log(edit, _delete)

    if(Array.isArray(dataObject)) {
        // array
        return(<>
            {dataObject.map((item, index)=>{
                if(index % 2 === 0){
                    return <ListItemDefault value={item} buttons={buttons} handler={{edit, _delete}} key={item + Math.random(400) + Math.random(100)}/>
                } else {
                    return <ListItemSecondary value={item} buttons={buttons} handler={{edit, _delete}} key={item + Math.random(401) + Math.random(101)}/>
                }
            })}
        </>)
    } else if(typeof dataObject === 'object') {
        // object
        let objKeys = Object.keys(dataObject)
        return(<>
            <ul>
                {objKeys.map((item, index) => {
                    if(index % 2 === 0){
                        return <ListItemDefault value={dataObject[item]} buttons={buttons} handler={{edit, _delete}} key={item + Math.random(400) + Math.random(100)}/>
                    } else {
                        return <ListItemSecondary value={dataObject[item]} buttons={buttons} handler={{edit, _delete}} key={item + Math.random(401) + Math.random(101)}/>
                    }
                })}
            </ul>
        </>)
    } else {
        return(<>List only accepts Arrays and Objects</>)
    }
}

export default AlternatingList


const ListItemDefault = (props) => {
    const {value, handler, buttons} = props
    // console.log(handler)

    return(
        <li className="list-group-item">
            <span>
                {value}
            </span>
            {(buttons) ? <ListItemButtons buttons={buttons} handler={handler}/> : <></>}
        </li>
    )
}
const ListItemSecondary = (props) => {
    const {value, handler, buttons} = props
    // console.log(handler)
    return(
        <li className="list-group-item list-group-item-secondary">
            <span>
                {value}
            </span>
            {(buttons.show) ? <ListItemButtons buttons={buttons} handler={handler}/> : <></>}
        </li>
    )
}

const ListItemButtons = (props) => {
    const {handler, buttons} = props
    // console.log(handler)

    return(
        <>
            {(buttons._delete) ? (<span className="ml-3 float-right"><a href="#" className="" onClick={handler._delete}><IconTrash /></a></span>) : <></>}
            {(buttons.edit) ? (<span className="mx-3 float-right"><EditButton handler={handler.edit} /></span>) : <></>}
        </>   
    )
}