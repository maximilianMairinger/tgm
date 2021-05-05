import Icon from "../icon";
import declareComponent from "../../../../lib/declareComponent";




export default declareComponent("img-deco-icon", class ImageDecoIcon extends Icon {
  constructor() {
    super()

  }

  pug() {
    return require("./imgDeco.pug").default
  }
})
