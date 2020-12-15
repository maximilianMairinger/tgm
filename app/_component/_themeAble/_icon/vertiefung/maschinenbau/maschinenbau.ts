import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MaschinenbauIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./maschinenbau.pug").default
  }
}

declareComponent("maschinenbau-icon", MaschinenbauIcon)
