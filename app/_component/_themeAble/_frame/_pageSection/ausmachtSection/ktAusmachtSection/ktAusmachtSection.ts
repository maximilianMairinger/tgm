import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("ausmacht-section-kt", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Kunststufftechnik"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachspezifische",
                selection: [
                    {
                        icon: "laboratoriumKt", 
                        title: "Laboratorium", 
                        content: "Arbeit mit Polymeren", 
                        link: baseLink + "energiesysteme"
                    },
                    {
                        icon: "konstruktionProduktentwicklung", 
                        title: "Konstruktion und Produktentwicklung", 
                        content: "Planung und Umsetzung", 
                        link: baseLink + "automatisierungstechnik"
                    },
                    {
                        icon: "technischeMechanikKt", 
                        title: "Technische Mechanik", 
                        content: "Technische Mechanik und Maschinenelemente", 
                        link: baseLink + "antriebstechnik"
                    },
                    {
                        icon: "kunststoffverarbeitung", 
                        title: "Kunststoffverarbeitung", 
                        content: "Kunststoffverarbeitung und Automatisierungstechnik", 
                        link: baseLink + "industrieelektronik"
                    },
                    {
                        icon: "fertigungstechnik", 
                        title: "Werkstoff- und Fertigungstechnik", 
                        content: "Eigenschaften und Bearbeitung", 
                        link: baseLink + "angewandte-informatik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-kt"
            },
            cards: [
                {
                    heading: "Umwelttechnik",
                    note: "Unterrichtsfach",
                    thumbnail: "/res/img/umwelt.png",
                    href: baseLink + "umwelttechnik",
                    contentTitle: "Chemie und Umwelttechnik",
                    content: "Die Abteilung für Kunststofftechnik am tgm setzt mit ihrem Ausbildungsfokus „Biopolymere und Umwelttechnik“ einen Schwerpunkt auf umweltrelevante"
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/ktWerkstatt.png",
                    href: baseLink + "werkstatte-in-der-hkt",
                    contentTitle: "Praxisbasierte Erfahrungen",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ]
        })
    }
});
