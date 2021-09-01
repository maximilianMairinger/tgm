import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";
import Icon from "../../../../_icon/icon";



export default abstract class TagesschulAusmachtSection extends AusmachtSection {

    constructor(baseLink: string, urlName: string, heading: {heading: string, subheading: string}, vertiefung?: {
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
        if (vertiefung) vertiefung.cards.ea((e) => {
            if (!e.link.startsWith(baseLink)) e.link = baseLink + e.link
        })
        super({
            heading,
            selection: {
                note: "zur",
                heading: "Orientierung",
                selection: [
                    {
                        icon: "requirement", 
                        title: "Vorraussetzungen", 
                        content: "Die Vorraussetzungen für die Zulassung", 
                        link: baseLink + "vorraussetzungen-" + urlName + "-tag"
                    },
                    {
                        icon: "register", 
                        title: "Anmeldung", 
                        content: "Der Anmeldeprozess erklärt", 
                        link: baseLink + "anmeldung-" + urlName + "-tag"
                    },
                    {
                        icon: "registration", 
                        title: "Aufnahme", 
                        content: "Informationen zum ersten Schultag", 
                        link: baseLink + "aufnahme-" + urlName + "-tag"
                    },
                    {
                        icon: "graduate", 
                        title: "Abschluss", 
                        content: "Das Ergebnis Ihrer Ausbildung", 
                        link: baseLink + "abschluss-" + urlName + "-tag"
                    }
                ]
            },
            cards: [
                {
                    heading: "Unterricht",
                    note: "unser",
                    thumbnail: "lecture",
                    href: baseLink + "unterricht-" + urlName + "-tag",
                    contenttitle: "Unterricht",
                    content: "Wir sind bemüht, den Studierenden das Grundrüstzeug für die Ingenieurstätigkeit möglichst breit gestreut mitzugeben, damit die universelle Einsetzbarkeit "
                }
            ],
            vertiefung
        })
    }
}
