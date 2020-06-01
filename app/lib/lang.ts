import { DataBase } from "josm"
import ger from "./../res/lang/ger.json"



interface Lang {
  "links": {
    "tagesschule": "Tagesschule",
    "abendschule": "Abendschule",
    "versuchsanstalt": "Versuchsanstalt",
    "kontakt": "Kontakt",
    "Neuigkeiten": "Neuigkeiten",
    "it": "IT",
    "elektrotechnik": "Elektrotechnik",
    "neues": "Neues",


    "section1": "Section1",
    "section2": "Section2",
    "section3": "Section3",
    "section4": "Section4",
    "section5": "Section5"
  },

  "tgm": "TGM",
  
  "page": {
    "landing": {
      "main": {
        "note": "wir sind",
        "head": "Technik",
        "sub": "von Herzen"
      },
      "veruchsanstalt": {
        "note": "qwe1",
        "head": "qwe2",
        "sub": "qwe3"
      }
    }
  }
}



export const lang = new DataBase<Lang>(ger as Lang)
export default lang

