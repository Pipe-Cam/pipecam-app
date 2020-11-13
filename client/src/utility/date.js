export const monthNumberToName = (monthNumber) => {
    try{
        if(typeof monthNumber === 'number' && monthNumber > 0 && monthNumber <= 12){
            return(MONTH_REFERENCE[monthNumber - 1])
        }
    } catch(err) {
        console.log(err)
    }
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

