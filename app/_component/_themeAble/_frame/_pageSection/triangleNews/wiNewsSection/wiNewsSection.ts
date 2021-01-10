import { declareComponent } from "../../../../../../lib/declareComponent"
import TriangleNews from "../triangleNews"


export default class ElektrotechnikTriangleNews extends TriangleNews {

  constructor(baseLink: string) {
    super({
      text: {
        note: "Termine und",
        heading: "Aktuelles",
        subheading: "aus der WI",
        content: `Folge uns auf <c-link link="https://www.instagram.com/tgm_wirtschaftsingenieure">Instagram</c-link> und <c-link link="https://de-de.facebook.com/tgmhwi">Facebook</c-link>, so bist DU über unsere neuesten Aktivitäten immer up to date.`
      },
      cards: [
        {
          heading: "Mittwoch", 
          note: "20.01.2021", 
          thumbnail: "gotoMeeting", 
          href: baseLink + "virtueller-tag-der-offenen-ture-der-wirtschaftsingenieure", 
          contenttitle: "TdoT - Virtuell", 
          content: "Die Abteilung Wirtschaftsingenieure veranstaltet den diesjährigen Tag der offenen Türe als Webinar am Mittwoch dem 20.1 von 18:30 bis 19:30 virtuell in Form eines Webinars."
        },
        {
          heading: "Donnerstag", 
          note: "08.01.2020", 
          thumbnail: "graulicht", 
          href: baseLink + "junior-company-2020-graulicht", 
          contenttitle: "Junior Company - Graulicht", 
          content: "Die Junior Company Graulicht entwickelt, produziert und verkauft moderne und einfache Lampen in Betonoptik."
        },
        {
          heading: "Freitag", 
          note: "07.01.2020", 
          thumbnail: "holdon", 
          href: baseLink + "junior-company-2020-holdon", 
          contenttitle: "Junior Company - hold/on", 
          content: "Die JuniorCompany hold/on produziert Smartphone-Halterungen und Tablet-Ständer aus Holz für mobile, aber auch stationäre Anwendungen."
        },
        {
          heading: "Montag", 
          note: "14.12.2020", 
          thumbnail: "euroscola", 
          href: baseLink + "euroscola-2020", 
          contenttitle: "Euroscola 2020", 
          content: "Am 14. Dezember 2020 beteiligte sich die 4AHWIM, welche im letzten Schuljahr trotz der veränderten Umstände des Sommersemesters österreichweit den hervorragenden dritten Platz beim Euroscola-Wettbewerb der EU belegt hatte, an einer virtuellen Sitzung im Straßburger Parlament."
        },
      ]
    })
  }
};

declareComponent("et-news-section", ElektrotechnikTriangleNews)
