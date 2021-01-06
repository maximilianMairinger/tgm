import { declareComponent } from "../../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../../_themeAble/_text/textblob/textblob"
import TabletBlob from "../../../_text/tabletBlob/tabletBlob";
import {Project} from "../../../_text/tabletBlob/tabletBlob";



export default declareComponent("schulerprojekte-section", class extends PageSection {


    constructor(projekte?:JSON[] | Project[]) {
        super()
        console.log(projekte)
        if(projekte) {
            this.q("center").apd(new TabletBlob(projekte));
        }
    }

    stl() {
        return super.stl() + require("./schuelerprojekteSection.css").toString()
    }
    pug() {
        return require("./schuelerprojekteSection.pug").default
    }
});