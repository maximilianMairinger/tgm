import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class LogisikIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./logistik.pug").default
  }
}

declareComponent("logistik-icon", LogisikIcon)
