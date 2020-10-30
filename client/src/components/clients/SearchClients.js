import React, {useRef, useContext} from 'react'
import SearchResults from './SearchResults'
import ClientContext from '../../context/ClientContext'

const SearchClients = (props) =>{
    const clientSearchInputRef = useRef(null)
    const {searchForClientInDB, handleEditClient, searchResult, setSearchResult} = useContext(ClientContext)

    const handleClientSearch = async (e) => {
        e.preventDefault();
        let searchValue = clientSearchInputRef.current.value
        console.log(searchValue)
        if(searchValue){
            console.log('valid search')
            let clientSearchResult = await searchForClientInDB(encodeURI(searchValue))
            setSearchResult(clientSearchResult)
        } 
    }

    return(
        <>
        <form onSubmit={handleClientSearch}>
            <div className="row">
                    <div className="col">
                        <input ref={clientSearchInputRef} type="text" className="form-control" placeholder="Client Search"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </div>
            </div>
        </form>

        {(searchResult !== null) ? <SearchResults {...{searchResult, setSearchResult}}/> : <></>}
        {/* <SearchResults {...{searchResult, setSearchResult}}/> */}

        </>
    )
}

export default SearchClients