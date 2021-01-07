import { declareComponent } from "../../../../../../lib/declareComponent"
import TriangleNews from "../triangleNews"


export default class ElektrotechnikTriangleNews extends TriangleNews {

  constructor() {
    super({
      text: {
        note: "Termine und",
        heading: "Aktuelles",
        subheading: "aus der ET",
        content: `Bei rund 3000 Schülern geschieht ständig etwas. Bleiben Sie informiert, indem Sie unserer <c-link link="https://instagram.com/tgmhit/">Instagram</c-link> oder <c-link link="https://facebook.com/tgmhtl/">Facebook</c-link> Seite folgen.`
      },
      cards: [
        {heading: "Samstag", note: "18.04.20", thumbnail: "/res/img/het-blog-rad.png", href: "/", contenttitle: "Elektro-Fahrrad", content: "Das Elektrofahrrad der ET-Abteilung wurde offiziell zugelassen und ist im Handel verfügbar."},
        {heading: "Montag", note: "20.04.20", thumbnail: "/res/img/het-blog-wind.png", href: "/", contenttitle: "Zukunft des Strom", content: "Am 20.12.2020 findet ein Vortrag zur Zukunft von erneuerbareren Energiegewinnungsmethoden statt."},
        {heading: "Donnerstag", note: "16.04.20", thumbnail: "/res/img/ball.jpg", href: "/", contenttitle: "TGM-Ball", content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"},
        {heading: "Samstag", note: "18.04.20", thumbnail: "/res/img/het-blog-rad.png", href: "/", contenttitle: "Elektro-Fahrrad", content: "Das Elektrofahrrad der ET-Abteilung wurde offiziell zugelassen und ist im Handel verfügbar."},
        {heading: "Montag", note: "20.04.20", thumbnail: "/res/img/het-blog-wind.png", href: "/", contenttitle: "Zukunft des Strom", content: "Am 20.12.2020 findet ein Vortrag zur Zukunft von erneuerbareren Energiegewinnungsmethoden statt."},
        {heading: "Donnerstag", note: "16.04.20", thumbnail: "/res/img/ball.jpg", href: "/", contenttitle: "TGM-Ball", content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"}
      ]
    })
  }
  
  stl() {
    return super.stl() + require("./elektrotechnikTriangleNews.css").toString()
  }
  pug() {
    return super.pug() + require("./elektrotechnikTriangleNews.pug").default
  }
};

declareComponent("et-triangle-news-section", ElektrotechnikTriangleNews)
