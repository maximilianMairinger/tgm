import Icon from "../../icon";
import declareComponent from "../../../../../lib/declareComponent";




export default class WindMillIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./windMill.pug").default
  }
}

declareComponent("wind-mill-icon", WindMillIcon)
