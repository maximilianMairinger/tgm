import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class DroneIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./drone.pug").default
  }
}

declareComponent("drone-icon", DroneIcon)
