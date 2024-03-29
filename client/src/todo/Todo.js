import React from 'react'

function Todo() {
    return (
        <div>
            - add "inspected by" to input
            - add "estimated length of uninspected lateral"



            <h1 style={{textDecoration: 'underline'}}>TODO LIST - INPUT</h1>

            <ol>
                <li>
                    <s className="text-danger"> 
                    </s>
                        <strong className="text-success">[OBSERVATION HOME]</strong> add done button
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                        <strong className="text-success">[JOB HOME]</strong> add done button
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                        <strong className="text-success">[INSPECTION HOME]</strong> add done button
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                        <strong className="text-success">[REACT]</strong> update new Job from ACTIVE -> COMPLETED
                </li>

                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB HOME]</strong> <br/><span className="pl-3"><strong>(A)</strong> Job Details (overview & location) should be editable.</span>
                                                                         <br/><span className="pl-3 text-danger"><s><strong>(B)</strong> Scheduled Jobs should only have Overview prefilled.</s></span>
                                                                         <br/><span className="pl-3 text-danger"><s><strong>(C)</strong> Job Location component should be accessed from Job Home.</s></span>
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
                    <strong className="text-success">[API / DB]</strong> put update Access Details
                </li>
                <li>
                    <s className="text-danger"> 
                    </s>
                    <strong className="text-success">[API / DB]</strong> put update Observation Details
                </li>

                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[CLIENTS]</strong> Format Client Info 
                </li>
                <li>
                    <s className="text-danger">
                    </s>
                    <strong className="text-success">[JOB HOME]</strong> Inputs for image and video URLs
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

            <h2 style={{textDecoration: 'underline'}}>BACKLOG</h2>
            <ol>
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
                <li>
                    attach images to job
                </li>
            </ol>

            <h2 style={{textDecoration: 'underline'}}>DONE</h2>

            <ul>

                 <li>
                    <s className="text-danger">
                    <strong className="text-success">[JOB OVERVIEW]</strong> add "root cut"
                    </s>
                </li>
                 <li>
                    <s className="text-danger">
                    <strong className="text-success">[JOB OVERVIEW]</strong> add "distance from cleanout to sewer main"
                    </s>
                </li>
                 <li>
                    <s className="text-danger">
                    <strong className="text-success">[JOB OVERVIEW]</strong> "street, unit, city, state, zip for property address"
                    </s>
                </li>
                 <li>
                    <s className="text-danger">
                    <strong className="text-success">[JOB OVERVIEW]</strong> Move Opening Observations from Job Overview to Job Home
                    </s>
                </li>

                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> get client info
                    </s>
                </li>

                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> put update Job Overview
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> put update Job Location
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                        <strong className="text-success">[REACT]</strong> update new Job from SCHEDULED -> ACTIVE
                    </s>
                </li>
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
                        <strong className="text-success">[API / DB]</strong> post new Job SCHEDULED
                    </s>
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
                        decide whether to call an inspection a Job or an Inspection
                    </s> <em>it'll be called an INSPECTION</em>
                </li>
                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> get recent completed jobs
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> get scheduled / active jobs
                    </s>
                </li>
                <li>
                    <s className="text-danger">
                    <strong className="text-warning">[HOME]</strong> Display list of scheduled inspections
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                    <strong className="text-warning">[HOME]</strong> Display list of recent inspections
                    </s>
                </li>
                <li>
                    <s className="text-danger"> 
                    <strong className="text-success">[API / DB]</strong> get clients by name
                    </s>
                </li>
            </ul>

        </div>
    )
}

export default Todo


{/* <li>
<s className="text-danger"> 
</s>
<strong className="text-success">[...]</strong> ...
</li> */}


/*
    REPORT LAYOUT NOTES:
    1. Pipecam Logo
    2. METADATA:
        - Date of Inspection
        - Inspection Ordered By
        - Property Address
        - Inspected by
    3. Links to video files
    4. Certificate of Completion / Root Cut Warranty
        - boilerplate
        - calculate 1-yr warrant date
    5. Opening Notes
        - The City of .... boilerplate
        - General notes of the inspection and its purpose
        - Specific notes about this property having 1-way or 2-way cleanouts
        - Specific notes about 2-way sewer access
        - if no BOPD, boilerplate recommending one
        - etc...
    6. Guidelines for proper use of the line
        - boilerplate
    7. Conclusions of Serviceability
        - boilerplate for all potential outcomes
        - general info about break-ins, cleanouts, 1-way configuration
        - Defects as an area of concern
    8. Recommendations
        - Maintenance (boilerplate)
        - Immediate Corrective Action w/ price (boilerplate)
    9. Recommendations for Repair (Estimate will be sent under separate cover)
        - Maintenance w/ price (boilerplate)
        - Immediate Corrective Action w/ price (boilerplate)
    10. Areas of Concern Downstream Toward the Municipal Sewer Main
    11. Areas of Concern Upstream Toward the Residence
    12. Description of Sewer Line
    13. Summary of Scope and Limitations of this Inspection (notes)
    14. Definitions & Explanation of Conclusions (boilerplate)



    TRIGGERS:

    Certificate of Completion/ Root Cut Warranty
    - only for stage-the-sewer-inspections

    Opening Notes:
    - City
    - Central San
    - 1-Way vs 2-way vs Break-in Access vs Stub-out
    - BOPD


*/


