import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";


export default declareComponent("swipe-icon", class SwipeAnimation extends Icon {
    constructor() {
        super();
    }

    pug() {
        return require("./swipe.pug").default
    }
})
