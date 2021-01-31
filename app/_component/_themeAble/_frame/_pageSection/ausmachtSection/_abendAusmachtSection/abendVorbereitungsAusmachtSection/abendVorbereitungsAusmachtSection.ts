import { declareComponent } from "../../../../../../../lib/declareComponent"
import "../../../../../_card/selectionCard/selectionCard"
import "../../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AbendAusmachtSection from "../abendAusmachtSection";




export default declareComponent("abend-vorbereitungs-ausmacht-section", class extends AbendAusmachtSection {

    constructor(baseLink: string) {
        super(baseLink, {
            heading: "Highlights des",
            subheading: "Vorbereitungslehrgangs"
        },
        {
            text: {
                note: "abendliche",
                heading: "Vorbereitungs",
                subheading: "lehrgänge",
                hsize: {max:60, min:40},
                content: ""
            },
            cards: [
                {
                    heading:"Elektrotechnik",
                    icon:"electronics",
                    link: "elektronik-vorbereitungslehrgang-abend",
                    content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Erneuerbare Energie, Umwelt und Nachhaltigkeit sowie Mechatronik. Damit wird eine fundierte Grundlage zur weiteren Ausbildung im Aufbaulehrgang garantiert."
                },
                {
                    heading:"Maschinenbau",
                    icon:"maschinenbau",
                    link: "maschinenbau-vorbereitungslehrgang-abend",
                    content:"Diese Ausbildungsrichtung bildet den universell einsetzbaren Maschinenbauer mit einem umfassenden Wissen in den erforderlichen technischen wie auch wirtschaftlichen Fachgebieten aus. Damit wird eine fundierte Grundlage zur weiteren Ausbildung im Aufbaulehrgang garantiert."
                }
            ]
            
        }
        )
    }
});
