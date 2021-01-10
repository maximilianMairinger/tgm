import { declareComponent } from "../../../../../../lib/declareComponent"
import TriangleNews from "../triangleNews"


export default class ElektrotechnikTriangleNews extends TriangleNews {

  constructor(baseLink: string) {
    super({
      text: {
        note: "Termine und",
        heading: "Aktuelles",
        subheading: "aus der Biomedizin",
        content: `In unseren Blogartikeln berichten wir über Events, Wettbewerbe und außergewöhnliche Leistungen.`
      },
      cards: [
        {
          heading: "Mittwoch", 
          note: "23.12.20", 
          thumbnail: "kaltesLicht2", 
          href: baseLink + "jahresausklang-2020", 
          contenttitle: "Jahresausklang", 
          content: "Aufgrund der Hygienemaßnahmen war es uns vor den Weihnachtferien leider nicht mehr möglich wie gewohnt mit"
        },
        {
          heading: "Mittwoch",
          note: "1.4.2020",
          thumbnail: "nespresso",
          href: baseLink + "schulerinnen-in-fachzeitschrift-gewurdigt",
          contenttitle: "Bioplastics",
          content: "Die Diplomarbeit von Anna-Maria Monks und Judith Nachbagauer steht erneut im Rampenlicht; die Zeitschrift Bioplastics MAGAZINE"
        },
        {
          heading: "Freitag", 
          note: "01.02.2019", 
          thumbnail: "wienING", 
          href: baseLink + "wiening-preis-fur-diplomarbeit", 
          contenttitle: "WienING Preis", 
          content: "Der Förderpreis der Wiener Ingenieurbüros, für die beste HTL-Diplomarbeit, ging dieses Jahr an zwei Schülerinnen der TGM-Kunststofftechnik für Ihre Arbeit zum Thema Entwicklung kompostierfähiger"
        },
        {
          heading: "Donnerstag", 
          note: "24.01.2019", 
          thumbnail: "ernstSchmitzPreis19", 
          href: baseLink + "verleihung-des-ernst-schmitz-preis-2019", 
          contenttitle: "Ernst Schmitz Preis", 
          content: "An Frau Ing. Luana Köttler, verlieh das Komitee der GFKT diesen renommierten Preis letztes Jahr."
        },
        {
          heading: "Freitag", 
          note: "20.01.2019", 
          thumbnail: "voekStipendienverleihung", 
          href: baseLink + "vok-stipendienverleihung", 
          contenttitle: "VÖK-Stipendienverleihung", 
          content: "Auch dieses Jahr wurden fleißige und bedürftige Schülerinnen und Schüler der Abteilung Kunststofftechnik wieder mit den Stipendien der VÖK geehrt. Dank der großzügigen Spenden diverser Firmen und Einzelpersonen"
        }
      ]
    })
  }
};

declareComponent("kt-news-section", ElektrotechnikTriangleNews)
