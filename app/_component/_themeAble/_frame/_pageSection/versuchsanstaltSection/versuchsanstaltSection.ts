import { declareComponent } from "../../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../../_themeAble/_text/_sectionTextblob/versuchsanstalltSection/versuchsanstalltSection"
import { Theme } from "../../../../_themeAble/themeAble";



export default declareComponent("versuchanstalt-section", class extends PageSection {
    constructor() {
        super("dark")
    }

    stl() {
        return super.stl() + require("./versuchsanstaltSection.css").toString()
    }
    pug() {
        return require("./versuchsanstaltSection.pug").default
    }
});