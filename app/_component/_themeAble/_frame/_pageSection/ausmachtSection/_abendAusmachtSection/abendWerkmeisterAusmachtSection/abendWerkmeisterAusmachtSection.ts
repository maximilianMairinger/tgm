import { declareComponent } from "../../../../../../../lib/declareComponent"
import "../../../../../_card/selectionCard/selectionCard"
import "../../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AbendAusmachtSection from "../abendAusmachtSection";




export default declareComponent("abend-werkmeister-ausmacht-section", class extends AbendAusmachtSection {

    constructor(baseLink: string) {
        super(baseLink, "werkmeisterlehrgang", {
            heading: "Informationen über den",
            subheading: "Werkmeisterlehrgang"
        },
        {
            text: {
                note: "die",
                heading: "Werkmeister-",
                subheading: "lehrgänge",
                hsize: {max:60, min:40},
                content: "Bei besuchen des Werkmeisterlehrgang können sich die StudentInnen im Maschinenbau-Betriebstechnik Lehrgang vertiefen. Damit werden Sie zu Experten auf dem Ihrem Gebiet!"
            },
            cards: [
                {
                    heading:"Maschinenbau-Betriebstechnik",
                    icon:"maschinenbau",
                    link: "werkmeister-maschinenbau-betriebstechnik-abend",
                    content:"Im Mittelpunkt dieser Ausbildung steht sowohl die Erweiterung der Fachbildung als auch die Förderung von Führungsqualitäten sowie die Vermittlung von betriebstechnischem und -wirtschaftlichem Wissen"
                }
            ]
            
        })
    }
});
