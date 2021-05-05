import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("heading-deco-icon", class HeadingDecoIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./headingDeco.pug").default
  }

  stl() {
    return super.stl() + require("./headingDeco.css").toString()
  }
})
