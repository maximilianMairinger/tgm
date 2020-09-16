import declareComponent from "../../../../../lib/declareComponent";
import {Theme} from "../../../themeAble";
import InfoCard from "../infoCard";


export default class UnterrichtSystemeCard extends InfoCard {

    constructor(){
        super();
    }

    stl(){
        return super.stl() + require('./unterrichtSystemeCard.css').toString();
    }
}

declareComponent("unterricht-systeme-card", UnterrichtSystemeCard)
