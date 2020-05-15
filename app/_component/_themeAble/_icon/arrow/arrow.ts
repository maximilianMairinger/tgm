import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("arrow-icon", class ArrowIcon extends Icon {
  constructor() {
    super()

  }

  stl() {
    return super.stl() + require("./arrow.css").toString()
  }
  pug() {
    return require("./arrow.pug").default
  }
})
