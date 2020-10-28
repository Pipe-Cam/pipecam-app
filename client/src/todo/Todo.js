import React from 'react'

function Todo() {
    return (
        <div>
            <h1 style={{textDecoration: 'underline'}}>TODO LIST</h1>
            <ol>
                <li>
                    <s className="text-danger"> 
                        <strong className="text-success">[CLIENTS]</strong> Add New Client
                    </s>
                </li>
                <li>
                    <s className="text-danger">
                        <strong className="text-success">[CLIENTS]</strong> search box
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                        <strong className="text-success">[API / DB]</strong> create db, implement schema, abstraction 
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                        <strong className="text-success">[API / DB]</strong> post new client
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> post new Job
                </li>
                <li>
                    <s className="text-danger">
                    <strong className="text-success">[CLIENTS]</strong> View Client Info 
                    </s>
                    <em> (still unformatted)</em>
                </li>
                <li>
                    <s className="text-danger">
                    <strong className="text-warning">[CLIENTS]</strong> Display list of recently modified clients
                    </s>
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-warning">[HOME]</strong> Display list of scheduled inspections
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-warning">[HOME]</strong> Display list of recent inspections
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB HOME]</strong> <br/><span className="pl-3"><strong>(A)</strong> Job Details (overview & location) should be editable.</span>
                                                                         <br/><span className="pl-3"><strong>(B)</strong> Scheduled Jobs should only have Overview prefilled.</span>
                                                                         <br/><span className="pl-3"><strong>(C)</strong> Job Location component should be accessed from Job Home.</span>
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB HOME]</strong> Enable Edit and Delete Buttons in Alternating List
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB HOME]</strong> Fix Alternating List
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB OVERVIEW]</strong> Move Opening Observations from Job Overview to Job Home
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[OBSERVATION HOME]</strong> Enable Edit and Delete Buttons in Alternating List
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[OBSERVATION HOME]</strong> Fix Alternating List
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    decide whether to call an inspection a Job or an Inspection
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> get clients by name
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> get scheduled / active jobs
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> get client info
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> get recent completed jobs
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> post update Job Overview
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> post update Job Location
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> post update Access Details
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> post update Observation Details
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-warning">[API / DB]</strong> simple auth. compare unique hash from cookie with stored unique hash -- if valid, then allow db access, else, reply with error.
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-warning">[REACT]</strong> simple auth. localStorage.authenticated = true & httpOnly cookie contains unique hash
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-warning">[API / DB]</strong> registration (copy from business listing)
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-warning">[REACT]</strong> registration form (copy from business listing)
                </li>
                {/* <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[...]</strong> ...
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[...]</strong> ...
                </li> */}
            </ol> 

            <h2 style={{textDecoration: 'underline'}}>WISHLIST</h2>
            <ol>
                <li>
                    attach images to job
                </li>
            </ol>
        </div>
    )
}

export default Todo


{/* <li>
<s className="text-danger"> 
</s>
<strong className="text-success">[...]</strong> ...
</li> */}