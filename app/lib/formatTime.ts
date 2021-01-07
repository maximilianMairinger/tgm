import { timeStamp } from "console"

type FormatOptions = {weekday?: "long" | "short", year?: "numeric", month?: "2-digit" | "long" | "short" | "numeric", day?: "2-digit" | "numeric"}

export function constructFormat(local = "de-AT", timeZone = "Europe/Vienna", defaultFormat: FormatOptions = {day: "2-digit", month: "2-digit", year: "numeric"}) {
  return {
    formatDate(date: string | Date, format: FormatOptions = {}) {
      return new Date(date).toLocaleDateString(local, { ...defaultFormat, ...format, timeZone })
    }
  }
}

export const AT = constructFormat()
export const local = constructFormat()
export default local
