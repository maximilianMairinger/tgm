import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("informationen-section", class InformationenSection extends sectionTextblob{

    constructor(){
        super();
        this.heading("Informationen");
        this.subheading("über die Diplomarbeiten.");
        this.note("wichtige");
    }

    stl() {
        return super.stl() + require("./informationenSection.css").toString();
    }
})