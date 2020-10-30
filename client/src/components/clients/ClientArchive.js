import React from 'react'
import AlternatingList from '../ui_components/AlternatingList'

function ClientArchive(props) {
    const {archivedClientsFromDb} = props
    const filteredList = archivedClientsFromDb.filter(item => {
        return item.client_status === 'archived'
    })

    return(
        <>
            <div className="py-2">
                <AlternatingList {...{
                    dataObject: ((!filteredList)? ([]) : (filteredList.map(item => { 
                                return ({value: (item.business_name || item.contact_name), _id: item._id})
                        }))), 
                    edit: null, 
                    _delete: null, 
                    buttons: {show: false, edit: false, _delete: false}}}/>
            </div>
        </>
    )
}

export default ClientArchive