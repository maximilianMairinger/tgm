import { DataBase, Data } from "josm"

type Key = string
type DefaultVal = string | number | boolean
type Name = string


export function createLocalSettings(settingsName: Name, defaultVal: DefaultVal): Data<string>
export function createLocalSettings<Settings extends {[k in Key]: DefaultVal}>(settingsName: Name, settingsDefault: Settings): DataBase<Settings>
export function createLocalSettings<Settings extends {[k in Key]: DefaultVal}>(settingsName: Name, settingsDefault_valDefault: DefaultVal | Settings): any {
  let dat: any

  let val: any
  try {
    val = JSON.parse(localStorage[settingsName])
  }
  catch(e) {}

  if (typeof settingsDefault_valDefault === "object" && settingsDefault_valDefault !== null) {
    if (typeof val !== "object") val = undefined
    dat = new DataBase(val, settingsDefault_valDefault)
    dat((v: any) => {
      localStorage[settingsName] = JSON.stringify(v)
    }, false)
  }
  else {
    dat = new Data(val, settingsDefault_valDefault)
    dat.get((v) => {
      localStorage[settingsName] = JSON.stringify(v)
    }, false)
  }
  return dat
}

export default createLocalSettings

