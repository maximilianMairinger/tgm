import { declareComponent } from "../../../../../../../lib/declareComponent"
import "../../../../../_card/selectionCard/selectionCard"
import "../../../../../_card/_infoCard/unterrichtSystemeCard/unterrichtSystemeCard"
import AbendAusmachtSection from "../abendAusmachtSection";




export default declareComponent("abend-werkmeister-ausmacht-section", class extends AbendAusmachtSection {

    constructor(baseLink: string) {
        super(baseLink, {
            heading: "Highlights des",
            subheading: "Werkmeisterlehrgangs"
        })
    }
});
