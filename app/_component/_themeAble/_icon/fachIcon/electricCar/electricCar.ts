import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ElectricCarIcon extends Icon {


  pug() {
    return require("./electricCar.pug").default
  }
}

declareComponent("electric-car-icon", ElectricCarIcon)
