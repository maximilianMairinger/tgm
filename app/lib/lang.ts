import { DataBase, Data } from "josm"
import _de from "./../res/lang/ger.json"
const de = _de as Lang




export const currentLang = new Data("de")
export const languageIndex = new DataBase<{de: Lang}>({de})


export const lang = languageIndex(currentLang) as DataBase<Lang>
export default lang




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

  "loremIpsum": {
    "short": "Lorem ipsum dolor sit amet.",
    "mid": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget justo eu velit iaculis venenatis faucibus ac quam. Etiam est nunc, eleifend luctus diam eget, sollicitudin rutrum leo. Proin vel imperdiet est, eget molestie risus.",
    "long": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla velit mi, congue elementum urna commodo ac. Proin ligula magna, ultrices vestibulum leo sed, maximus aliquam urna. Sed tincidunt augue et laoreet faucibus. Suspendisse potenti. Phasellus ac nulla in nulla commodo cursus. Vestibulum ornare vitae metus vel posuere. Nullam quis euismod metus. Morbi pharetra magna finibus dui sodales feugiat. Nunc efficitur diam eu dolor sollicitudin, ut sollicitudin odio posuere. Pellentesque eget turpis ac velit finibus sagittis. Duis sed fermentum sapien, ut semper mauris. Cras pulvinar metus non lorem venenatis sollicitudin. In molestie, sem in varius tincidunt, augue magna porttitor diam, et sollicitudin massa elit non velit. Fusce condimentum fermentum blandit. Quisque facilisis vitae justo ac lobortis."
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