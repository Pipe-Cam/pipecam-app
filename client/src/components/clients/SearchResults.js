import React, {useContext} from 'react'
import ClientContext from '../../context/ClientContext'

function SearchResults(props) {
    const {handleEditClient} = useContext(ClientContext)
    let searchResult = props.searchResult
    console.log(searchResult)

    return(
        <div className="ml-1 row">
            <div className="col-11">
                <div className="row my-3 py-3 border border-dark text-dark rounded" style={{backgroundColor: '#F0F0F0'}}>
                    <div className="col-12 text-dark">
                        <strong>Results:</strong>
                    </div>
                    <div className="col-12">
                        <ol className="text-dark font-weight-bold">
                            {searchResult.map(item=>{
                                if(item.client_type === 'Resident'){
                                    return(
                                        <li key={item._id}><button type="button" className="btn btn-link text-primary p-0" data-value={item.contact_name} data-id={item._id} data-action="edit" onClick={handleEditClient}>{item.contact_name}</button></li>
                                    )
                                } else {
                                    return(
                                        <li key={item._id}><button type="button" className="btn btn-link text-primary p-0" data-value={item.organization_name} data-id={item._id} data-action="edit" onClick={handleEditClient}>{item.organization_name}</button></li>
                                    )
                                }
                            })}
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchResults



