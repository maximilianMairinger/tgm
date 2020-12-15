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
                note: "Fachtheoretische",
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
                subheading: "der WI",
                hsize: {max:60, min:40},
                content: `Entscheidest DU dich für eine Ausbildung zum Wirtschaftsingenieur bzw. zur Wirtschaftsingenieurin, dann kannst du ab dem 1. Jahrgang zwischen drei Vertiefungen wählen: Betriebsinformatik, Logistik oder Maschinenbau. Egal welche Vertiefung DU wählst, Wirtschaftsingenieure bzw. Wirtschaftsingenierinnen sind in der Arbeitswelt IMMER gefragt und besetzen nach ihrer Ausbildung Top Positionen im Unternehmen. Auch ermöglicht dir die <c-link link="tagesschule/wirtschaftsingenieure/highlights/junior-company/">Junior Company</c-link> ein echtes Unternehmen mit deinen KollegInnen zu führen.`
            },
            vertiefungscard: [
                {
                    heading:"Betriebsinformatik",
                    icon:"betriebsinformatik",
                    link:"tagesschule/wirtschaftsingenieure/highlights/betriebsinformatik",
                    content:"Wenn du dich gerne mit Computern, Software und Programmierung beschäftigst und spannende Projekte im IT Bereich erfolgreich umsetzen willst, dann ist der Schwerpunkt Betriebsinformatik genau die richtige Entscheidung!"
                },
                {
                    heading:"Logistik",
                    icon:"logistik",
                    link:"tagesschule/wirtschaftsingenieure/highlights/logistik",
                    content:"Entscheidest Du dich für den Ausbildungsschwerpunkt Logistik, dann lernst Du wie man Rohstoffe zielgerichtet einkauft, Standorte plant, Produktions- und Logistikprozesse simuliert und optimiert und wie Produkte von Hersteller effizient zum Kunden kommen. Du lernst, wie man Supply Chains aktiv gestalten kann."
                },
                {
                    heading:"Maschinenbau",
                    icon:"maschinenbau",
                    link:"tagesschule/wirtschaftsingenieure/highlights/maschinenbau",
                    content:"Im Maschinenbau lernst du nicht nur die technisch-wirtschaftlichen Zusammenhänge von Konstruktion, 3D-Druck und Maschinen kennen, sondern kannst aus deinen Ideen innovative Produkte gestalten und vielleicht als Highlight sogar in Deiner eigenen Junior Company produzieren und verkaufen."
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
