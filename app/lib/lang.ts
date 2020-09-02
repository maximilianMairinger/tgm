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
    "raumfahrt": "Raumfahrt",
    "projekte": "Projekte",
    "news": "Neues",
    "team": "Team",
    "leitung": "Leitung",
    "schueler": "Schülervertretung",
    "schularzt": "Schularzt",
    "tasks": "Tätigkeiten",
    "auftrag": "Auftrag",
    "tätigkeiten": "Tätigkeiten",
    "highlights": "Highlights",


    "info": "Informationen",
    "section1": "Section1",
    "section2": "Section2",
    "section3": "Section3",
    "section4": "Section4",
    "section5": "Section5"
  },

  "tgm": "TGM",

  "abteilungen": {
    "Informationstechnologie": "Informationstechnologie",
    "Elektrotechnik": "Elektrotechnik",
    "Elektronik": "Elektrotechnik",
    "Biomedizien": "Biomedizien",
    "Kunststofftechnik": "Kunststofftechnik",
    "Maschinenbau": "Maschinenbau",
    "Wirtschaftsingenieure": "Wirtschaftsingenieure"
  },
  
  "page": {
    "landing": {
      "main": {
        "note": "wir sind",
        "head": "Technologie",
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

