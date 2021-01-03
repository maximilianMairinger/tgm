import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class PlasticBottleIcon extends Icon {


  pug() {
    return require("./plasticBottle.pug").default
  }
}

declareComponent("plastic-bottle-icon", PlasticBottleIcon)
