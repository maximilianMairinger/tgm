import declareComponent from "../../../../../lib/declareComponent";
import {Theme} from "../../../themeAble";
import InfoCard from "../infoCard";


export default class UnterrichtSystemeCard extends InfoCard {

    constructor(){
        super();
    }

}

declareComponent("unterricht-systeme-card", UnterrichtSystemeCard)
