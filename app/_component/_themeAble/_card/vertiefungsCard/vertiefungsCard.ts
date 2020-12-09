import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import {Theme} from "../../themeAble";

export default declareComponent("vertiefungs-card", class VertiefungsCard extends Card {

    constructor(){
        super(false, false);
    }

    theme():Theme
    theme(to:Theme):this
    theme(to?:Theme):any{
        return super.theme(to);
    }

    stl(){
        return super.stl() + require('./vertiefungsCard.css').toString();
    }

    pug(){
        return require('./vertiefungsCard.pug').default;
    }
})
