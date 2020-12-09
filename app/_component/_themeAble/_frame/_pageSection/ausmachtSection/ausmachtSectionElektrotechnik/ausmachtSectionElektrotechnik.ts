import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-elektrotechnik", class extends AusmachtSection {

    constructor() {
        super({
            heading: {
                heading: "Was uns Ausmacht",
                subheading: "als Elektrotechnik"
            },
            selection: {
                heading: "Vertiefungen",
                note: "Fachspezifische",
                selection: [
                    {"icon":"satellite", "title":"Energiesysteme", "content":"Energiegewinnung und -speicherung", "link":"/"},
                    {"icon":"rocket", "title":"Automatisierungstechnik", "content":"Automatisieren in elektrotechnischen Anwendungen", "link":"/"},
                    {"icon":"rover", "title":"Antriebstechnik", "content":"Bewegung und Elektrotechnik", "link":"/"},
                    {"icon":"rover", "title":"Industrieelektronik", "content":"Elektrotechnik in der Industrie", "link":"/"},
                    {"icon":"space-aids", "title":"Angewandte Informatik", "content":"Entwickeln von computerbasierten Lösungen", "link":"/"}
                ]
            },
            cards: [
                {
                    heading: "Lernbüro",
                    note: "Unterrichtssystem",
                    thumbnail: "/res/img/unterrichtSysteme_1.jpg",
                    href: "/",
                    contentTitle: "Lernen im Aufbruch",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/werk.jpg",
                    href: "/",
                    contentTitle: "Praxisbasierte Erfahrungen",
                    content: "In unseren Werkstätten erlernen SchülerInnen den Umgang mit technischen Gerätschaften und setzen das gelernte Theoriewissen selbst um."
                }
            ]
        })
    }

    stl() {
        return super.stl() + require("./ausmachtSectionElektrotechnik.css").toString()
    }
    pug() {
        return super.pug() + require("./ausmachtSectionElektrotechnik.pug").default
    }
});
