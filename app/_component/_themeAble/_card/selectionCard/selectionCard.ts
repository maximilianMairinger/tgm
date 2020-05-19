import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";
import "../../link/link"
import {Theme} from "../../themeAble";
import Textblob from "../../_text/textblob/textblob";

export default declareComponent("selection-card", class SelectionCard extends Card {

    private textblob = this.q("c-textblob") as Textblob;

    constructor(){
        super(false);
    }

    theme():Theme
    theme(to:Theme):void
    theme(to?:Theme):any{
        this.textblob.theme(to);
        return super.theme(to);
    }

    stl(){
        return super.stl() + require('./selectionCard.css').toString();
    }

    pug(){
        return require('./selectionCard.pug').default;
    }
})
