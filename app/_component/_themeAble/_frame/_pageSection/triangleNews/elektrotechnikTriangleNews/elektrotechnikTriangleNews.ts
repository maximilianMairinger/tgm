import { declareComponent } from "../../../../../../lib/declareComponent"
import TriangleNews from "../triangleNews"


export default class ElektrotechnikTriangleNews extends TriangleNews {

  constructor() {
    super({
      text: {
        note: "Termine und",
        heading: "Aktuelles",
        subheading: "aus der RT",
        content: `Bei rund 3000 Schülern geschieht ständig etwas. Bleiben Sie informiert, indem Sie unserer <c-link link="https://instagram.com/tgmhit/">Instagram</c-link> oder <c-link link="https://facebook.com/tgmhtl/">Facebook</c-link> Seite folgen.`
      },
      cards: [
        {heading: "Samstag", note: "18.04.20", thumbnail: "/res/img/woman.png", href: "/", contentTitle: "Frauen im Weltraum", content: "Am 28.9.2020 findet ein Vortrag des ersten komplett weiblichen Astronautenteams statt."},
        {heading: "Montag", note: "20.04.20", thumbnail: "/res/img/robot.png", href: "/", contentTitle: "HRT Rover landet am Mars", content: "Ein Rover des TGM Robotikteams ist am Mars gelandet und hilft bei der Suche nach Wasser!"},
        {heading: "Donnerstag", note: "16.04.20", thumbnail: "/res/img/ball.jpg", href: "/", contentTitle: "TGM-Ball", content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"}
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
