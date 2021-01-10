import { declareComponent } from "../../../../../../lib/declareComponent"
import TriangleNews from "../triangleNews"


export default class ItTriangleNews extends TriangleNews {

  constructor(baseUrl: string) {
    super({
      text: {
        note: "Termine und",
        heading: "Aktuelles",
        subheading: "aus der IT",
        content: `In unseren Blogartikeln berichten wir über Events, Wettbewerbe und außergewöhnliche Leistungen.`
      },
      cards: [
        {
          heading: "Dienstag", 
          note: "18.06.19", 
          thumbnail: "/res/img/rolli.jpg", 
          href: baseUrl + "", 
          contenttitle: "Tag der Barrierefreiheit", 
          content: "Wie ist das, im Rollstuhl zu sitzen und auf ihn angewiesen zu sein? Alexander Zeitlhofer, ein Schüler der IT, hat gemeinsam mit einem Rollstultrainer"
        },
        {
          heading: "Montag", 
          note: "20.04.20", 
          thumbnail: "/res/img/het-blog-wind.png", 
          href: baseUrl + "", 
          contenttitle: "Zukunft des Strom", 
          content: "Am 20.12.2020 findet ein Vortrag zur Zukunft von erneuerbareren Energiegewinnungsmethoden statt."
        },
        {
          heading: "Donnerstag", 
          note: "16.04.20", 
          thumbnail: "/res/img/ball.jpg", 
          href: baseUrl + "", 
          contenttitle: "TGM-Ball", 
          content: "Der 100. TGM-Ball findet kommenden Donnerstag statt, jetzt Tickets sichern!"
        }
      ]
    })
  }
};

declareComponent("it-news-section", ItTriangleNews)
