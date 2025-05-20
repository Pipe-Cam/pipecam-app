export const monthNumberToName = (monthNumber) => {
    try{
        if(typeof monthNumber === 'number' && monthNumber > 0 && monthNumber <= 12){
            return(MONTH_REFERENCE[monthNumber - 1])
        }
    } catch(err) {
    }
}

export const todaysDate = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    return `${month} / ${day} / ${year}`
}

const MONTH_REFERENCE = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

