import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class GearMechanicIcon extends Icon {


  pug() {
    return require("./gearMechanic.pug").default
  }
}

declareComponent("gear-mechanic-icon", GearMechanicIcon)
