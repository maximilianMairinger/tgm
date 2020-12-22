import declareComponent from "../../../../../../lib/declareComponent";
import InformationSection from "../informationenSection";

export default declareComponent("projekte-informations-section", class InformationenSection extends InformationSection {

    constructor(){
        super();

        this.heading("Informationen");
        this.subheading("über die Diplomarbeiten.");
        this.note("wichtige");
    }
})