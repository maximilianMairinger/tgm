import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";


export default declareComponent("cookie-note", class CookieNote extends ThemeAble {

    private buttons = this.q("c-button") as ElementList<Button>;


    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
        this.buttons.forEach((button) => button.click(() => {
            if (this.onChange) this.onChange(!!button.getAttribute("active"))
        }));
    }

    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        return super.theme(to)
    }




    stl() {
        return super.stl() + require("./cookieNote.css").toString()
    }
    pug() {
        return require("./cookieNote.pug").default
    }
})

