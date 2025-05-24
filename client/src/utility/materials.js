const material = (material) => {
    const materialNames = {
        "ci": "Cast Iron",
        "ac": "Asbestos Cement",
        "abs": "ABS Plastic",
        "vcp": "VCP Clay",
        "pvc": "PVC Plastic",
        "orbg": "Orangeburg",
        "hdpe": "HDPE",
        "cipp": "Cure-in-place-pipe",
        "dip": "Ductile Iron Pipe"
    }

    let materialKeys = Object.keys(materialNames)
    
    try{
        if(materialKeys.includes(material)){
            return materialNames[material]
        } else {
            throw new Error('invalid material type')
        }
    } catch(err){
        return err
    }
}

export default material