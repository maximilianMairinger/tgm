import { declareComponent } from "../../../../../../../lib/declareComponent"
import wirtschaftsingenieure from "../../../../../_icon/_highlightAbleIcon/abteilungsIcon/wirtschaftsingenieure/wirtschaftsingenieure";
import "../../../../../_card/selectionCard/selectionCard"
import "../../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AbendAusmachtSection from "../abendAusmachtSection";




export default declareComponent("abend-aufbau-ausmacht-section", class extends AbendAusmachtSection {

    constructor(baseLink: string) {
        super(baseLink, {
            heading: "Highlights des",
            subheading: "Aufbaulehrgangs"
        },
        {
            text: {
                note: "abendliche",
                heading: "Aufbau",
                subheading: "lehrgänge",
                hsize: {max:60, min:40},
                content: ""
            },
            cards: [
                {
                    heading:"Erneuerbare Energie, Umwelt und Nachhaltigkeit",
                    icon:"erneuerbareEnergien",
                    link: "erneuerbare-energie-aufbaulehrgang-abend",
                    content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Erneuerbare Energie, Umwelt und Nachhaltigkeit. In der praxisnahen Ausbildung lernen die Studenten alles wichtige um im Beruf erfolgreich zu sein."
                },
                {
                    heading:"Wirtschaftsingenieurwesen",
                    icon: "wirtschaftsingenieure",
                    link: "wirtschaftsingenieurwesen-aufbaulehrgang-abend",
                    content:"Diese Ausbildungsrichtung bildet den universell einsetzbaren Writschaftsingenieur mit einem umfassenden Wissen in den erforderlichen technischen wie auch wirtschaftlichen Fachgebieten aus. Wirtschaftsingenieure sind echte Allrounder!"
                }
            ]
            
        }
        )
    }
});
