import { DataBase } from "josm"
import ger from "./ger.json"



interface Lang {
  "links": {
    "tagesschule": "Tagesschule",
    "abendschule": "Abendschule",
    "versuchsanstalt": "Versuchsanstalt",
    "kontakt": "Kontakt",
    "Neuigkeiten": "Neuigkeiten",
    "it": "IT"
  }
}



export const lang: DataBase<Lang> = new DataBase<Lang>(ger as Lang)
export default lang

