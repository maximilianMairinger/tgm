import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-mb", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Maschinenbau"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachspezifische",
                selection: [
                    {
                        icon:"konstruktionProjManagement", 
                        title:"Konstruktion und Projektmanagement", 
                        content:"Managementfähigkeiten und Konstruktion", 
                        // link: baseLink + "hardwareentwicklung"
                    },
                    {
                        icon:"techMech", 
                        title:"Techn. Mechanik und Berechnung", 
                        content:"Mathematische Anwendungen in der Technik", 
                        // link: baseLink + "messtechnik-regelungssysteme"
                    },
                    {
                        icon:"fertigungstechnik", 
                        title:"Fertigungstechnik", 
                        content:"Herstellen von Werkstücken", 
                        // link: baseLink + "computersysteme"
                    },
                    {
                        icon:"maschinenAnlagen", 
                        title:"Maschinen und Anlagen",
                        content:"Industrieprozesse verstehen und verwalten", 
                        // link: baseLink + "kommunikationssysteme"
                    },
                    {
                        icon:"automatisierungstechnik", 
                        title:"Automatisierungstechnik", 
                        content:"Arbeiten mit Industrierobotern", 
                        // link: baseLink + "softwaretechnik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-mb"
            },
            cards: [
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "elektronikWerkstatt",
                    href: baseLink + "werkstatte-in-der-maschinenbau",
                    contenttitle: "Werkstatt",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ],
            vertiefung: {
                text: {
                    note: "die",
                    heading: "Vertiefungen",
                    subheading: "der MB",
                    hsize: {max:60, min:40},
                    content: "Prinzipiell wird der rasanten weltweiten, technologischen Weiterentwicklung durch eine solide Grundausbildung Rechnung getragen, sodass es unseren Absolventinnen und Absolventen auch in Zukunft möglich sein wird, mit der entsprechenden fachlichen Kompetenz, auch unter Beachtung ökologischer Notwendigkeiten, erfolgreich national und international zu agieren. Wir blicken auf über 100 Jahre an Erfahrung zurück und bieten eine vielfältige Ausbildung für Mädchen und Burschen. Im ersten Ausbildungsjahr liegt der Schwerpunkt in der Vermittlung maschinenbaulicher Grundlagen, danach erfolgt die vertiefte Ausbildung im Schwerpunkt Deiner Wahl."
                },
                cards: [
                    {
                        heading:"Fahrzeugtechnik",
                        icon:"fahrzeugtechnik",
                        link: baseLink + "fahrzeugtechnik",
                        content:"Hier sind findige, kreative Köpfe gefragt, die unsere Fortbewegungsmittel und Transportmöglichkeiten der Zukunft technisch, ökologisch und designmäßig aktiv mitgestalten wollen: vom Kinderdreirad, Skateboard, Fahrrad, Motorrad, Auto, Bus, LKW, Traktor, Schienenfahrzeug bis hin zu Seilbahnen."
                    },
                    {
                        heading:"Industriedesign",
                        icon:"industrieDesign",
                        link: baseLink + "industrie-design",
                        content:"Du gestaltest, zeichnest, entwirfst, entwickelst, baust. Reine Funktionalität von Produkten genügt heute lange nicht mehr den Bedürfnissen der Kunden. Daher stellt im „IndustrieDesign“ sowohl das Design (Entwurf, Konstruktion), als auch die Funktion von Produkten einen Schwerpunkt dar."
                    },
                    {
                        heading:"Robotik und Smart Engineering",
                        icon:"robotik",
                        link: baseLink + "robotik-und-smart-engineering",
                        content:"Industrieroboter, Mechatronische Systeme, Smarte Assistenten, sind heute allgegenwärtig, aus der modernen Automatisierungswelt nicht mehr wegzudenken. In Zukunft wird sich ihre Präsenz noch verstärken. Die Kombination von Mensch-Maschinen-Interfaces, Dashboards (das neue modulare Programmieren - Drag & Drop) und Maschinenbau-Skills ist der zukünftige Standard und genau dies wird gelehrt."
                    }
                ]
            }
        })
    }
});
