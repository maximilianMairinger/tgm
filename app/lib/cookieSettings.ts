import { DataBase } from "josm"

export const cookieSettings = new DataBase({
  allow: localStorage.cookieAllowed !== undefined ? localStorage.cookieAllowed : false
})

export default cookieSettings
