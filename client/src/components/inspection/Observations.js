import React, {useEffect, useRef} from 'react'

function Observations(props) {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div>
                <h1>Observations</h1>
                <h4>Access Number: {props.accessNumber}</h4>
                <ObservationLine />
        </div>
    )
}

export default Observations


const ObservationLine = () => {
    const standingWaterRef = useRef(null)
    const standingWaterStartRef = useRef(null)
    const standingWaterEndRef = useRef(null)
    const underWaterRef = useRef(null)
    const underWaterStartRef = useRef(null)
    const underWaterEndRef = useRef(null)

    const handleStandingWater = (e) => {
        if(standingWaterRef.current.checked){
            standingWaterStartRef.current.style.display = 'block'
            standingWaterEndRef.current.style.display = 'block'
        } else {
            standingWaterStartRef.current.style.display = 'none'
            standingWaterEndRef.current.style.display = 'none'
        }
    }

    const handleUnderWater = (e) => {
        if(underWaterRef.current.checked){
            underWaterStartRef.current.style.display = 'block'
            underWaterEndRef.current.style.display = 'block'
        } else {
            underWaterStartRef.current.style.display = 'none'
            underWaterEndRef.current.style.display = 'none'
        }
    }

    return(
        <>
        <div className="border p-3">
            <div className="row border p-2 m-2">
                {/* footage: {input_type: 'number', name: 'footage', id: 'footage_number_input', placeholder: 'Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: [], depends_on_id: '', has_children: false, display: 'inherit'}, // number in ft */}
                <div className="col col-6 pt-3">
                    <label className="h6" htmlFor='footage'>Footage (in Feet)</label>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'footage', id: 'footage', placeholder: 'ft.in', step: '0.1', min: '0'}} onChange={Function()}/>
                </div>
            </div>
            <div className="row border p-2 m-2">
                <div className="col col-12 pt-3">
                    <div className="h6">Blockage</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="roots" value="roots" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="roots">Roots</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="debris" value="debris" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="debris">Debris</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="debris_loose" value="loose" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="debris_loose">Loose</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="debris_attached_to_wall" value="attached_to_wall" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="debris_attached_to_wall">Attached To Wall</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="continuous" value="continuous" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="continuous">Continuous</label>
                    </div>
                </div>
                <div className="col col-6 mt-4">
                    <label className="h6 float-left" htmlFor='footage'>% Loss of Crosssection</label>
                    <input {...{className: 'form-control mb-3 float-right', type: 'number', name: 'loss_of_crosssection', id: 'loss_of_crosssection', step: '1', min: '0', max: '100', placeholder: '%'}} onChange={Function()}/>
                </div>
            </div>

            <div className="row border p-2 m-2 pt-4">
                <div className="col col-4">
                    <div className="form-check form-check-inline mr-5 mb-3">
                        <input ref={standingWaterRef} className="form-check-input radio-button" type="checkbox" id="standing_water" value="standing_water" onClick={handleStandingWater} onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="roots">Standing Water</label>
                    </div>
                </div>
                <div ref={standingWaterStartRef} className="col col-4" style={{display: 'none'}}>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'standing_water_start', id: 'standing_water_start', step: '0.1', min: '0', placeholder: 'Standing Water - Start'}} onChange={Function()}/>
                </div>
                <div ref={standingWaterEndRef} className="col col-4" style={{display: 'none'}}>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'standing_water_end', id: 'standing_water_end', step: '0.1', min: '0', placeholder: 'Standing Water - End'}} onChange={Function()}/>
                </div>
            </div>

            <div className="row border p-2 m-2 pt-4">
                <div className="col col-4">
                    <div className="form-check form-check-inline mr-5 mb-3">
                        <input ref={underWaterRef} className="form-check-input radio-button" type="checkbox" id="under_water" value="under_water" onClick={handleUnderWater} onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="roots">Under Water</label>
                    </div>
                </div>
                <div ref={underWaterStartRef} className="col col-4" style={{display: 'none'}}>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'under_water_start', id: 'under_water_start', step: '0.1', min: '0', placeholder: 'Under Water - Start'}} onChange={Function()}/>
                </div>
                <div ref={underWaterEndRef} className="col col-4" style={{display: 'none'}}>
                    <input {...{className: 'form-control mb-3', type: 'number', name: 'under_water_end', id: 'under_water_end', step: '0.1', min: '0', placeholder: 'Under Water - End'}} onChange={Function()}/>
                </div>
            </div>

            <div className="row border p-2 m-2 pb-3">
                <div className="col col-12 pt-3">
                    <div className="h6">Pipe Issue</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_crack" value="crack" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="pipe_issue_crack">Crack</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_separated_joint" value="separated_joint" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="pipe_issue_separated_joint">Separated Joint</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="pipe_issue_hole" value="hole" onChange={Function()}/>
                        <label className="form-check-label radio-button-label" htmlFor="pipe_issue_hole">Hole</label>
                    </div>
                </div>
            </div>

            <div className="row border p-2 m-2 pb-3">
                <div className="col col-12 pt-3">
                    <textarea name="observation_notes" id="observation_notes" placeholder="Notes" rows="3" className="w-100 p-3"/>
                </div>
            </div>
        </div>
        </>
    )
}