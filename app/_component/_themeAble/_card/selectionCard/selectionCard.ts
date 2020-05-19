import declareComponent from "../../../../lib/declareComponent";
import Card from "../card";

export default declareComponent("selection-card", class SelectionCard extends Card {

    constructor(){
        super();
    }

    stl(){
        return super.stl() + require('./selectionCard.css').toString();
    }

    pug(){
        return require('./selectionCard.pug').default;
    }
})
