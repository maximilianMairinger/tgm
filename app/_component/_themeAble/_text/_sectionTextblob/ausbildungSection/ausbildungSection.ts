import declareComponent from "../../../../../lib/declareComponent";
import sectionTextblob from "../sectionTextblob";

export default declareComponent("ausbildung-section", class AusbildungSection extends sectionTextblob{

    constructor(){
        super();
        this.theme('light');
        this.heading("Technische Ausbildung");
        this.subheading("am Puls der Zeit");
        this.note("Bei uns");
        this.hsize({max:53, min:27});
        this.hmobile({max:40, min:30});
    }

    stl(){
        return super.stl() + require("./ausbildungSection.css").toString()
    }
})