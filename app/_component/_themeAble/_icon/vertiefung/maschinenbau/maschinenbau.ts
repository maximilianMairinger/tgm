import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class MaschinenbauIcon extends Icon {
  pug() {
    return require("./maschinenbau.pug").default
  }
}

declareComponent("maschinenbau-vertiefung-icon", MaschinenbauIcon)
