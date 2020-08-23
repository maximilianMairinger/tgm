import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../_themeAble/_card/selectionCard/selectionCard"
import "../../../_themeAble/_card/anmeldenCard/anmeldenCard"



export default declareComponent("news-contact-section", class extends PageSection {

    constructor() {
        super()
    }

    stl() {
        return super.stl() + require("./newsContactSection.css").toString()
    }
    pug() {
        return require("./newsContactSection.pug").default
    }
});