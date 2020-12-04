const material = (material) => {
    const materialNames = {
        "ci": "Cast Iron",
        "ac": "Asbestos Cement",
        "abs": "ABS Plastic",
        "vcp": "VCP Clay",
        "pvc": "PVC Plastic",
        "orbg": "Orangeburg",
        "hdpe": "HDPE"
    }

    let materialKeys = Object.keys(materialNames)
    
    try{
        if(materialKeys.includes(material)){
            return materialNames[material]
        } else {
            throw new Error('invalid material type')
        }
    } catch(err){
        console.log(err)
        return err
    }
}

export default material