import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-wi", class extends AusmachtSection {

    constructor() {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Wirtschaftsingenieure"
            },
            selection: {
                heading: "Gegenstände",
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
                    heading: "Schuleingangsphase",
                    note: "Individualisierung",
                    thumbnail: "/res/img/schuleingangsphase.png",
                    href: "tagesschule/wirtschaftsingenieure/highlights/schuleingangsphase",
                    contentTitle: "Individuelle Betreuung und Entwicklung",
                    content: "Die haben nur WIR! Die Schuleingangsphase ist so gestaltet, dass alle Schülerinnen und Schüler gut in der Schule ankommen und sich vom ersten Tag an wohlfühlen. Wichtig sind hier aber nicht nur offene Unterrichtsformen, wie beispielsweise KOOL, sondern ausschlaggebend ist auch eine strukturierte Lernumgebung."
                },
                {   
                    heading: "Werkstatt",
                    note: "Fachpraktischer Unterricht",
                    thumbnail: "/res/img/werkstätteWi.png",
                    href: "tagesschule/wirtschaftsingenieure/highlights/werkstatte-wirtschaftsingenieure",
                    contentTitle: "Praxisbasierte Erfahrungen",
                    content: "Das Herzstück der HTL Ausbildung ist die Verknüpfung aus Theorie und Praxis. In den diversen Werkstätten kannst du die Theorieinhalte auf Projekte anwenden. Das macht die HTL Ausbildung weltweit einzigartig!"
                }
            ],
            vertiefung: {
                note: "die",
                heading: "Vertiefungen",
                subheading: "der Elektrotechnik",
                hsize: {max:60, min:40},
                content: "Die Abteilung Elektrotechnik bietet einen besonders umfassende technische Ausbildung. Grundsätzlich beschäftigt sie sich mit allen Bereichen"
            },
            vertiefungscard: [
                {
                    heading:"Automatisierung",
                    icon:"automatisierung",
                    link:"tagesschule/elektrotechnik/highlights/automatisierung",
                    content:"Das reibungslose Zusammenspiel aller Einrichtungen in einer Fabrik, der U-Bahnbetrieb, der immer vorhandene Strom in unseren Steckdosen – das alles ist ohne Automatisierungstechnik unmöglich."
                },
                {
                    heading:"Erneuerbare Energien",
                    icon:"erneuerbareEnergien",
                    link:"tagesschule/elektrotechnik/highlights/erneuerbare-energien",
                    content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                }
            ]
        })
    }

    stl() {
        return super.stl() + require("./ausmachtSectionWi.css").toString()
    }
    pug() {
        return super.pug() + require("./ausmachtSectionWi.pug").default
    }
});
