import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class ElektronicsIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./elektronics.pug").default
  }
}

declareComponent("elektronics-icon", ElektronicsIcon)
