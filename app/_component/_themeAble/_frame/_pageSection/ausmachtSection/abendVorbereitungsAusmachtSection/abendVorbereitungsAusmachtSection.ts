import { declareComponent } from "../../../../../../lib/declareComponent"
import "../../../../_card/selectionCard/selectionCard"
import "../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AusmachtSection from "../ausmachtSection";
import VertiefungsContainer from "../../../../vertiefungsContainer/vertiefungsContainer";
import {MediaQuerySize} from "../../../../_text/textblob/textblob";



export default declareComponent("abend-vorbereitungs-ausmacht-section", class extends AusmachtSection {

    constructor(baseLink: string) {
        super({
            heading: {
                heading: "Highlights des",
                subheading: "Vorbereitungslehrgangs"
            },
            selection: {
                heading: "Ablauf",
                note: "Anmeldungs",
                selection: [
                    {
                        icon: "softwareentwicklung", 
                        title: "Vorraussetzungen", 
                        content: "Was für die anmeldung vorrausgesetzt ist", 
                        link: baseLink + "vorraussetzungen-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "informationstechnischeProjekte", 
                        title: "Anmeldung", 
                        content: "Für den Vorbereitungslehrgang der Abendschule amelden", 
                        link: baseLink + "anmeldung-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "netzwerktechnik", 
                        title: "Aufnahme", 
                        content: "Am ersten Schultag mitzunehmen", 
                        link: baseLink + "aufnahme-vorbereitungslehrgang-abend"
                    },
                    {
                        icon: "informationssysteme", 
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
                    thumbnail: "student_2",
                    href: baseLink + "unterricht-abendschule",
                    contenttitle: "Unterricht",
                    content: "Das Lernbüro ermöglicht den SchülerInnen ihren Stundenplan selbst zu organisieren. Dabei lernen sie Eigenverantwortung und Teamarbeit."
                }
            ],
            vertiefung: {
                text: {
                    note: "abendliche",
                    heading: "Lehrgänge",
                    subheading: "zur Vorbereitung",
                    hsize: {max:60, min:40},
                    content: ""
                },
                cards: [
                    {
                        heading:"Elektrotechnik",
                        icon:"medientechnik",
                        link: baseLink + "elektronik-vorbereitungslehrgang-abend",
                        content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Erneuerbare Energie, Umwelt und Nachhaltigkeit sowie Mechatronik."
                    },
                    {
                        heading:"Maschienenbau",
                        icon:"systemtechnik",
                        link: baseLink + "maschienenbau-vorbereitungslehrgang-abend",
                        content:"Diese Ausbildungsrichtung bildet den universell einsetzbaren Maschienenbauer mit einem umfassenden Wissen in den erforderlichen technischen wie auch wirtschaftlichen Fachgebieten aus."
                    }
                ]
                
            }
        })
    }
});
