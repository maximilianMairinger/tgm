import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class IndustryIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./industry.pug").default
  }
}

declareComponent("industry-icon", IndustryIcon)
