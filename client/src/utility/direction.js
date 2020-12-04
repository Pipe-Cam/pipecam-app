const direction = (directionAbbr) => {
    let directionTypes = {
        one_way: "One-Way",
        two_way: "Two-Way",
        break_in: "Break-In access",
        stub: "Stub access",
        toilet: "Toilet access",
        roof: "Roof access"
    }
    console.log(directionAbbr)

    return directionTypes[directionAbbr]
}

export default direction