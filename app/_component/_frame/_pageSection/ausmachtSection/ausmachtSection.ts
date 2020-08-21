import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../_themeAble/_card/selectionCard/selectionCard"
import "../../../_themeAble/_card/anmeldenCard/anmeldenCard"



export default declareComponent("ausmacht-section", class extends PageSection {

    constructor() {
        super()
    }

    stl() {
        return super.stl() + require("./ausmachtSection.css").toString()
    }
    pug() {
        return require("./ausmachtSection.pug").default
    }
});