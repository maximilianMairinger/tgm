import { DataBase, Data } from "josm"
import de from "../res/lang/ger"



export const currentLang = new Data("de")
export const languageIndex = new DataBase<{de: typeof de}>({de})


export const lang = languageIndex(currentLang) as DataBase<typeof de>
export default lang

//@ts-ignore
window.lang = lang


