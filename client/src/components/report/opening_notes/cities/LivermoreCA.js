import React from 'react'
import {Link} from 'react-router-dom'

function LivermoreCA() {
    return (
        <div>
            The City of Livermore Department of Water Resources has a Residential Sewer Lateral Maintenance Program where the City will take 
            full responsibility for the portion of the line between a permitted “city” cleanout 
            (located in the planter strip of the sidewalk of the back of the property line, depending upon the characteristics of the property) 
            and the municipal sewer main located in the roadway. For more information, visit&nbsp;
            <Link to="http://www.cityoflivermore.net/citygov/pw/public_works_divisions/wrd/sewers/rsp.htm">
                http://www.cityoflivermore.net/citygov/pw/public_works_divisions/wrd/sewers/rsp.htm
            </Link>. 
            The subject property is  <span className="text-danger font-weight-bold">OR</span> is not equipped with a city cleanout.

        </div>
    )
}

export default LivermoreCA
