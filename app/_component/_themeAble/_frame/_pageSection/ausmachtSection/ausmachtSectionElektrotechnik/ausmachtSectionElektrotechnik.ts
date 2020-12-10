import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-elektrotechnik", class extends AusmachtSection {

    constructor() {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Elektrotechnik"
            },
            selection: {
                heading: "Vertiefungen",
                note: "Fachspezifische",
                selection: [
                    {"icon":"energysysteme", "title":"Energiesysteme", "content":"Energiegewinnung und -speicherung", "link":"tagesschule/elektrotechnik/highlights/energiesysteme"},
                    {"icon":"automatisierungstechnik", "title":"Automatisierungstechnik", "content":"Automatisieren in elektrotechnischen Anwendungen", "link":"tagesschule/elektrotechnik/highlights/automatisierungstechnik"},
                    {"icon":"antriebstechnik", "title":"Antriebstechnik", "content":"Bewegung und Elektrotechnik", "link":"tagesschule/elektrotechnik/highlights/antriebstechnik"},
                    {"icon":"industrieelektronik", "title":"Industrieelektronik", "content":"Elektrotechnik in der Industrie", "link":"tagesschule/elektrotechnik/highlights/industrieelektronik"},
                    {"icon":"angewandteInformatik", "title":"Angewandte Informatik", "content":"Entwickeln von computerbasierten Lösungen", "link":"tagesschule/elektrotechnik/highlights/angewandte-informatik"}
                ]
            },
            cards: [
                {
                    heading: "Lernbüro",
                    note: "Unterrichtssystem",
                    thumbnail: "/res/img/student_2.jpg",
                    href: "tagesschule/elektrotechnik/highlights/lernbüro-elektrotechnik",
                    contentTitle: "Lernen im Aufbruch",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/werkstaetteHET.png",
                    href: "tagesschule/elektrotechnik/highlights/werkstätte-elektrotechnik",
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
