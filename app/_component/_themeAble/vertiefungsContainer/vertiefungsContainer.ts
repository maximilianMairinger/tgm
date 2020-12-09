import ThemeAble, {Theme} from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import "../_icon/arrow/arrow"
import "../_card/vertiefungsCard/vertiefungsCard"

export default class VertiefungsContainer extends ThemeAble {

    constructor() {
        super(false);
    }


    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    stl() {
        return super.stl() + require("./vertiefungsContainer.css").toString()
    }

    pug() {
        return require("./vertiefungsContainer.pug").default
    }

}

declareComponent("vertiefungs-container", VertiefungsContainer);