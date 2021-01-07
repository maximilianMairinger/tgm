import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";



export default declareComponent("ausmacht-section-el", class extends AusmachtSection {

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
                        link: baseLink + "messtechnik-und-regelungssysteme"
                    },
                    {
                        icon:"computersysteme", 
                        title:"Digitale Systeme und Computersysteme", 
                        content:"Signalprozesse und digitale Systeme", 
                        link: baseLink + "digitale-systeme-und-computersysteme"
                    },
                    {
                        icon:"kommunikationssysteme", 
                        title:"Kommunikationssysteme und -netze",
                        content:"Kommunikationsnetze und Übertragungssysteme", 
                        link: baseLink + "kommunikationssysteme-und-netze"
                    },
                    {
                        icon:"softwaretechnik", 
                        title:"Fachspezifische Softwaretechnik", 
                        content:"Mikrocontroller und Softwareentwicklung", 
                        link: baseLink + "fachspezifische-softwaretechnik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-el"
            },
            cards: [
                {
                    heading: "IoT",
                    note: "highlight",
                    thumbnail: "iotElektronik",
                    href: baseLink + "todo",
                    contenttitle: "Internet of things",
                    content: "TODO"
                },
                {
                    heading: "Prototypenbau",
                    note: "fachpraktisch",
                    thumbnail: "elPrototypenbau",
                    href: baseLink + "prototypenbau",
                    contenttitle: "Prototypenbau",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ]
        })
    }
});
