import React from 'react'
import OneWayAccess from './access/OneWayAccess'
import TwoWayAccess from './access/TwoWayAccess'

function Access(props) {
    const {type} = props

    switch(type){
        case 'one_way':
            return <OneWayAccess/>
        case 'two_way':
            return <TwoWayAccess/>
        default:
            return <><span className="text-danger">ERROR</span></>
    }
}

export default Access
