import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getClientById} from '../../db/read'

import capitalizeEachWord from '../../utility/capitalizeEachWord'


function ClientViewPage() {
    const {id} = useParams()
    const [clientViewData, setClientViewData] = useState(null)
    const exclusionList = ['notes', 'created', 'last_modified', '_id', '__v']
    
    const clientViewPageOnLoad = async (id) => {
        let clientData = await getClientById(id)
        setClientViewData(JSON.parse(clientData)[0])
    }

    useEffect(()=>{
        if(id){
            clientViewPageOnLoad(id)
        } else {
            setClientViewData([])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const BreadCrumbClientView = (props)=>{
        const {clientViewData} = props

        console.log(clientViewData)
        
        return(
            <>
                <nav aria-label="breadcrumb" className="">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active"><a href="/clients">Clients</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{(clientViewData) ? ((clientViewData.business_name) ? (clientViewData.business_name) : (clientViewData.contact_name)) : 'Client Details'}</li>
                    </ol>
                </nav>
            </>
        )
    }
    
    if(clientViewData){
        return (
            <>
            <BreadCrumbClientView {...{clientViewData}}/>
            {Object.keys(clientViewData).map(item => {
                    if(!exclusionList.includes(item) && clientViewData[item].toString() !== ''){
                        return(
                            <div className="row" key={item + clientViewData._id}>
                                <div className="col-3" key={item + clientViewData._id + 1}>
                                    {capitalizeEachWord(item.split('_').join(' '))}:
                                </div>
                                <div className="col-9" key={item + clientViewData._id + 2}>
                                    {capitalizeEachWord(clientViewData[item].toString())}
                                </div>
                            </div>
                        )
                    }
                })}
            </>
        )
    } else {
        return(<></>)
    }
}

export default ClientViewPage
