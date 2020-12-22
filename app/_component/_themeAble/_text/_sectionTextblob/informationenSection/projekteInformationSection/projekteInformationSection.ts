import declareComponent from "../../../../../../lib/declareComponent";
import InformationSection from "../informationenSection";

export default declareComponent("projekte-informations-section", class InformationenSection extends InformationSection {

    constructor(){
        super();
        this.theme('light');
        
        this.hsize({max:65, min:37});
        this.hmobile({max:40, min:30});
    }

    stl() {
        return super.stl() + require("./informationenSection.css").toString();
    }
})