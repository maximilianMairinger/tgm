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
                    thumbnail: "student_2",
                    href: baseLink + "lernburo-hit",
                    contenttitle: "Lernen im Aufbruch",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                },
                {
                    heading: "Werkstatt",
                    note: "fachpraxis",
                    thumbnail: "werkstaetteHET",
                    href: baseLink + "werkstatte-hit",
                    contenttitle: "Praxisbasierte Erfahrungen",
                    content: "In unseren Werkstätten erlernen SchülerInnen den Umgang mit technischen Gerätschaften und setzen das gelernte Theoriewissen selbst um."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der IT",
                    hsize: {max:60, min:40},
                    content: "Die SchülerInnen der IT vertiefen sich nach dem dritten Jahr in einem Spezialgebiet. In der Medientechnik können sie frei zwischen Secure Web- and App- Development, Kreativität und Design oder Game-Design wählen. In Systemtechnik stehen die Spezialisierungen IT-Security und Data Science offen."
                },
                cards: [
                    {
                        heading:"Medientechnik",
                        icon:"medientechnik",
                        link: baseLink + "medientechnik",
                        content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Planung, Entwurf und Realisierung sowie des Betriebes von Multimediaprodukten. Grundkenntnisse wie Programmiertechniken für Internet und Multimedia-Anwendungen werden dazu ebenso wie Marketing und Medienwirtschaft vermittelt."
                    },
                    {
                        heading:"Systemtechnik",
                        icon:"systemtechnik",
                        link: baseLink + "systemtechnik",
                        content:"Diese Ausbildungsrichtung bildet den universell einsetzbaren Informationstechniker mit einem umfassenden Wissen in den erforderlichen technischen wie auch wirtschaftlichen Fachgebieten aus, um die IT-Infrastruktur eines Unternehmens zu planen, zu erstellen und zu warten."
                    }
                ]
                
            }
        })
    }
});
