import React from 'react'

function PipeMaterials(props) {
    const {material} = props

    const materialNames = {
        "ci": "Cast Iron",
        "ac": "Asbestos Cement",
        "abs": "ABS",
        "vcp": "VCP (Vitrified Clay Pipe)",
        "pvc": "PVC",
        "orbg": "Orangeburg",
        "hdpe": "HDPE (High-Density Polyethylene)"
    }

    let materialsArr = material.map(item => materialNames[item])

    return (
        <div>
            {materialsArr.join(', ')}
        </div>
    )
}

export default PipeMaterials
