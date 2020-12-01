import React, {useRef, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import IconGear from '../components/icons/IconGear'
const _ = require('lodash')

function Header() {
    const navLinkHomeRef = useRef(null)
    const navLinkClientsRef = useRef(null)
    const navLinkTodoRef = useRef(null)
    const location = useLocation()
    const currentPath = location.pathname

    const navDict = {
        home: {id: 'homeNav', ref: navLinkHomeRef},
        clients: {id: 'clientsNav', ref: navLinkClientsRef},
        todo: {id: 'todoNav', ref: navLinkTodoRef}
    }

    useEffect(()=>{
        let pathArr = _.tail(currentPath.split(''))
        let pathStr = pathArr.join('')
        
        if(pathStr.length === 0) {
            pathStr = 'home'
        }

        if(navDict[pathStr]){
            navDict[pathStr].ref.current.classList.add("active")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className="fixed-top navbar-light bg-light mb-5 px-4 pt-2">
            <div className="row justify-content-center text-center">
                <div className="col-12 justify-content-center font-weight-bold">
                    <a className="navbar-brand" href="/" style={{fontSize: "1.75em"}}>Sewer Inspection Report Generator</a>
                </div>
                <div className="col-12 justify-content-center">            
                <div className="float-right">
                    <a href="/settings"><IconGear /></a>
                </div>
                    <ul className="nav nav-tabs justify-content-center">
                        <li className="nav-item">
                            <a ref={navDict.home.ref} id={navDict.home.id} className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a ref={navDict.clients.ref} id={navDict.clients.id} className="nav-link" href="/clients">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a ref={navDict.todo.ref} id={navDict.todo.id} className="nav-link" href="/todo">Todo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header