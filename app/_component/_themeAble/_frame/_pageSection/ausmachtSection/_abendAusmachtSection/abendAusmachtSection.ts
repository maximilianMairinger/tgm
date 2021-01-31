import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";
import Icon from "../../../../_icon/icon";



export default abstract class AbendschulAusmachtSection extends AusmachtSection {

    constructor(baseLink: string, heading: {heading: string, subheading: string}, vertiefung: {
        text: {
            note: string,
            heading: string,
            subheading: string,
            hsize: {max: number, min: number},
            content: string
        },
        cards: {
            heading: string,
            icon: string | (() => any) | Icon,
            link: string,
            content: string
        }[]
        
    }) {
        vertiefung.cards.ea((e) => {
            if (!e.link.startsWith(baseLink)) e.link = baseLink + e.link
        })
        super({
            heading,
            selection: {
                heading: "Ablauf",
                note: "Anmeldungs",
                selection: [
                    {
                        icon: "requirement", 
                        title: "Vorraussetzungen", 
                        content: "Was für die anmeldung vorrausgesetzt ist", 
                        link: baseLink + "vorraussetzungen-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "register", 
                        title: "Anmeldung", 
                        content: "Für den Vorbereitungslehrgang der Abendschule amelden", 
                        link: baseLink + "anmeldung-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "registration", 
                        title: "Aufnahme", 
                        content: "Am ersten Schultag mitzunehmen", 
                        link: baseLink + "aufnahme-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "graduate", 
                        title: "Zertifizierung", 
                        content: "Wozu der Lehrgang berechtigt", 
                        link: baseLink + "zertifizierung-vorbereitungslehrgang-abend"
                    }
                ],
                stundentafel: baseLink + "stundentafel-abendschule-vorberitungslehrgang"
            },
            cards: [
                {
                    heading: "Unterricht",
                    note: "unser",
                    thumbnail: "lecture",
                    href: baseLink + "unterricht-abendschule",
                    contenttitle: "Unterricht",
                    content: "Wir sind bemüht, den Studierenden das Grundrüstzeug für die Ingenieurstätigkeit möglichst breit gestreut mitzugeben, damit die universelle Einsetzbarkeit "
                }
            ],
            vertiefung
        })
    }
}
