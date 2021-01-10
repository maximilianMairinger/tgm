import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("ausmacht-section-et", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Elektrotechnik"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachtheoretische",
                selection: [
                    {
                        icon: "energysysteme", 
                        title: "Energiesysteme", 
                        content: "Energiegewinnung und -speicherung", 
                        link: baseLink + "energiesysteme"
                    },
                    {
                        icon: "automatisierungstechnik", 
                        title: "Automatisierungstechnik", 
                        content: "Automatisieren in elektrotechnischen Anwendungen", 
                        link: baseLink + "automatisierungstechnik"
                    },
                    {
                        icon: "antriebstechnik", 
                        title: "Antriebstechnik", 
                        content: "Bewegung und Elektrotechnik", 
                        link: baseLink + "antriebstechnik"
                    },
                    {
                        icon: "industrieelektronik", 
                        title: "Industrieelektronik", 
                        content: "Elektrotechnik in der Industrie", 
                        link: baseLink + "industrieelektronik"
                    },
                    {
                        icon: "angewandteInformatik", 
                        title: "Angewandte Informatik", 
                        content: "Entwickeln von computerbasierten Lösungen", 
                        link: baseLink + "angewandte-informatik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-et"
            },
            cards: [
                {
                    heading: "Lernbüro",
                    note: "Unterrichtssystem",
                    thumbnail: "student_2",
                    href: baseLink + "lernbüro-het",
                    contenttitle: "Lernen im Aufbruch",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstätte",
                    note: "Fachpraktischer Unterricht",
                    thumbnail: "werkstaetteHET",
                    href: baseLink + "werkstätte-elektrotechnik",
                    contenttitle: "Praxisbasierte Erfahrungen",
                    content: "In unseren Werkstätten erlernen SchülerInnen den Umgang mit technischen Gerätschaften und setzen das gelernte Theoriewissen selbst um."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der Elektrotechnik",
                    hsize: {max:60, min:40},
                    content: "Die Abteilung Elektrotechnik bietet einen besonders umfassende technische Ausbildung. Grundsätzlich beschäftigt sie sich mit allen Bereichen"
                },
                cards: [
                    {
                        heading:"Automatisierung",
                        icon:"automatisierung",
                        link:baseLink + "automatisierung",
                        content:"Das reibungslose Zusammenspiel aller Einrichtungen in einer Fabrik, der U-Bahnbetrieb, der immer vorhandene Strom in unseren Steckdosen – das alles ist ohne Automatisierungstechnik unmöglich."
                    },
                    {
                        heading:"Erneuerbare Energien",
                        icon:"erneuerbareEnergien",
                        link:baseLink + "erneuerbare-energien",
                        content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                    }
                ]
                
            }
        })
    }
});
