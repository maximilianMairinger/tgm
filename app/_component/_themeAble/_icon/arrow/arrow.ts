import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("arrow-icon", class ArrowIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./arrow.pug").default
  }
})
