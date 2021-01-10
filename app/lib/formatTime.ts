type FormatOptions = {weekday?: "long" | "short", year?: "numeric", month?: "2-digit" | "long" | "short" | "numeric", day?: "2-digit" | "numeric"}


// Locals documentation https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation



export function parseDateToLocal(dateString: string) {
  const [ date, month, year ] = dateString.split(".")
  return new Date(+year, +month - 1, +date)
}

export function constructFormat(local: string, timeZone = "Europe/Vienna", defaultFormat: FormatOptions = {day: "2-digit", month: "2-digit", year: "numeric"}) {
  return {
    formatDate(date: string | Date, format: FormatOptions = {}) {
      return (date instanceof Date ? date : parseDateToLocal(date)).toLocaleDateString(local, { ...defaultFormat, ...format, timeZone })
    }
  }
}


export const AT = constructFormat("de-AT")
export const local = AT
export default local
