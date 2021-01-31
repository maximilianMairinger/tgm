import { declareComponent } from "../../../../../../../lib/declareComponent"
import wirtschaftsingenieure from "../../../../../_icon/_highlightAbleIcon/abteilungsIcon/wirtschaftsingenieure/wirtschaftsingenieure";
import "../../../../../_card/selectionCard/selectionCard"
import "../../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AbendAusmachtSection from "../abendAusmachtSection";




export default declareComponent("abend-aufbau-ausmacht-section", class extends AbendAusmachtSection {

    constructor(baseLink: string) {
        super(baseLink, {
            heading: "Informationen über das",
            subheading: "Kolleg"
        },
        {
            text: {
                note: "die",
                heading: "Vertiefungen",
                subheading: "des Kollegs",
                hsize: {max:60, min:40},
                content: "Zusätzlich zu der grundlegenden Ausbildung im Kolleg können sich die SchülerInnen durch Wahl einer der drei Abteilungen vertiefen. Damit können sie ihren Interessen nachgehen und werden zu Experten auf dem gewählten Gebiet!"
            },
            cards: [
                {
                    heading:"Erneuerbare Energie, Umwelt und Nachhaltigkeit",
                    icon:"erneuerbareEnergien",
                    link: "erneuerbare-energie-kolleg-abend",
                    content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Erneuerbare Energie, Umwelt und Nachhaltigkeit. In der praxisnahen Ausbildung lernen die Studenten alles wichtige um im Beruf erfolgreich zu sein."
                },
                {
                    heading:"Mechatronik",
                    icon:"mechatronics",
                    link: "mechatronik-kolleg-abend",
                    content:"In dieser Ausbildungsrichtung erfolgt eine Spezialisierung hinsichtlich Mechatronik. In der praxisnahen Ausbildung lernen die Studenten alles wichtige um im Beruf erfolgreich zu sein."
                },
                {
                    heading:"Wirtschaftsingenieurwesen",
                    icon: "wirtschaftsingenieure",
                    link: "wirtschaftsingenieurwesen-kolleg-abend",
                    content:"Diese Ausbildungsrichtung bildet den universell einsetzbaren Writschaftsingenieur mit einem umfassenden Wissen in den erforderlichen technischen wie auch wirtschaftlichen Fachgebieten aus. Wirtschaftsingenieure sind echte Allrounder!"
                }
            ]
            
        }
        )
    }
});
