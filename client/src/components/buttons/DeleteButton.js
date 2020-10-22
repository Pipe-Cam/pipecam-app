import React from 'react'
// import IconPencil from '../icons/IconPencil'

function DeleteButton(props) {
    let iconTrash = `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash" fill="#dc3545" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`

    return (
        <>
            <a className="px-3 py-3" onClick={props.handler} data-value={props.value.value} data-id={props.value._id} data-action='delete' style={{backgroundImage: `url("data:image/svg+xml;base64,${btoa(iconTrash)}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer'}}></a>
            {/* <button className="btn btn-info btn-sm px-2" onClick={props.handler} data-value={props.value.value} data-id={props.value._id} style={{backgroundImage: `url(\"data:image/svg+xml;utf8,${iconPencil}\")`}}></button> */}
            {/* <button className="btn btn-info btn-sm px-2" onClick={props.handler} data-value={props.value.value} data-id={props.value._id}><IconPencil /></button> */}
        </>
    )
}

export default DeleteButton