import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("ausmacht-section-bg", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Was uns ausmacht",
                subheading: "als Biomedizin"
            },
            selection: {
                heading: "Gegenstände",
                note: "Fachtheoretische",
                selection: [
                    {
                        icon: "biologie", 
                        title: "Biologie, Medizin & Gesundheitswesen", 
                        content: "Ärzte unterrichten medizinisches Grundwissen", 
                        link: baseLink + "biologie-medizin-gesundheitswesen"
                    },
                    {
                        icon: "signalverarbeitung", 
                        title: "Biomedizinische Signalverarbeitung", 
                        content: "Prüfung von Vitalfunktionen mit Messgeräten", 
                        link:  baseLink + "biomedizinische-signalverarbeitung"
                    },
                    {
                        icon: "gerätetechnik", 
                        title: "Medizinische Gerätetechnik", 
                        content: "Technische Geräte verstehen und warten", 
                        link: baseLink + "medizinische-geraetetechnik"
                    },
                    {
                        icon: "gesundheitsmechatronik", 
                        title: "Gesundheitsmechatronik", 
                        content: "Entwicklung von Prothesen", 
                        link:  baseLink + "gesundheitsmechatronik"
                    },
                    {
                        icon: "gesundheitsinformatik", 
                        title: "Medizin & Gesundheitsinformatik", 
                        content: "IT Anwendungen im biomedizinischen Kontext", 
                        link:  baseLink + "medizin-gesundheitsinformatik"
                    }
                ],
                stundentafel: baseLink + "stundentafel-bg"
            },
            cards: [
                {
                    heading: "Zellkulturlabor",
                    note: "highlight",
                    thumbnail: "/res/img/biomedLabor.png",
                    href: baseLink + "zellkultur",
                    contenttitle: "Zellkulturlabortechnik",
                    content: "Du lernst hier an lebenden Zellen hygienisches Arbeiten mit sterilen Werkbänken und Inkubatoren. Damit bist du bestens gerüstet für die Zukunft der Biomedizinischen Technik."
                },
                {
                    heading: "Prototypenbau",
                    note: "Fachpraktischer Unterricht",
                    thumbnail: "/res/img/biomedPrototype.jpg",
                    href: baseLink + "prototypenbau",
                    contenttitle: "Prototypenbau",
                    content: "Im praktischen Unterricht erlernen SchülerInnen den Umgang mit technischen Gerätschaften und aktuellen Tools zur Konzeptionierung von Projekten."
                }
            ]
        })
    }
});
