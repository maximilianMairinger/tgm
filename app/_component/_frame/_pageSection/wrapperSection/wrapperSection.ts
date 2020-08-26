import { declareComponent } from "../../../../lib/declareComponent"
import PageSection from "../pageSection"
import "../../../_themeAble/_text/_sectionTextblob/versuchsanstalltSection/versuchsanstalltSection"
import { Theme } from "../../../_themeAble/themeAble";
import component from "../../../component";



export default declareComponent("wrapper-section", class WrapperSection extends PageSection {

    constructor()
    constructor(component:Element)
    constructor(component:Element, theme: Theme)
    constructor(component?:Element, theme?:Theme) {
        super()
        if(component) this.elementBody.append(component);
        if(theme) this.theme = theme;
    }

    stl() {
        return super.stl() + require("./wrapperSection.css").toString()
    }

    pug(){
        return "";
    }
});