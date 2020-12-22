import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("informationen-section", class InformationenSection extends sectionTextblob{

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