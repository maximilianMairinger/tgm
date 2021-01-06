import { timeStamp } from "console"

type FormatOptions = {weekday?: "long" | "short", year?: "numeric", month?: "long" | "short" | "numeric", day?: "numeric"}

export function constructFormat(local = "de-AT", timeZone = "Europe/Vienna", defaultFormat: FormatOptions = {}) {
  return {
    formatDate(date: string | Date, format: FormatOptions = {}) {
      return new Date(date).toLocaleDateString(local, { ...defaultFormat, ...format, timeZone })
    }
  }
}

export const AT = constructFormat()
export const local = constructFormat()
export default local
