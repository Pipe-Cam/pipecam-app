import React from 'react'
import AntiochCA from './cities/AntiochCA'
import BrentwoodCA from './cities/BrentwoodCA'
import LivermoreCA from './cities/LivermoreCA'
import PittsburgCA from './cities/PittsburgCA'
import TracyCA from './cities/TracyCA'
import VallejoCA from './cities/VallejoCA'

function CityNotes(props) {
    const {city} = props

    switch(city){
        case 'antioch_ca':
            return <AntiochCA />
        case 'brentwood_ca':
            return <BrentwoodCA />
        case 'livermore_ca':
            return <LivermoreCA />
        case 'pittsburg_ca':
            return <PittsburgCA />
        case 'tracy_ca':
            return <TracyCA />
        case 'vallejo_ca':
            return <VallejoCA />
        case 'none':
            return (<></>)
        default:
            return <><span className="text-danger">ERROR</span></>
    }
}

export default CityNotes
