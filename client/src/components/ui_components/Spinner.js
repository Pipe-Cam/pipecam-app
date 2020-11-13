import React, {useState} from 'react'

function Spinner() {
    return (
        <>
            <div className="spinner-border text-primary inline" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}

export default Spinner
