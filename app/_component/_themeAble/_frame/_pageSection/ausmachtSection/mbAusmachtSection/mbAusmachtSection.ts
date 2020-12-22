import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-elektronik", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Elektronik"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachspezifische",
                selection: [
                    {
                        icon:"hardwareentwicklung", 
                        title:"Hardwareentwicklung", 
                        content:"Entwurf und Konzeptionierung von Geraeten", 
                        link: baseLink + "hardwareentwicklung"
                    },
                    {
                        icon:"messtechnik", 
                        title:"Messtechnik und Regelungssysteme", 
                        content:"Arbeit mit komplexen Sensoren", 
                        link: baseLink + "messtechnik-regelungssysteme"
                    },
                    {
                        icon:"computersysteme", 
                        title:"Digitale Systeme und Computersysteme", 
                        content:"Signalprozesse und digitale Systeme", 
                        link: baseLink + "computersysteme"
                    },
                    {
                        icon:"kommunikationssysteme", 
                        title:"Kommunikationssysteme und -netze",
                        content:"Kommunikationsnetze und Übertragungssysteme", 
                        link: baseLink + "kommunikationssysteme"
                    },
                    {
                        icon:"softwaretechnik", 
                        title:"Fachspezifische Softwaretechnik", 
                        content:"Mikrocontroller und Softwareentwicklung", 
                        link: baseLink + "softwaretechnik"
                    }
                ],
                stundentafel: "tagesschule/elektronik/highlights/stundentafel-bg"
            },
            cards: [
                {
                    heading: "IoT",
                    note: "praxisunterricht",
                    thumbnail: "/res/img/iotElektronik.jpg",
                    href: baseLink + "zellkultur",
                    contentTitle: "Zellkulturlabortechnik",
                    content: "Du lernst hier an lebenden Zellen hygienisches Arbeiten mit sterilen Werkbänken und Inkubatoren. Damit bist du bestens gerüstet für die Zukunft der Biomedizinischen Technik."
                },
                {
                    heading: "Werkstatt",
                    note: "PRAXISUNTERRICHT",
                    thumbnail: "/res/img/elektronikWerkstatt.png",
                    href: baseLink + "prototypenbau",
                    contentTitle: "Prototypenbau",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ]
        })
    }
});
