import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";
import ConfettiGenerator from "confetti-js";


export default declareComponent("april-fools", class CookieNote extends ThemeAble {



    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
    }



    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }

    stl() {
        return require("./aprilFools.css").toString()
    }
    pug() {
        return require("./aprilFools.pug").default
    }
})

