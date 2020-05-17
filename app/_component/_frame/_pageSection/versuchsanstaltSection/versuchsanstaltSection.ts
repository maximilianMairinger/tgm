import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../_text/textblob/textblob"



export default declareComponent("versuchanstalt-section", class extends PageSection {

    constructor() {
        super()
    }

    stl() {
        return super.stl() + require("./versuchsanstaltSection.css").toString()
    }
    pug() {
        return require("./versuchsanstaltSection.pug").default
    }
});