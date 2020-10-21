import React from 'react'
import IconPencil from '../icons/IconPencil'

function EditButton(props) {
    return (
        <>
            <a href="#" className="badge badge-info px-3 py-2" onClick={props.handler.edit}><IconPencil /></a>
        </>
    )
}

export default EditButton
