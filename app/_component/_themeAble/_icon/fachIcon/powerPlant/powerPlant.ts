import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class PowerPlantIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./powerPlant.pug").default
  }
}

declareComponent("power-plant-icon", PowerPlantIcon)
