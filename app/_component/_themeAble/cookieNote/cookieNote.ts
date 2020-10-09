import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";

import cookieSettings from "../../../lib/cookieSettings"
cookieSettings.get((allow) => {
    console.log(allow ? "COOKIES ARE ALLOWED" : "COOKIES ARE NOT ALLOWED")
})
//@ts-ignore
window.cookie = cookieSettings

export default declareComponent("cookie-note", class CookieNote extends ThemeAble {

    private buttons = this.q("c-button") as ElementList;
    private cookieClickerRefrence;

    private cookieClicker(){
        this.buttons.forEach((button) => button.removeEventListener('click', this.cookieClickerRefrence));
        this.css({display: 'none'});
    }

    constructor() {
        super(false)
        this.cookieClickerRefrence = this.cookieClicker.bind(this);
        this.buttons.forEach((button) => button.addEventListener('click', this.cookieClickerRefrence));
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

