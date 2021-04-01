import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";
import ConfettiGenerator from "confetti-js";
import "../../_themeAble/_text/textblob/textblob"


export default declareComponent("april-fools", class CookieNote extends ThemeAble {

    private confettiCanvas = this.q("canvas#confetti");

    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
        var confettiSettings = { target: this.confettiCanvas};
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
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

