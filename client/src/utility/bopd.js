const bopd = (bopd) => {
    let bopdType = {
        popper: 'Popper',
        mushroom: 'Mushroom Cap',
        check_valve: 'Check Valve',
        relief: 'Relief Valve'
    }

    let bopdTypeKeys = Object.keys(bopdType)

    if(bopdTypeKeys.includes(bopd)){
        return `with a ${bopdType[bopd]} BOPD Device`
    } else {
        return ''
    }
}

export default bopd