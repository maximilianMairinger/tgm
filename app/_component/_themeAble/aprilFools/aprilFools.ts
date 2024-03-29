import ThemeAble, { Theme } from "../themeAble"
import declareComponent from "../../../lib/declareComponent"
import "../../_themeAble/_button/button"
import {ElementList} from "extended-dom";
import Button from "../../_themeAble/_button/button";
import ConfettiGenerator from "confetti-js";
import "../../_themeAble/_text/textblob/textblob"
import "../../_themeAble/_button/button"


export default class AprilFools extends ThemeAble {

    private confettiCanvas = this.q("canvas#confetti");
    private button = this.q("c-button.close") as Button;

    constructor(public onChange?: (activate: boolean) => void) {
        super(false)
        var confettiSettings = {target: this.confettiCanvas};
        //@ts-ignore
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        this.button.click(this.close.bind(this))
    }

    close(){
        this.remove()
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
}

declareComponent("april-fools", AprilFools)

