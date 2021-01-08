import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class FastCarIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./fastCar.pug").default
  }
}

declareComponent("fast-car-icon", FastCarIcon)
