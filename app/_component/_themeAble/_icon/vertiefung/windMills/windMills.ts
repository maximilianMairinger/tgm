import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class WindMillsIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./windMills.pug").default
  }
}

declareComponent("wind-mills-icon", WindMillsIcon)
