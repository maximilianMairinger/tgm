import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../_themeAble/_text/textblob/textblob"
import "../../../_themeAble/_text/tabletBlob/tabletBlob"



export default declareComponent("schulerprojekte-section", class extends PageSection {

    constructor() {
        super()
    }

    stl() {
        return super.stl() + require("./schuelerprojekteSection.css").toString()
    }
    pug() {
        return require("./schuelerprojekteSection.pug").default
    }
});