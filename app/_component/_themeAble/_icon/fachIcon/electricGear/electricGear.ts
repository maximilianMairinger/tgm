import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ElectricGearIcon extends Icon {


  pug() {
    return require("./electricGear.pug").default
  }
}

declareComponent("electric-gear-icon", ElectricGearIcon)
