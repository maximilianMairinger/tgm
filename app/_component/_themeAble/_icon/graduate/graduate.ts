import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default class GraduateIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./graduate.pug").default
  }
}

declareComponent("graduate-icon", GraduateIcon)
