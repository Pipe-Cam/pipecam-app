import React, {useState} from 'react'

function Spinner() {
    return (
        <div>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
