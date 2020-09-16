import { declareComponent } from "../../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../../_themeAble/_card/selectionCard/selectionCard"
import "../../../../_themeAble/_card/anmeldenCard/anmeldenCard"
import { ElementList } from "extended-dom";
import ThemeAble, { Theme } from "../../../themeAble";



export default declareComponent("abendschule-section", class extends PageSection {
    constructor() {
        super("blue")
    }

    protected childThemeAbles() {
        return ["c-selection-card", "c-anmelden-card"]
    }

    stl() {
        return super.stl() + require("./abendschuleSection.css").toString()
    }
    pug() {
        return require("./abendschuleSection.pug").default
    }
});