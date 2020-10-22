import React from 'react'
// import IconTrash from '../icons/IconTrash'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'

function AlternatingList(props) {
    let {dataObject, edit, _delete, buttons} = props
    // console.log(edit, _delete)

    // let value = (typeof value === 'object') ? value.value : value;
    // let _id = (typeof value === 'object') ? value._id : '';

    // console.log('dataObject: ', dataObject)

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
    } /*else if(typeof dataObject === 'object') {
        // object => {value: String, _id: String}
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
    } */else {
        return(<>List only accepts Arrays and Objects</>)
    }
}

export default AlternatingList


// const ListItemDefault = (props) => {
//     const {value, handler, buttons} = props

//     return(
//         <li className="list-group-item">
//             <span>
//                 {value.value}
//             </span>
//             {(buttons) ? <ListItemButtons buttons={buttons} value={value} handler={handler}/> : <></>}
//         </li>
//     )
// }

const ListItemDefault = (props) => {
    const {value, handler, buttons} = props

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-9">
                    {value.value}
                </div>
                <div className="col-3">
                    {(buttons) ? <ListItemButtons buttons={buttons} value={value} handler={handler}/> : <></>}
                </div>
            </div>
        </li>
    )
}

const ListItemSecondary = (props) => {
    const {value, handler, buttons} = props

    return(
        <li className="list-group-item list-group-item-secondary">
            <div className="row">
                <div className="col-9">
                    {value.value}
                </div>
                <div className="col-3">
                    {(buttons) ? <ListItemButtons buttons={buttons} value={value} handler={handler}/> : <></>}
                </div>
            </div>
        </li>
    )
}
// const ListItemSecondary = (props) => {
//     const {value, handler, buttons} = props

//     return(
//         <li className="list-group-item list-group-item-secondary">
//             <span>
//                 {value.value}
//             </span>
//             {(buttons.show) ? <ListItemButtons buttons={buttons} value={value} handler={handler}/> : <></>}
//         </li>
//     )
// }

const ListItemButtons = (props) => {
    const {handler, buttons, value} = props
    // console.log(handler)

    return(
        <>
            <div className="float-right">
                {(buttons.edit) ? (<div className="d-inline"><EditButton handler={handler.edit} value={value}/></div>) : <></>}
                {(buttons._delete) ? (<div className="pl-3 d-inline"><DeleteButton handler={handler._delete} value={value}/></div>) : <></>}
            </div>
        </>   
    )
}