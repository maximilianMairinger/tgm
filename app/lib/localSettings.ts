import { DataBase, Data } from "josm"

type key = string
type defaultVal = string
type name = string


export function createLocalSettings(settingsName: name, defaultVal: defaultVal): Data<string>
export function createLocalSettings<Settings extends {[k in key]: defaultVal}>(settingsName: name, settings: Settings): DataBase<Settings>
export function createLocalSettings<Settings extends {[k in key]: defaultVal}>(settingsName: name, settings_defaultVal: defaultVal | Settings): any {
  if (typeof settings_defaultVal === "string") {
    let dat = new Data(localStorage[settingsName])
    dat.get((v) => {
      localStorage[settingsName] = v
    })
    return dat
  }
  else {
    let db: any
    try {
      db = JSON.parse(localStorage[settingsName])
      if (typeof db === "object") db = undefined
    }
    catch(e) {}

    let dat = new DataBase(db !== undefined ? db : settings_defaultVal)
    dat((v: any) => {
      localStorage[settingsName] = JSON.stringify(v)
    })
  }
}

export const cookieSettings = new DataBase({
  allow: localStorage.cookieAllowed !== undefined ? localStorage.cookieAllowed : false
})

export default cookieSettings
