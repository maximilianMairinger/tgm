import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";
import {Theme} from "../../themeAble";


export default declareComponent("swipe-icon", class SwipeAnimation extends Icon {
    constructor() {
        super();
    }


    theme(): Theme
    theme(to: Theme): this
    theme(to?: Theme): any {
        if(to == "dark"){
            this.q("object").css({"filter": "brightness(0) invert(1)"});
        }
        return super.theme(to)
    }

    pug() {
        return require("./swipe.pug").default
    }

    stl(){
        return super.stl() + require('./swipe.css').toString();
    }
})
