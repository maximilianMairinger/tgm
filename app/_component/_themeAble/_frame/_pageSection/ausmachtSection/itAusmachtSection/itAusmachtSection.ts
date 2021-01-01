import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("ausmacht-section-it", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als IT Abteilung"
            },
            selection: {
                heading: "Gegenstände",
                note: "fachtheoretische",
                selection: [
                    {
                        icon: "softwareentwicklung", 
                        title: "Softwareentwicklung", 
                        content: "Eigene Ideen mit Code zum Leben bringen.", 
                        link: baseLink + "softwareentwicklung"
                    },
                    {
                        icon: "informationstechnischeProjekte", 
                        title: "Informationstechnische Projekte", 
                        content: "Über Projektmanagement-Skills zum Start-Up", 
                        link: baseLink + "informationstechnische-projekte"
                    },
                    {
                        icon: "netzwerktechnik", 
                        title: "Netzwerktechnik", 
                        content: "Ein IT-Netzwerk verstehen, aufbauen & überwachen", 
                        link: baseLink + "netzwerktechnik"
                    },
                    {
                        icon: "informationssysteme", 
                        title: "Informationssysteme", 
                        content: "Wie Informationen erfasst und abgelegt werden", 
                        link: baseLink + "informationssysteme"
                    }
                ],
                stundentafel: baseLink + "stundentafel-it"
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
                    note: "fachpraxis",
                    thumbnail: "/res/img/werkstaetteHET.png",
                    href: "tagesschule/elektrotechnik/highlights/werkstätte-elektrotechnik",
                    contentTitle: "Praxisbasierte Erfahrungen",
                    content: "In unseren Werkstätten erlernen SchülerInnen den Umgang mit technischen Gerätschaften und setzen das gelernte Theoriewissen selbst um."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der IT",
                    hsize: {max:60, min:40},
                    content: "Nach drei Jahren Grundausbildung in allen Bereichen, entschiden sich die SchülerInnen für einene Zweig. Beide dieser haben jeweils mehrere Untervertiefungen, in welche sich die SchuelerInnen weiter Verteifen können."
                },
                cards: [
                    {
                        heading:"Medientechnik",
                        icon:"medientechnik",
                        link:"tagesschule/elektrotechnik/highlights/automatisierung",
                        content:"Das reibungslose Zusammenspiel aller Einrichtungen in einer Fabrik, der U-Bahnbetrieb, der immer vorhandene Strom in unseren Steckdosen – das alles ist ohne Automatisierungstechnik unmöglich."
                    },
                    {
                        heading:"Systemtechnik",
                        icon:"systemtechnik",
                        link:"tagesschule/elektrotechnik/highlights/erneuerbare-energien",
                        content:"Die Umwandlung von Strahlungsenergie der Sonne in elektrischen Strom (Photovoltaik) bzw. in Wärme (Solarthermie) oder der Aufbau von Windkraftanlagen – das sind nur einige der nachhaltigen Technologien aus dem Bereich der Erneuerbaren Energien."
                    }
                ]
                
            }
        })
    }
});
