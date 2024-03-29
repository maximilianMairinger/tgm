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
                subheading: "als Kunststoff- und Umwelttechnik"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachtheoretische",
                selection: [
                    {
                        icon: "laboratoriumKt", 
                        title: "Laboratorium", 
                        content: "Arbeit mit Polymeren", 
                        link: baseLink + "laboratorium"
                    },
                    {
                        icon: "konstruktionProduktentwicklung", 
                        title: "Konstruktion und Produktentwicklung", 
                        content: "Planung und Umsetzung", 
                        link: baseLink + "konstruktion-und-produktentwicklung"
                    },
                    // {
                    //     icon: "technischeMechanikKt", 
                    //     title: "Technische Mechanik", 
                    //     content: "Technische Mechanik und Maschinenelemente", 
                    //     link: baseLink + "antriebstechnik"
                    // },
                    {
                        icon: "kunststoffverarbeitung", 
                        title: "Kunststoffverarbeitung", 
                        content: "Kunststoffverarbeitung und Automatisierungstechnik", 
                        link: baseLink + "kunststoffverarbeitung-und-automatisierungstechnik"
                    },
                    {
                        icon: "umwelttechnik", 
                        title: "Chemie und Umwelttechnik", 
                        content: "Die essenziellen Schritte der Wiederaufbereitung", 
                        link: baseLink + "chemie-und-umwelttechnik"
                    }
                    // {
                    //     icon: "fertigungstechnik", 
                    //     title: "Werkstoff- und Fertigungstechnik", 
                    //     content: "Eigenschaften und Bearbeitung", 
                    //     link: baseLink + "angewandte-informatik"
                    // }
                ],
                stundentafel: baseLink + "stundentafel-kt"
            },
            cards: [
                {
                    heading: "Umwelttechnik",
                    note: "Unterrichtsfach",
                    thumbnail: "recycling",
                    href: baseLink + "umwelttechnik",
                    contenttitle: "Umwelttechnik",
                    content: "Die Abteilung für Kunststoff- und Umwelttechnik am tgm setzt mit ihrem Ausbildungsfokus „Biopolymere und Umwelttechnik“ einen Schwerpunkt auf umweltrelevante"
                },
                {
                    heading: "Werkstätte",
                    note: "Fachpraktischer Unterricht",
                    thumbnail: "werkstattDrehen",
                    href: baseLink + "werkstatte-in-der-hkt",
                    contenttitle: "Praxisbasierte Erfahrungen",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ]
        })
    }
});
