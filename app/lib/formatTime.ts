type FormatOptions = {weekday?: "long" | "short", year?: "numeric", month?: "2-digit" | "long" | "short" | "numeric", day?: "2-digit" | "numeric"}


// Locals documentation https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation



function parseDateToLocal(dateImp: string | Date) {
  let d: Date
  if (dateImp instanceof Date) d = dateImp
  else {
    const [ date, month, year ] = dateImp.split(".")
    d = new Date(+year, +month - 1, +date)
  }
  
  if (isNaN(+d)) throw new Error("Invalid Date")
  else return d
}

export function constructFormat(local: string, timeZone = "Europe/Vienna", defaultFormat: FormatOptions = {day: "2-digit", month: "2-digit", year: "numeric"}) {
  return {
    formatDate(date: Date | string, format: FormatOptions = {}) {
      try {
        return parseDateToLocal(date).toLocaleDateString(local, { ...defaultFormat, ...format, timeZone })
      }
      catch(e) {
        return date as string
      }
      
    }
  }
}


export const AT = constructFormat("de-AT")
export const local = AT
export default local
