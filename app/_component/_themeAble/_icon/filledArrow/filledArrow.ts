import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("filled-arrow-icon", class ArrowIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./filledArrow.pug").default
  }
})
